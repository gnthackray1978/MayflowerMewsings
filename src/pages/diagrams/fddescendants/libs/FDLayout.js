
import {Vector} from "../types/Vector.js";
import {Node} from "../types/Node.js";
import {Point} from "../types/Point.js";
import {Spring} from "../types/Spring.js";

export function FDLayout(channel, graph, drawing, settings, parentNode, parentLayout, firstNode, dataSource) {
    this._channel = channel;
    this.dataSource = dataSource;
    this.selected =   {node: new Node(-1,null), point: new Point(new Vector(0,0),0), distance: -1 };
    this.nearest = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };
    this.dragged = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };
    this.parentNode = parentNode;
    this.parentLayout = parentLayout;

    this.firstNode = firstNode;
    this.drawing = drawing;
    this.drawing.layout = this; // oh dear george!
  //  this.drawing.dims.currentBB = this.getBoundingBox(); // fix this!!!
    

    this.canvasId = '#myCanvas';
    this.mouseup = true;

    this.graph = graph;
    this.stiffness = settings.stiffness; // spring stiffness constant
    this.repulsion = settings.repulsion; // repulsion constant
    this.damping = settings.damping; // velocity damping factor

    this.nodePoints = {}; // keep track of points associated with nodes
    this.edgeSprings = {}; // keep track of springs associated with edges

    this.selectionChanged = null;
    this.nearestChanged = null;
    this.draggedChanged = null;

    this.highLightedListeners = [];

    this.selectedListeners = [];
    this.dragList = [];

    this.selectionMass = 0;

    this.runCount = 0;
  
    //handle channel events
    this.setupChannelEventHandlers();
}

FDLayout.prototype = {

    populateGraph: function (year) {

        var mygraph = this.graph;

        this.dataSource.Generations.forEach( (gen) =>{
            gen.filter((f)=>!f.IsHtmlLink && !mygraph.containsNode(f.PersonId)//
                     && (f.RecordLink.DOB < year && f.RecordLink.DOB != 0)
                    ).forEach( (person) =>{
                        if (!person.nodeLink) {
                            person.nodeLink = mygraph.newNode({ label: "description to be added",
                                                  RecordLink: person.RecordLink,
                                                  RecordId : person.PersonId,
                                                  type: 'normal' });
                        }
                        
                        let fatherEdge = this.dataSource.FatherEdgeByPerson(person);

                        if(fatherEdge.IsValid){
                        //    console.log('father edge is valid');
                            mygraph.newEdge(fatherEdge.FatherNode, fatherEdge.ChildNode, { type: 'person' });
                        }
                        else
                        {
                     //       console.log('father edge is not valid: ' + person.RecordLink.FirstName + ' ' + person.RecordLink.LastName);
                        }
                });
            }
        );


        this.dataSource.Generations.forEach((gen, genIdx) => {
            gen.filter(f => !f.IsHtmlLink && f.nodeLink !== undefined).forEach((p, personIdx) => {
                p.nodeLink.data.RecordLink.currentDescendantCount = this.dataSource.DescendantCount(genIdx, personIdx);
            });
        });

        this.drawing.dims.currentBB = this.getBoundingBox(); // fix this!!!
        
        this.runCount = 0;
     //   console.log('graph size: ' + mygraph.nodeCount() + ' nodes, ' + mygraph.edgeCount() + ' edges');
    },

    hasFinished: function () {
        if (this.graph.nodeCount() === 0) {
            return true;
        }
    
        if (Number(this.totalEnergy()) < 0.01 && this.runCount > 100) {
            return true;
        }
    
        return false;
    },

    setupChannelEventHandlers: function() {
        this._channel.on("mouseDoubleClick", function (data, envelope) {
            console.log('mouseDoubleClick=');
            that.resetDragListNodeMass(data.value);
        });

        this._channel.on("mouseDown", function (data, envelope) {

            that.processNewSelections(data.value);
        });

        this._channel.on("mouseUp", function (data, envelope) {

            that.handlermouseUp(data.value);

        });

        this._channel.on("buttondown", function (data, envelope) {

            that.processNewSelections(data.value);
        });

        this._channel.on("buttonup", function (data, envelope) {

            that.handlermouseUp(data.value);

        });

        this._channel.on("mouseMove", function (data, envelope) {
            //console.log('mouseMove=');
            that.checkForHighLights(data.value);
        });
    },
    point: function (node) {

        if (!this.nodePoints[node.id]) {
            console.log('make new point');
            const mass = node.data.mass || 1.0;
            this.nodePoints[node.id] = new Point(Vector.random(), mass);
        }
        
        return this.nodePoints[node.id];
    },
    spring: function (edge) {
        if (!this.edgeSprings[edge.id]) {
            const length = edge.data.length ? edge.data.length : 1.0;
        
            const findExistingSpring = (edges) => {
                return edges.find(e => this.edgeSprings[e.id]) || false;
            };
        
            let existingSpring = findExistingSpring(this.graph.getEdges(edge.source, edge.target));
            if (!existingSpring) {
                existingSpring = findExistingSpring(this.graph.getEdges(edge.target, edge.source));
            }
        
            if (existingSpring) {
                return new Spring(existingSpring.point1, existingSpring.point2, 0.0, 0.0);
            }
        
            this.edgeSprings[edge.id] = new Spring(
                this.point(edge.source), this.point(edge.target), length, this.stiffness
            );
        }
        
        return this.edgeSprings[edge.id];
    },
    // callback should accept two arguments: Node, Point
    eachNode: function (callback) {
        this.graph.nodes.forEach((n) => {
            callback(n, this.point(n));
        });
    },
    // callback should accept two arguments: Edge, Spring
    eachEdge: function (callback) {
        var t = this;
        this.graph.edges.forEach( (e) =>{
            callback.call(t, e, t.spring(e));
        });
    },
    // callback should accept one argument: Spring
    eachSpring: function (callback) {
        var t = this;
        this.graph.edges.forEach( (e) =>{
            callback.call(t, t.spring(e));
        });
    },
    // Physics stuff
    applyCoulombsLaw: function () {
        this.eachNode( (n1, point1) =>{
            this.eachNode( (n2, point2)=> {
                if (point1 !== point2) {
                    var d = point1.p.subtract(point2.p);
                    var distance = d.magnitude() + 0.1; // avoid massive forces at small distances (and divide by zero)
                    var direction = d.normalise();

                    // apply force to each end point
                    point1.applyForce(direction.multiply(this.repulsion).divide(distance * distance * 0.5));
                    point2.applyForce(direction.multiply(this.repulsion).divide(distance * distance * -0.5));
                }
            });
        });
    },
    applyHookesLaw: function () {
        this.eachSpring( (spring) => {
            var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
            var displacement = spring.length - d.magnitude();
            var direction = d.normalise();

            // apply force to each end point
            spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5));
            spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5));
        });
    },
    attractToCentre: function () {
        this.eachNode( (node, point) =>{
            var direction = point.p.multiply(-1.0);
            point.applyForce(direction.multiply(this.repulsion / 50.0));
        });
    },
    updateVelocity: function (timestep) {        
        this.eachNode( (node, point) =>{
            // Is this, along with updatePosition below, the only places that your
            // integration code exist?
            point.v = point.v.add(point.a.multiply(timestep)).multiply(this.damping);
            point.a = new Vector(0, 0);
        });
    },
    updatePosition: function (timestep) {
        this.eachNode( (node, point) =>{
            // Same question as above; along with updateVelocity, is this all of
            // your integration code?
            point.p = point.p.add(point.v.multiply(timestep));
        });
    },
    // Calculate the total kinetic energy of the system
    totalEnergy: function (timestep) {
        var energy = 0.0;
        this.eachNode( (node, point) =>{
            var speed = point.v.magnitude();
            energy += 0.5 * point.m * speed * speed;
        });

        return energy;
    },

    //formerly mouse double click
    resetDragListNodeMass:function(e) {

        //reset nearest draglist node mass

        console.log('mouseDoubleClick_');

        if (e.target.id == "myCanvas") {

            var pos = $(this.canvasId).offset();

            var p = this.drawing.dims.currentPositionFromScreen(pos, e.evt);

            var newNearest = this.nearestPoint(p);

            if (newNearest.node != null) {
                // find node in dragged list
                // remove it
                // reset its mass
                var idx = 0;

                while (idx < this.dragList.length) {
                    if (this.dragList[idx] != null &&
                        this.dragList[idx].id == newNearest.node.id) {

                        this.nodePoints[this.dragList[idx].id].m = this.dragList[idx].m;
                        this.dragList[idx] = null;
                    }
                    idx++;
                }


            }
        }
    },

    //formerly mousedown
    processNewSelections: function (p) {        
        console.log('mouseDown_');

        this.mouseup = false;

       // var p = this.drawing.currentPositionFromScreen(p);

        var newNearest = this.nearestPoint(p);

        if (newNearest.node != null) {

            if (newNearest.node.id != this.selected.node.id) {
                this.selected.point.m = 1;
                this.resetMasses();

                this.selected = newNearest;

                console.log('selected changed: ' + this.selected);

                this.notifySelection(this.selected);
            }

            if (newNearest.node.id != this.nearest.node.id) {
                this.nearest = newNearest;
                this.notifyHighLight(this.nearest);
            }

            if (newNearest.node.id != this.dragged.node.id) {
                this.dragged = newNearest;
            }
        }

        if (this.selected.node !== null) {
        //    this.selectionMass = this.dragged.point.m;



            if (this.dragged.node.id != -1) {

                var idx = 0;
                var found = false;
                while (idx < this.dragList.length) {
                    if (this.dragList[idx] != null &&
                        this.dragList[idx].id == newNearest.node.id) {
                        found = true;
                    }
                    idx++;
                }

                if (!found) {
                    this.dragList.push({ id: this.dragged.node.id, m: this.dragged.point.m });
                    this.dragged.point.m = 10000;
                }


            }




        }

        


        // if (e.target.id == "up") this.drawing.moving = 'UP';
        // if (e.target.id == "dn") this.drawing.moving = 'DOWN';
        // if (e.target.id == "we") this.drawing.moving = 'WEST';
        // if (e.target.id == "no") this.drawing.moving = 'NORTH';
        // if (e.target.id == "es") this.drawing.moving = 'EAST';
        // if (e.target.id == "so") this.drawing.moving = 'SOUTH';
        // if (e.target.id == "de") this.drawing.moving = 'DEBUG';

    },

    resetMasses: function (e) {

        var idx = 0;

        while (idx < this.dragList.length) {
            if (this.dragList[idx]!=null)
                this.nodePoints[this.dragList[idx].id].m = this.dragList[idx].m;
            idx++;
        }

        this.dragList = [];


    },

    //mouseup
    handlermouseUp: function (e) {

        console.log('mouseUp_');

       // if (e.target.id == "myCanvas") {

            this.drawing.addToMovementPath(1000000, 1000000);
            this.dragged = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };



            this.mouseup = true;
      //  } else {
      //      this.drawing.moving = '';
      //  }

    },

    //formerly mousemove
    checkForHighLights: function (p) {

    //    console.log('mouseMove_');

    //    var pos = $(this.canvasId).offset();
    //    var p = this.drawing.currentPositionFromScreen(pos, e.evt);

        if (!this.mouseup && this.selected.node.id !== -1 && this.dragged.node.id == -1) {
            this.drawing.addToMovementPath(p.clientX, p.clientY);
        }

        var newNearest = this.nearestPoint(p);


        if (newNearest.node != null && newNearest.node.id != this.nearest.node.id) {
            this.nearest = newNearest;
            //  console.log('nearest changed: ' + this.nearest);
            this.notifyHighLight(this.nearest);
        }


        if (this.dragged.node.id !== -1) {
            this.dragged.point.p.x = p.x;
            this.dragged.point.p.y = p.y;
        }
    },

    getSelection: function (node) {
            // 1 nothing
            // 2 nearest
            // 3 selected
            var selectedPersonId = '';
            var nodePersonId = '';

            if (this.selected != null &&
                this.selected.node != undefined &&
                this.selected.node.data != undefined &&
                this.selected.node.data.RecordLink != undefined) {
                  selectedPersonId = this.selected.node.data.RecordLink.PersonId;
            }

            if (node.data != undefined && node.data.RecordLink != undefined) {
                nodePersonId = node.data.RecordLink.PersonId;
            }

            if (selectedPersonId == nodePersonId && node.data.type != 'infonode') {
                return 3;
            }
            else if (this.nearest !== null && this.nearest.node !== null && this.nearest.node.id === node.id) {
                return 2;
            } else {
                return 1;
            }
        },


    notifyHighLight: function (e) {

        this._channel.emit("nodeHighlighted",{value:e.node.data.RecordLink});
    },

    notifySelection: function (e) {

        this._channel.emit("nodeSelected",{value:e.node.data.RecordLink});
    },

    //Find the nearest point to a particular position
    nearestPoint : function (pos) {
        var min = { node: null, point: null, distance: 1 };
        var t = this;
        this.graph.nodes.forEach(function (n) {
            if (n.data.type == 'normal') {
                var point = t.point(n);
                var distance = point.p.subtract(pos).magnitude();

                if (min.distance === null || distance < min.distance) {
                    min = { node: n, point: point, distance: distance };
                }
            }
        });

        return min;
    },

    hasNearestNode :function(){
        if (this.nearest != null && this.nearest.node != null)
            return true;
        else
            return false;

    },

    nearestNodePoint : function () {
        if(this.nearest.node != null) {
            return this.nodePoints[this.nearest.node.id];
        }
        else
        {
            console.log('nearest node null');
            return -1;
        }
    },

    getBoundingBox : function () {
        var bottomleft = new Vector(-2, -2);
        var topright = new Vector(2, 2);

        this.graph.nodes.map((n) => this.point(n)).forEach((point) => {
            bottomleft.x = Math.min(bottomleft.x, point.p.x);
            bottomleft.y = Math.min(bottomleft.y, point.p.y);
            topright.x = Math.max(topright.x, point.p.x);
            topright.y = Math.max(topright.y, point.p.y);
        });

        var padding = topright.subtract(bottomleft).multiply(0.07); // ~5% padding

        return { bottomleft: bottomleft.subtract(padding), topright: topright.add(padding) };
    }

}
