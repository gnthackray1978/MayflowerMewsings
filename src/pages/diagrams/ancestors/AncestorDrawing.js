import { AncestorGraph } from './AncestorGraph.js';
import { AncestorLayout } from './AncestorLayout.js';
import {Drawing} from '../Drawing.js'; // new import

var stackSize =0;


export function AncestorDrawing() {  // renamed from AncTree
    console.log('anctree constructed');
    this.ancGraph = new AncestorGraph([]);
    this.drawing = new Drawing();
    this.layout = new AncestorLayout();

    this._qryString = '';

    this.nodes = [];
    this.edges = [];
    this.childlessMarriages = [];

    this.centrePoint = 750.0;
    this.centreVerticalPoint = 0.0;
    this.zoomLevel = 0.0;
    this.centrePointXOffset = 0.0;
    this.centrePointYOffset = 0.0;

    this.zoomPercentage = 0.0;
    this.mouseXPercLocat = 0.0;
    this.mouseYPercLocat = 0.0;

    this.zoomAmount = 8; //int


    this.sourceId = null;


    this.selectedPersonId = '';
    this.selectedPersonX = 0;
    this.selectedPersonY = 0;    
    this.movementx =0;
    this.movementy =0;
    
}


AncestorDrawing.prototype = {  // renamed from AncTree.prototype

    SetMovementX: function (x) {
        this.movementx = x;
    },
    SetMovementY: function (y) {    
        this.movementy = y;
    },

    CreateWithDefaultValues: function (personId, data) {
         
      if(data.length === 0){
        console.log('no data to set up ancestor tree');
        return;
      }

      var _zoomLevel = 100;
      
      this.selectedPersonId = personId;
      this.selectedPersonX = 0;
      this.selectedPersonY = 0;

      this.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0, 
                      70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

      //    var _personId = '913501a6-1216-4764-be8c-ae11fd3a0a8b';
      //    var _zoomLevel = 100;
      //    var _xpos = 750.0;
      //    var _ypos = 100.0;
      this.ancGraph = new AncestorGraph(data);
      this.nodes = data;
 
      this.SetCentrePoint(0, 0);
    
      this.RelocateToSelectedPerson();
    
      this.drawing.bt_refreshData = false;

    },

    SetInitialValues: function (zoomPerc,
                                dist_bet_box,
                                dist_bet_gen,
                                box_wid,
                                box_hig,
                                dist_bet_fam,
                                low_stalk_hi,
                                mid_span,
                                top_span,
                                screen_width,
                                screen_height
                                ) {

        this.centrePoint = 750.0;
        this.centreVerticalPoint = 0.0;
        this.zoomLevel = 0.0;
        this.centrePointXOffset = 0.0;
        this.centrePointYOffset = 0.0;
        //this.mouse_x = 0; //int
        //this.mouse_y = 0; //int
        this.mouseXPercLocat = 0.0;
        this.mouseYPercLocat = 0.0;

        this.drawing.bt_screenHeight = screen_height;
        this.drawing.bt_screenWidth = screen_width;

        this.zoomPercentage = zoomPerc;

        this.layout.init(dist_bet_box,
                            dist_bet_gen,
                            box_wid,
                            box_hig,
                            dist_bet_fam,
                            low_stalk_hi,
                            mid_span,
                            top_span); 
    },

    SetZoom: function (delta) {
        const x = this.drawing.bt_screenWidth / 2;
        const y = this.drawing.bt_screenHeight / 2;
        this.drawing.SetMouse(x, y);
        
        // Capture percentage factors before zoom
        const before = this.drawing.GetPercDistances2();
        
        if (delta !== 0.0) {
          //  console.log('centre vertical point1: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);
            
            // Update zoom values and refresh layout once
            this.zoomPercentage += delta;
            this.zoomLevel += delta;
            this.layout.zoomLayoutProps(this.zoomPercentage);
            this.RefreshLayout();
            
            // Capture percentage factors after zoom
            const after = this.drawing.GetPercDistances2();
            const drawingHeight = this.drawing.drawingY2 - this.drawing.drawingY1;
            const drawingWidth = this.drawing.drawingX2 - this.drawing.drawingX1;
            
            // Adjust center positions based on the delta in percentages
            this.centreVerticalPoint += (drawingHeight / 100) * (after.y - before.y);
            this.centrePoint += (drawingWidth / 100) * (after.x - before.x);
            
            //console.log('centre vertical point2: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);
            this.RefreshLayout();
        }
    },

    SetZoomStart: function () {
        let result = this.drawing.GetPercDistances2();
        this.mouseXPercLocat = result.x;
        this.mouseYPercLocat = result.y;

        console.log('setzoomstart: ' + this.mouseXPercLocat + ' ' + this.mouseYPercLocat);
    },

    PerformClick: function (x, y) {

        console.log('perform click: ' + x + ' , ' + y);

        var mouseLink = this.drawing.bt_links.LinkContainingPoint(x, y);

        if (mouseLink) {
            var selectedPerson = this.ancGraph.GetTreePerson(mouseLink.action);

            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;

            this.drawing.bt_refreshData = true;
        }
        else {

            var buttonLink = this.drawing.bt_buttonLinks.LinkContainingPoint(x, y);
            
            if (buttonLink) {

                var parts = buttonLink.action.split(',');

                var clickedPerson = this.ancGraph.GetTreePerson(parts[0]);

                var isVis = parts[1] === 'false' ? true : false;

                this.ancGraph.SetVisibility(clickedPerson, isVis);


            }

        }



    },

    SetCentrePoint: function (param_x, param_y) {

        this.centrePoint = param_x ;
        this.centreVerticalPoint = param_y ;

        // if (param_x == 1000000 && param_y == 1000000) {
        //     this.centrePointXOffset = 0;
        //     this.centrePointYOffset = 0;
        // }
        // else {

        //     if (this.centrePointXOffset === 0) {

        //         this.centrePointXOffset = this.centrePoint - param_x;
        //     }
        //     else {

        //         this.centrePoint = param_x + this.centrePointXOffset;
        //     }


        //     if (this.centrePointYOffset === 0) {
        //         this.centrePointYOffset = this.centreVerticalPoint - param_y;
        //     }
        //     else {
        //         console.log( param_y +' : '+ this.centrePointYOffset);
        //         this.centreVerticalPoint = param_y + this.centrePointYOffset;
        //     }

        // }

    // console.log('setcentrepoint: '+ this.centrePointXOffset + ' ' + this.centrePoint);
    }, //end set centre point
    ResetOffset: function () {

        this.centrePointXOffset = 0;
        this.centrePointYOffset = 0;
    },
    ZoomIn: function () {
        this.zoomAmount++;
        this.SetZoom(this.zoomAmount);
    },
    ZoomOut: function () {
        if (this.zoomAmount > 7)
            this.zoomAmount--;

       this.SetZoom(this.zoomAmount - (this.zoomAmount * 2));
      
    },
    
   
    RelocateToSelectedPerson: function () {
        const personId = this.selectedPersonId;
        const _xpos = this.selectedPersonX;
        const _ypos = this.selectedPersonY;

        this.RefreshLayout();

        let distanceToMoveX = 0.0;
        let distanceToMoveY = 0.0;
        const _temp = this.ancGraph.GetTreePerson(personId);

        if (_temp !== null) {
            const currentPersonLocationX = (_temp.X1 + _temp.X2) / 2;
            const currentPersonLocationY = (_temp.Y1 + _temp.Y2) / 2;

            if (_xpos === 0.0) {
                const requiredLocationX = this.drawing.bt_screenWidth / 2;
                distanceToMoveX = requiredLocationX - currentPersonLocationX;
            } else {
                distanceToMoveX = _xpos - currentPersonLocationX;
            }

            if (_ypos === 0.0) {
                const requiredLocationY = this.layout.boxHeight;
                distanceToMoveY = requiredLocationY - currentPersonLocationY;
            } else {
                distanceToMoveY = _ypos - currentPersonLocationY;
            }

            this.centrePoint += distanceToMoveX;
            this.centreVerticalPoint -= distanceToMoveY;

            this.RefreshLayout();
            
            const x = _xpos === 0 ? this.drawing.bt_screenWidth / 2 : currentPersonLocationX;
            const y = _ypos === 0 ? 0 - this.drawing.bt_screenHeight / 2 : currentPersonLocationY;

            this.drawing.SetMouse(x, y);
            this.SetZoomStart();
            this.RefreshLayout();
            //this.Draw();
        }
    },

    IsValid :function () {

        if(this.nodes.length === 0){
            console.log('Anc Tree not supplied with nodes data- cant draw');
            return;
        }

        return this.nodes.length>0;
    },

    Draw :function (ui) {

        ui.ClearScreen();

       // this.RefreshLayout();


        this.bt_links = [];

        this.nodes.forEach((generation, genidx) => {
            generation.forEach(node => {
                const personLink = ui.DrawPerson(node, this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, this.sourceId, this.zoomPercentage);
        
                if (personLink !== null) {
                    this.bt_links.push(personLink);
                }
            });
        });


        this.edges.forEach(edgeGroup => {
            edgeGroup.forEach(edge => {
                ui.DrawLine(this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, edge);
            });
        });


    },



    RefreshLayout: function () {
        this.drawing.drawingX2 = 0.0;
        this.drawing.drawingX1 = 0.0;
        let _y = this.centreVerticalPoint;
        let percentageLess = 0.0;

        this.layout.adjustedDistances = [];
        this.layout.adjustedBoxWidths = [];
        this.layout.adjustedBoxHeights = [];

        this.nodes[0][0].X1 = this.centrePoint;
        this.nodes[0][0].X2 = this.centrePoint + this.layout.boxWidth;
        this.nodes[0][0].Y1 = _y;
        this.nodes[0][0].Y2 = _y + this.layout.boxHeight;

        this.edges = this.nodes.map(g => g.map(() => []));

        // Replaced while loops with forEach loops
        this.nodes.forEach((generation, genidx) => {
            percentageLess += 2;
            generation.forEach((currentNode, personIdx) => {
                this.layout.changeGenScale(this.nodes, currentNode, percentageLess);
                let xEdge = this.GetNewX(
                    this.nodes,
                    currentNode,
                    this.layout.adjustedDistances[genidx],
                    this.layout.adjustedBoxWidths[genidx]
                );
                const spacing = this.ancGraph.LastGenerationSpacing(currentNode);
                let overlap = spacing.previousX2 > xEdge.x1 ?
                              spacing.previousX2 - xEdge.x1 + this.layout.adjustedDistances[genidx] : 0.0;
                if (overlap > 0 || spacing.spacing > 0) {
                    const requiredSpace = (spacing.nodeCount * this.layout.adjustedBoxWidths[genidx - 1]) +
                                          ((spacing.nodeCount + 1) * (this.layout.adjustedDistances[genidx - 1] + 5));
                    if (requiredSpace > (spacing.spacing + overlap) || overlap === 0) {
                        overlap += (requiredSpace - (spacing.spacing + overlap));
                    }
                }
                if (overlap > 0) {
                    this.ancGraph.forEachPrevNodeDescendant(currentNode, (n) => {
                        let xRange = { x1: 0.0, x2: 0.0 };
                        if ((!n.parentsKnown) || (n.node.GenerationIdx === genidx)) {
                            if (n.node.GenerationIdx === genidx) {
                                xRange.x1 = n.node.X1 - overlap;
                                xRange.x2 = n.node.X2 - overlap;
                            } else {
                                let parentlessPersonStartX = n.node.X1 - overlap;
                                if (parentlessPersonStartX === 0.0) {
                                    parentlessPersonStartX = 15;
                                    xRange.x2 = n.next.X1 - parentlessPersonStartX;
                                    xRange.x1 = xRange.x2 - this.layout.adjustedBoxWidths[n.next.GenerationIdx];
                                } else {
                                    xRange.x1 = parentlessPersonStartX;
                                    xRange.x2 = xRange.x1 + this.layout.adjustedBoxWidths[n.next.GenerationIdx];
                                }
                            }
                        } else {
                            this.layout.setBoxWidth(n.node);
                            xRange = this.ancGraph.createXAxisFromParents(n.node, this.layout.boxWidth);
                        }
                        n.update(xRange);
                    });
                }
                currentNode.X1 = xEdge.x1;
                currentNode.X2 = xEdge.x2;
                currentNode.Y1 = _y;
                currentNode.Y2 = _y + this.layout.adjustedBoxHeights[genidx];
                this.ancGraph.SetZoomLevel(currentNode);
            });
            _y -= this.layout.distanceBetweenGens;
        });

        this.layout.setBoxWidth(this.nodes[0][0]);
        let result = this.ancGraph.createXAxisFromParents(this.nodes[0][0], this.layout.boxWidth);
        this.nodes[0][0].X1 = result.x1;
        this.nodes[0][0].X2 = result.x2;
        this.nodes[0][0].IsDisplayed = true;

        this.drawing.drawingX1 = Math.min(...this.nodes.map(node => node[0].X1));
        this.drawing.drawingX2 = Math.max(...this.nodes.map(node => node[node.length - 1].X2));
        this.drawing.drawingY1 = this.nodes[this.nodes.length - 1][0].Y2;
        this.drawing.drawingY2 = this.nodes[0][0].Y1;
   
        //this.drawingCentre = (this.drawingX2 - this.drawingX1) / 2;
       

        this.CreateEdges();
    },

    CreateEdges : function () {

        this.nodes.forEach((generation, genidx) => {
            if (genidx + 1 >= this.edges.length) {
                return;
            }
        
            generation.forEach((node, personIdx) => {
                
        
                if (node.Parents.length === 0) {
                    this.edges[genidx][personIdx] = [];
                    return;
                }
        
                const middleTopChild = node.Y1;
                const parentHeight = this.ancGraph.NextGenerationHeight(genidx);
                const bottomParent = node.Parents[0].Y1 + parentHeight;
                const distanceBetweenGens = this.ancGraph.DistanceToNextGeneration(genidx);
                const middleXChild = (node.X1 + node.X2) / 2;
                const middleGeneration = node.Y1 - (distanceBetweenGens / 2) + 10;
                const drawingHeight = this.drawing.drawingY2 - this.drawing.drawingY1;
                const _family0 = [
                    [middleXChild, middleTopChild],
                    [middleXChild, middleGeneration]
                ];
        
                node.Parents.forEach(parent => {
                    const middleParent = (parent.X1 + parent.X2) / 2;
                    const parentPosition = (drawingHeight > 200 || this.nodes.length === 2) ? bottomParent : middleGeneration - 4;
        
                    _family0.push(
                        [middleParent, middleGeneration],
                        [middleParent, parentPosition],
                        [middleParent, middleGeneration],
                        [middleXChild, middleGeneration]
                    );
                });
        
                this.edges[genidx][personIdx] = _family0;
            });
        });



    }, //this.CreateEdges    
    
    GetNewX:function (nodes,node, distanceApart, boxWidth) {
       
        const personIdx = node.Index;
        const genidx = node.GenerationIdx;

        if (genidx == 0) {
            return {
                x1: this.centrePoint,
                x2: this.centrePoint + boxWidth
            };
        }

        const childIdx = nodes[genidx][personIdx].ChildIdx;                
        const childNode = nodes[genidx - 1][childIdx];
        const childBoxWidth = childNode.X2 - childNode.X1;
        const childCentrePoint = childNode.X1 + (childBoxWidth / 2);
    
        const isFirstParent = nodes[genidx][personIdx + 1]?.ChildIdx === childIdx;
        const isLastParent = nodes[genidx][personIdx - 1]?.ChildIdx === childIdx;
        const isSingleParent = !isFirstParent && !isLastParent;
    
        let x1 = 0.0;

        if (isFirstParent) {
            x1 = childCentrePoint - (distanceApart / 2) - boxWidth;
        } else if (isLastParent) {
            x1 = childCentrePoint + (distanceApart / 2);
        } else if (isSingleParent) {
            x1 = childCentrePoint - (distanceApart / 2) - (boxWidth / 2);
        }
              
        return {
            x1: x1,
            x2: x1 + boxWidth
        };
    }

    

};


