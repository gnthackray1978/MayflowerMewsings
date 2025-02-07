
import { AncestorGraph } from './AncestorGraph.js';

var stackSize =0;

export function Layout(){

    //really this is graph state and needs to be in the graph class

    //layout class needs to contain methods that alter the state
    this.initial_layout_state = {
        distanceBetweenBoxs : 0.0,
        distanceBetweenGens : 0.0,
        boxWidth : 0.0,
        boxHeight :0.0,
        distancesbetfam :0.0,
        lowerSpan : 0.0,
        middleSpan : 40.0,
        topSpan : 20.0
    }

    this.distanceBetweenBoxs = 0.0;
    this.distanceBetweenGens = 0.0;
    this.distancesbetfam = 0.0;
    this.adjustedDistances = [];
    this.adjustedBoxWidths = [];
    this.adjustedBoxHeights = [];
    this.boxWidth = 0.0;
    this.boxHeight = 0.0;
    this.halfBox = 0.0;
    this.halfBoxHeight= 0.0;
    this.lowerSpan =0.0;
    this.middleSpan = 0.0;
    this.topSpan = 0.0;

}

Layout.prototype = {

   
    setBoxWidth : function(movePerson){

        if (this.adjustedBoxWidths.length > movePerson.GenerationIdx)
        {
            this.boxWidth = this.adjustedBoxWidths[movePerson.GenerationIdx];
        }
        else
        {
            this.boxWidth = this.boxWidth;
        }
    },

    zoomLayoutProps : function(zoomPercentage){
        let _workingtp = 0.0;
        _workingtp = this.initial_layout_state.distanceBetweenBoxs / 100;
        this.distanceBetweenBoxs = _workingtp * zoomPercentage;
        _workingtp = this.initial_layout_state.boxWidth / 100;
        this.boxWidth = _workingtp * zoomPercentage;
        this.halfBox = this.boxWidth / 2;
        _workingtp = this.initial_layout_state.distancesbetfam / 100;
        _workingtp = this.initial_layout_state.distanceBetweenGens / 100;
        this.distanceBetweenGens = _workingtp * zoomPercentage;
        _workingtp = this.initial_layout_state.boxHeight / 100;
        this.boxHeight = _workingtp * zoomPercentage;

        this.halfBoxHeight = this.boxHeight / 2;

    },

    changeGenScale:function (nodes, node, percentageLess ) {

        const genidx = node.GenerationIdx;
        const personIdx = node.Index;
        let adjustedBoxHeight = this.boxHeight;
        let adjustedDistanceApart = 0.0;
        let adjustedBoxWidth = this.boxWidth;

        const childIdx = nodes[genidx][personIdx].ChildIdx;

        if (genidx > 0) {
            adjustedBoxHeight = this.boxHeight * (1 - percentageLess / 100);
            const childBoxWidth = nodes[genidx - 1][childIdx].X2 - nodes[genidx - 1][childIdx].X1;
            adjustedDistanceApart = this.distanceBetweenBoxs * (1 - percentageLess / 100);
            adjustedBoxWidth = childBoxWidth * (1 - percentageLess / 100);
        }

        this.adjustedDistances[genidx] = adjustedDistanceApart;
        this.adjustedBoxWidths[genidx] = adjustedBoxWidth;
        this.adjustedBoxHeights[genidx] = adjustedBoxHeight;
    },

    init: function(dist_bet_box,
                    dist_bet_gen,
                    box_wid,
                    box_hig,
                    dist_bet_fam,
                    low_stalk_hi,
                    mid_span,
                    top_span){

        this.initial_layout_state.distanceBetweenBoxs = dist_bet_box;
        this.initial_layout_state.distanceBetweenGens = dist_bet_gen;
        this.initial_layout_state.boxWidth = box_wid;
        this.initial_layout_state.boxHeight = box_hig;
        this.initial_layout_state.distancesbetfam = dist_bet_fam;
        this.initial_layout_state.lowerSpan = low_stalk_hi;
        this.initial_layout_state.middleSpan = mid_span;
        this.initial_layout_state.topSpan = top_span;


        this.distanceBetweenBoxs = this.initial_layout_state.distanceBetweenBoxs;
        this.distanceBetweenGens = this.initial_layout_state.distanceBetweenGens;
        this.boxWidth = this.initial_layout_state.boxWidth;
        this.boxHeight = this.initial_layout_state.boxHeight;
        this.distancesbetfam = this.initial_layout_state.distancesbetfam;
        this.halfBox = this.boxWidth / 2;
        this.halfBoxHeight = this.boxHeight / 2;
        this.lowerSpan = this.initial_layout_state.lowerSpan;
        this.middleSpan = this.initial_layout_state.middleSpan;
        this.topSpan = this.initial_layout_state.topSpan;
    }
}

export function AncTree() {
    console.log('anctree constructed');
    this._qryString = '';
    this.bt_refreshData =false;
    this.bt_screenHeight = 0.0;
    this.bt_screenWidth = 0.0;

    this.bt_buttonLinks = [];
    this.bt_links = [];

    this.generations = [];
    this.edges = [];
    this.childlessMarriages = [];

    this.centrePoint = 750.0;
    this.centreVerticalPoint = 0.0;
    this.zoomLevel = 0.0;
    this.centrePointXOffset = 0.0;
    this.centrePointYOffset = 0.0;



    this.layout = new Layout();
 
    this.zoomPercentage = 0.0;
    this.mouse_x = 0; //int
    this.mouse_y = 0; //int

    this.drawingX1 = 0.0;
    this.drawingX2 = 0.0;
    this.drawingY1 = 0.0;
    this.drawingY2 = 0.0;

    this.drawingCentre = 0.0;
    this.drawingWidth = 0.0;
    this.drawingHeight = 0.0;

    this.mouseXPercLocat = 0.0;
    this.mouseYPercLocat = 0.0;

    this.zoomAmount = 8; //int


    this.sourceId = null;


    this.selectedPersonId = '';
    this.selectedPersonX = 0;
    this.selectedPersonY = 0;
    this.treeUI;
    this.movementx =0;
    this.movementy =0;
    this.ancGraph = new AncestorGraph([]);
}


AncTree.prototype = {

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
      this.generations = data;
 
      this.SetCentrePoint(0, 0);
    
      this.RelocateToSelectedPerson();
    
      this.bt_refreshData = false;

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
        this.mouse_x = 0; //int
        this.mouse_y = 0; //int
        this.mouseXPercLocat = 0.0;
        this.mouseYPercLocat = 0.0;

        this.bt_screenHeight = screen_height;
        this.bt_screenWidth = screen_width;

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

    //created
    _GetTreePerson: function (graph, personId) {


        var _genidx = 0;
        var _personIdx = 0;

        while (_genidx < graph.length) {
            _personIdx = 0;

            while (_personIdx < graph[_genidx].length) {

                if (graph[_genidx][_personIdx].PersonId == personId) {
                    return graph[_genidx][_personIdx];
                }
                _personIdx++;
            }
        _genidx++;
        }

        return null;
    },

    SetVisibility: function (parent, isDisplay) {

        var personStack = [];

        parent.Children.forEach((child)=>{
            personStack.push(child);
        });

        var currentTP = parent;
        while (personStack.length > 0) {
            currentTP = personStack.pop();
            currentTP.IsDisplayed = isDisplay;

            currentTP.Spouses.forEach((spouse)=>{
                spouse.IsDisplayed = isDisplay;
            });

            currentTP.Children.forEach((child)=>{
                personStack.push(child);
            });

        }

    },

    SetZoom: function (percentage) {


        var x = this.bt_screenWidth / 2;
        var y = this.bt_screenHeight / 2;

        this.SetMouse(x, y);

 
        this.GetPercDistances();
        this.mouseXPercLocat = this.percX1;
        this.mouseYPercLocat = this.percY1;
        


        if (percentage !== 0.0) {
        
            console.log('centre vertical point1: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);

            var _percLocal_x = 0.0;
            var _percLocal_y = 0.0;

            //zoom drawing components
            this.zoomPercentage += percentage;
            this.zoomLevel += percentage;

            this.layout.zoomLayoutProps(this.zoomPercentage);

            this.ComputeLocations();

            this.GetPercDistances();
            _percLocal_x = this.percX1;
            _percLocal_y = this.percY1;


            this.centreVerticalPoint += (this.drawingHeight / 100) * (_percLocal_y - this.mouseYPercLocat);

            this.centrePoint += (this.drawingWidth / 100) * (_percLocal_x - this.mouseXPercLocat);

            console.log('centre vertical point2: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);

            this.ComputeLocations();
        } //end percentage ==0.0)



        this.DrawTree();

    },
    SetZoomStart: function () {
        this.GetPercDistances();
        this.mouseXPercLocat = this.percX1;
        this.mouseYPercLocat = this.percY1;

        console.log('setzoomstart: ' + this.mouseXPercLocat + ' ' + this.mouseYPercLocat);
    },
    GetPercDistances: function () {


        var _distanceFromX1 = 0.0;
        var _distanceFromY1 = 0.0;
        var _onePercentDistance = 0.0;

        this.percX1 = 0.0;
        this.percY1 = 0.0;


        this.drawingWidth = this.drawingX2 - this.drawingX1;
        this.drawingHeight = this.drawingY2 - this.drawingY1;

        if (this.drawingWidth !== 0 && this.drawingHeight !== 0) {
            if (this.drawingX1 > 0) {
                _distanceFromX1 = this.mouse_x - this.drawingX1; //;
            }
            else {
                _distanceFromX1 = Math.abs(this.drawingX1) + this.mouse_x;
            }

            _onePercentDistance = this.drawingWidth / 100;
            this.percX1 = _distanceFromX1 / _onePercentDistance;

            if (this.drawingY1 > 0) {
                _distanceFromY1 = this.mouse_y - this.drawingY1; // ;
            }
            else {
                _distanceFromY1 = Math.abs(this.drawingY1) + this.mouse_y;
            }

            _onePercentDistance = this.drawingHeight / 100;

            this.percY1 = _distanceFromY1 / _onePercentDistance;

        }

    },

    SetMouse: function (x, y, mousestate) {
        //    console.log('mouse set: ' + x + ' , ' + y);
        this.mouse_x = x;
        this.mouse_y = y;

        if (mousestate == undefined) mousestate = false;

        var mouseLink = this.bt_links.LinkContainingPoint(this.mouse_x, this.mouse_y);

        var buttonLink = this.bt_buttonLinks.LinkContainingPoint(this.mouse_x, this.mouse_y);


        if (mouseLink !== null || buttonLink !== null) {
            document.body.style.cursor = 'pointer';
            //   console.log(mouseLink.action);
        }
        else {
            if (mousestate == false)
                document.body.style.cursor = 'default';
            else
                document.body.style.cursor = 'move';
        }

    },
  

// move this up to the derived classes

    PerformClick: function (x, y) {

        var mouseLink = this.bt_links.LinkContainingPoint(x, y);

        if (mouseLink !== null) {

            var selectedPerson = this._GetTreePerson(this.generations,mouseLink.action);

            //     var zoomReq = this.zoomPercentage; //-100
            //   var xpos = selectedPerson.X1;
            //   var ypos = selectedPerson.Y1;


            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;

            //var queryStr = '?sid=' + '00000000-0000-0000-0000-000000000000' + '&id=' + selectedPerson.PersonId;
            //queryStr += '&xpos=' + xpos + '&ypos=' + ypos + '&zoom=' + zoomReq;
            //this._qryString = queryStr;
            this.bt_refreshData = true;
        }
        else {

            var buttonLink = this.bt_buttonLinks.LinkContainingPoint(x, y);


            if (buttonLink !== null) {

                var parts = buttonLink.action.split(',');

                var clickedPerson = this._GetTreePerson(this.generations, parts[0]);

                var isVis = true;

                if (parts[1] == 'false') {
                    isVis = true;
                }
                else {
                    isVis = false;
                }

                this.SetVisibility(clickedPerson, isVis);


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
    CalcZoomLevel: function (zoomPercentage) {
        var _retVal = 0;

        if (zoomPercentage > 0 && zoomPercentage < 40) {
            _retVal = 1;
        }
        else if (zoomPercentage >= 40 && zoomPercentage < 60) {
            _retVal = 2;
        }
        else if (zoomPercentage >= 60 && zoomPercentage <= 150) {
            _retVal = 3;
        }
        else if (zoomPercentage > 150 && zoomPercentage <= 200) {
            _retVal = 4;
        }
        else if (zoomPercentage > 200 && zoomPercentage <= 250) {
            _retVal = 5;
        }
        else if (zoomPercentage > 250 && zoomPercentage <= 300) {
            _retVal = 6;
        }
        else if (zoomPercentage > 300) {
            _retVal = 7;
        }

        return _retVal;
    },
   
    RelocateToSelectedPerson: function () {


        var personId = this.selectedPersonId;
        var _xpos = this.selectedPersonX;
        var _ypos = this.selectedPersonY;

        this.ComputeLocations();


        var distanceToMove = 0.0;
        var currentPersonLocation = 0;
        var _temp = this._GetTreePerson(this.generations, personId);

        var x = 0.0;
        var y = 0.0;

        if (_temp !== null) {
            if (_xpos === 0.0) {
                currentPersonLocation = (this.generations[0][0].X1 + this.generations[0][0].X2) / 2;
                var requiredLocation = this.bt_screenWidth / 2;
                distanceToMove = requiredLocation - currentPersonLocation;

                this.centrePoint += distanceToMove;
            }
            else {
                currentPersonLocation = _temp.X1;

                if (currentPersonLocation < 0.0) {
                distanceToMove = _xpos - currentPersonLocation;
            }

            if (currentPersonLocation > this.bt_screenWidth) {
                distanceToMove = 0.0 - ((this.bt_screenWidth - _xpos) + (_xpos - this.bt_screenWidth));
            }

            if (currentPersonLocation >= 0 && currentPersonLocation <= this.bt_screenWidth) {   //100 - 750
                distanceToMove = _xpos - currentPersonLocation;
                // 800 - 100
            }

            this.centrePoint += distanceToMove;
        }

        if (_ypos === 0.0) {
            var _currentPersonLocation = (this.generations[0][0].Y1 + this.generations[0][0].Y2) / 2;
            var _requiredLocation = this.layout.boxHeight;
            var _distanceToMove = _requiredLocation - _currentPersonLocation;
            this.centreVerticalPoint -= _distanceToMove;
        }
        else {

            if (_temp === null) {
                currentPersonLocation = 0.0;
            }
            else {
                currentPersonLocation = _temp.Y1;

                if (currentPersonLocation > this.bt_screenHeight) {
                    distanceToMove = currentPersonLocation - _ypos;
                }
                if (currentPersonLocation >= 0 && currentPersonLocation <= this.bt_screenHeight) {
                    distanceToMove = currentPersonLocation - _ypos;
                }
                if (currentPersonLocation < 0) {
                    distanceToMove = _ypos - currentPersonLocation;
                }
            }

            this.centreVerticalPoint -= distanceToMove;
        }

        this.ComputeLocations();

        if (_ypos === 0) {
            y = 0 - this.bt_screenHeight / 2;
        }
        else {
            y = (_temp.Y2 + _temp.Y1) / 2;
        }

        if (_xpos === 0) {
            x = this.bt_screenWidth / 2;
        }
        else {
            x = (_temp.X2 + _temp.X1) / 2;
        }

        this.SetMouse(x, y);
        this.SetZoomStart();
        //this.SetCentrePoint(1000000, 1000000);


        this.DrawTree();
        }
    },

    Debug: function () {
    console.log('debugging');

    var idx = 0;

    while (this.generations.length > idx) {



    var cid = 0;
    var cife = 0;
    var cipl = 0;
    var cifs = 0;
    var cihl = 0;

    var personidx = 0;

    while (this.generations[idx].length > personidx) {

    if (this.generations[idx][personidx].RecordLink.Name == "Jane Thackray") {
    console.log("Jane Thackray X1 Y2");
    console.log(this.generations[idx][personidx].X1);
    console.log(this.generations[idx][personidx].Y1);

    }

    if (this.generations[idx][personidx].RecordLink.Name == "William Talbot") {
    console.log("William Talbot X1 Y2");
    console.log(this.generations[idx][personidx].X1);
    console.log(this.generations[idx][personidx].Y1);
    }

    personidx++;
    }

    idx++;
    }

    },


    DrawTree :function () {
   //     requestAnimationFrame($.proxy(this.DrawTreeInner, this) );
    },

    IsValid :function () {
        return this.generations.length>0;
    },

    DrawTreeInner :function () {

        if(this.generations.length === 0){
            console.log('Anc Tree not supplied with generations data- cant draw');
            return;
        }

        //    var canvas = document.getElementById("myCanvas");
        //    var context = canvas.getContext("2d");
        //    canvas.width = window.innerWidth;
        //    canvas.height = window.innerHeight;

            this.treeUI.ClearScreen();

            try
            {
                this.ComputeLocations();
            }
            catch(err)
            {
                console.log('error computing locations');
                console.log(err);
            }

            try
            {

                this.bt_links = [];

                this.generations.forEach((generation, genidx) => {
                    generation.forEach(person => {
                        const personLink = this.treeUI.DrawPerson(person, this.bt_screenWidth, this.bt_screenHeight, this.sourceId, this.zoomPercentage);
                
                        if (personLink !== null) {
                            this.bt_links.push(personLink);
                        }
                    });
                });

            }
            catch (err) {
                console.log('Error Drawing Persons');
                console.log(err);
            }

            try
            {
                this.edges.forEach(edgeGroup => {
                    edgeGroup.forEach(edge => {
                        this.treeUI.DrawLine(this.bt_screenWidth, this.bt_screenHeight, edge);
                    });
                });
            }
            catch (err) {
                console.log('Error Drawing Lines');
                console.log(err);
            }





       },



    ComputeLocations :function () {
       // dump(this.generations);
       // var genidx = 0;
        this.drawingX2 = 0.0;
        this.drawingX1 = 0.0;
       
        var _y = this.centreVerticalPoint;
        var percentageLess = 0.0;

        this.layout.adjustedDistances = [];
        this.layout.adjustedBoxWidths = [];
        this.layout.adjustedBoxHeights = [];


        this.generations[0][0].X1 = this.centrePoint;
        this.generations[0][0].X2 = this.centrePoint + this.layout.boxWidth;
        this.generations[0][0].Y1 = _y;
        this.generations[0][0].Y2 = _y + this.layout.boxHeight;


        this.edges = this.generations.map(g => g.map(() => []));

        let genidx = 0;
        while (genidx < this.generations.length) {


            var personIdx = 0;

            percentageLess += 2;

           // console.log('GENERATION: ' + genidx);

            while (personIdx < this.generations[genidx].length) {

                let currentNode = this.generations[genidx][personIdx];

                this.layout.changeGenScale(this.generations,currentNode,percentageLess);
                
                let xEdge = this.GetNewX(this.generations,currentNode,this.layout.adjustedDistances[genidx],
                    this.layout.adjustedBoxWidths[genidx]); // fills newxs
                
                const spacing = this.ancGraph.LastGenerationSpacing(currentNode);

                let overlap = spacing.previousX2 > xEdge.x1 ? 
                              spacing.previousX2 - xEdge.x1 + this.layout.adjustedDistances[genidx] : 0.0;
                         
                if (overlap > 0 || spacing.spacing> 0) {
                    const requiredSpace = (spacing.nodeCount * this.layout.adjustedBoxWidths[genidx - 1]) +
                                            ((spacing.nodeCount + 1) * (this.layout.adjustedDistances[genidx - 1] + 5));
                
                    // Increase the overlap if we don't have enough space
                    if (requiredSpace > (spacing.spacing + overlap) || overlap === 0) {
                        overlap += (requiredSpace - (spacing.spacing + overlap));
                    }

                }

                if (overlap > 0) {                                      
                    this.ancGraph.forEachPrevNodeDescendant(currentNode,(n) => {                                              
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

                currentNode.X1 = xEdge.x1; // _x - adjustedBoxWidth;
                currentNode.X2 = xEdge.x2; // _x + adjustedBoxWidth;
                currentNode.Y1 = _y;
                currentNode.Y2 = _y + this.layout.adjustedBoxHeights[genidx];
                
                this.ancGraph.SetZoomLevel(currentNode);

                personIdx++;
            }

            _y -= this.layout.distanceBetweenGens;

            genidx++;

        }
   
        this.layout.setBoxWidth(this.generations[0][0]);

        let result = this.ancGraph.createXAxisFromParents(this.generations[0][0], this.layout.boxWidth);

        this.generations[0][0].X1 = result.x1;
        this.generations[0][0].X2 = result.x2;

        this.generations[0][0].IsDisplayed =true;

        //make new 'bounding box' for the tree
        this.drawingX1 = Math.min(...this.generations.map(generation => generation[0].X1));
        this.drawingX2 = Math.max(...this.generations.map(generation => generation[generation.length - 1].X2));
        this.drawingY1 = this.generations[this.generations.length - 1][0].Y2;
        this.drawingY2 = this.generations[0][0].Y1;

        this.drawingHeight = this.generations[0][0].Y1 - this.generations[this.generations.length - 1][0].Y2;

        this.drawingCentre = (this.drawingX2 - this.drawingX1) / 2;
        this.drawingWidth = this.drawingX2 - this.drawingX1;




        this.CreateEdges();

        //stackSize++;
           //  debugger;
    },       //end compute locations

    //run when generation is loaded
    //run when visibility changed
    UpdateGenerationState: function () {


    },

    CreateEdges : function () {

        this.generations.forEach((generation, genidx) => {
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
               
                const _family0 = [
                    [middleXChild, middleTopChild],
                    [middleXChild, middleGeneration]
                ];
        
                node.Parents.forEach(parent => {
                    const middleParent = (parent.X1 + parent.X2) / 2;
                    const parentPosition = (this.drawingHeight > 200 || this.generations.length === 2) ? bottomParent : middleGeneration - 4;
        
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

 
