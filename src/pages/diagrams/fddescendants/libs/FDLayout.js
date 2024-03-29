
import {Vector} from "../types/Vector.js";
import {Node} from "../types/Node.js";
import {Point} from "../types/Point.js";
import {Spring} from "../types/Spring.js";

export function FDLayout(channel, graph, camera, settings, parentNode, parentLayout, firstNode) {
    this._channel = channel;

    this.selected =   {node: new Node(-1,null), point: new Point(new Vector(0,0),0), distance: -1 };
    this.nearest = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };
    this.dragged = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };
    this.parentNode = parentNode;
    this.parentLayout = parentLayout;

    this.firstNode = firstNode;
    this._cameraView = camera;

    this.canvasId = '#myCanvas';
    this.mouseup = true;

    this.graph = graph;
    this.stiffness = settings.stiffness; // spring stiffness constant
    this.repulsion = settings.repulsion; // repulsion constant
    this.damping = settings.damping; // velocity damping factor

    this.nodePoints = {}; // keep track of points associated with nodes
    this.edgeSprings = {}; // keep track of springs associated with edges

    this._cameraView.layout = this; // oh dear george!
    this._cameraView.currentBB = this.getBoundingBox(); // fix this!!!

    this.selectionChanged = null;
    this.nearestChanged = null;
    this.draggedChanged = null;

    this.highLightedListeners = [];

    this.selectedListeners = [];
    this.dragList = [];

    this.selectionMass = 0;

    var that = this;

    //handle channel events
    this._channel.on("mouseDoubleClick", function(data, envelope) {
        console.log('mouseDoubleClick=');
        that.resetDragListNodeMass(data.value);
    });

    this._channel.on("mouseDown", function(data, envelope) {

        that.processNewSelections(data.value);
    });

    this._channel.on("mouseUp", function(data, envelope) {

        that.handlermouseUp(data.value);

    });

    this._channel.on("buttondown", function(data, envelope) {

        that.processNewSelections(data.value);
    });

    this._channel.on("buttonup", function(data, envelope) {

        that.handlermouseUp(data.value);

    });

    this._channel.on("mouseMove", function(data, envelope) {
        //console.log('mouseMove=');
        that.checkForHighLights(data.value);
    });


}

FDLayout.prototype = {
    point: function (node) {
        if (typeof (this.nodePoints[node.id]) === 'undefined') {
            var mass = typeof (node.data.mass) !== 'undefined' ? node.data.mass : 1.0;
            this.nodePoints[node.id] = new Point(Vector.random(), mass);
        }

        return this.nodePoints[node.id];
    },
    spring: function (edge) {
        if (typeof (this.edgeSprings[edge.id]) === 'undefined') {
            var length = typeof (edge.data.length) !== 'undefined' ? edge.data.length : 1.0;

            var existingSpring = false;

            var from = this.graph.getEdges(edge.source, edge.target);
            from.forEach(function (e) {
                if (existingSpring === false && typeof (this.edgeSprings[e.id]) !== 'undefined') {
                    existingSpring = this.edgeSprings[e.id];
                }
            }, this);

            if (existingSpring !== false) {
                return new Spring(existingSpring.point1, existingSpring.point2, 0.0, 0.0);
            }

            var to = this.graph.getEdges(edge.target, edge.source);
            from.forEach(function (e) {
                if (existingSpring === false && typeof (this.edgeSprings[e.id]) !== 'undefined') {
                    existingSpring = this.edgeSprings[e.id];
                }
            }, this);

            if (existingSpring !== false) {
                return new Spring(existingSpring.point2, existingSpring.point1, 0.0, 0.0);
            }

            this.edgeSprings[edge.id] = new Spring(
            this.point(edge.source), this.point(edge.target), length, this.stiffness
            );
        }

        return this.edgeSprings[edge.id];
    },
    // callback should accept two arguments: Node, Point
    eachNode: function (callback) {
        var t = this;
        this.graph.nodes.forEach(function (n) {
            callback.call(t, n, t.point(n));
        });
    },
    // callback should accept two arguments: Edge, Spring
    eachEdge: function (callback) {
        var t = this;
        this.graph.edges.forEach(function (e) {
            callback.call(t, e, t.spring(e));
        });
    },
    // callback should accept one argument: Spring
    eachSpring: function (callback) {
        var t = this;
        this.graph.edges.forEach(function (e) {
            callback.call(t, t.spring(e));
        });
    },
    // Physics stuff
    applyCoulombsLaw: function () {
        this.eachNode(function (n1, point1) {
            this.eachNode(function (n2, point2) {
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
        this.eachSpring(function (spring) {
            var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
            var displacement = spring.length - d.magnitude();
            var direction = d.normalise();

            // apply force to each end point
            spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5));
            spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5));
        });
    },
    attractToCentre: function () {
        this.eachNode(function (node, point) {
            var direction = point.p.multiply(-1.0);
            point.applyForce(direction.multiply(this.repulsion / 50.0));
        });
    },
    updateVelocity: function (timestep) {
        this.eachNode(function (node, point) {
            // Is this, along with updatePosition below, the only places that your
            // integration code exist?
            point.v = point.v.add(point.a.multiply(timestep)).multiply(this.damping);
            point.a = new Vector(0, 0);
        });
    },
    updatePosition: function (timestep) {
        this.eachNode(function (node, point) {
            // Same question as above; along with updateVelocity, is this all of
            // your integration code?
            point.p = point.p.add(point.v.multiply(timestep));
        });
    },
    // Calculate the total kinetic energy of the system
    totalEnergy: function (timestep) {
        var energy = 0.0;
        this.eachNode(function (node, point) {
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

            var p = this._cameraView.currentPositionFromScreen(pos, e.evt);

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
    processNewSelections: function (e) {

        console.log('mouseDown_');

        if (e.target.id == "myCanvas") {
            this.mouseup = false;

            var pos = $(this.canvasId).offset();

            var p = this._cameraView.currentPositionFromScreen(pos, e.evt);

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

        }


        if (e.target.id == "up") this._cameraView.moving = 'UP';
        if (e.target.id == "dn") this._cameraView.moving = 'DOWN';
        if (e.target.id == "we") this._cameraView.moving = 'WEST';
        if (e.target.id == "no") this._cameraView.moving = 'NORTH';
        if (e.target.id == "es") this._cameraView.moving = 'EAST';
        if (e.target.id == "so") this._cameraView.moving = 'SOUTH';
        if (e.target.id == "de") this._cameraView.moving = 'DEBUG';

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

        if (e.target.id == "myCanvas") {

            this._cameraView.addToMouseQueue(1000000, 1000000);
            this.dragged = { node: new Node(-1, null), point: new Point(new Vector(0, 0), 0), distance: -1 };



            this.mouseup = true;
        } else {
            this._cameraView.moving = '';
        }

    },

    //formerly mousemove
    checkForHighLights: function (e) {

    //    console.log('mouseMove_');

        var pos = $(this.canvasId).offset();
        var p = this._cameraView.currentPositionFromScreen(pos, e.evt);

        if (!this.mouseup && this.selected.node.id !== -1 && this.dragged.node.id == -1) {
            this._cameraView.addToMouseQueue(e.clientX, e.clientY);
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

        this.eachNode(function (n, point) {
            if (point.p.x < bottomleft.x) {
                bottomleft.x = point.p.x;
            }
            if (point.p.y < bottomleft.y) {
                bottomleft.y = point.p.y;
            }
            if (point.p.x > topright.x) {
                topright.x = point.p.x;
            }
            if (point.p.y > topright.y) {
                topright.y = point.p.y;
            }
        });

        var padding = topright.subtract(bottomleft).multiply(0.07); // ~5% padding

        return { bottomleft: bottomleft.subtract(padding), topright: topright.add(padding) };
    }

}
