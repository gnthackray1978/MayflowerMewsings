
import {getDescendants,getParentGeneration, CreateChildPositionFromParent} from '../drawinglib/graphDiagFuncs.jsx';


export function Layout(){

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

    changeGenScale:function (nodes, genidx, personIdx, percentageLess ) {

                
            var adjustedBoxHeight = this.boxHeight;
            var adjustedDistanceApart = 0.0;
            var adjustedBoxWidth = this.boxWidth;

            var childIdx = nodes[genidx][personIdx].ChildIdx;

            if (genidx > 0) {
                adjustedBoxHeight = this.boxHeight - ((this.boxHeight / 100) * percentageLess);
                var childBoxWidth = (nodes[genidx - 1][childIdx].X2 - nodes[genidx - 1][childIdx].X1);
                adjustedDistanceApart = this.distanceBetweenBoxs - ((this.distanceBetweenBoxs / 100) * percentageLess);
                adjustedBoxWidth = childBoxWidth - ((childBoxWidth / 100) * percentageLess);               
            } 



            if (this.adjustedDistances.length > genidx) {
                this.adjustedDistances[genidx] = adjustedDistanceApart;
            }
            else {
                this.adjustedDistances[this.adjustedDistances.length] = adjustedDistanceApart;
            }

            if (this.adjustedBoxWidths.length > genidx) {
                this.adjustedBoxWidths[genidx] = adjustedBoxWidth;
            }
            else {
                this.adjustedBoxWidths.push(adjustedBoxWidth);
            }


            if (this.adjustedBoxHeights.length > genidx) {
                this.adjustedBoxHeights[genidx] = adjustedBoxHeight;
            }
            else {
                this.adjustedBoxHeights.push(adjustedBoxHeight);
            }
           
        

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
    this.familySpanLines = [];
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
}


AncTree.prototype = {

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
    GetChildDisplayStatus: function (person) {

        var isDisplayed = true;

        if (this.generations.length > person.GenerationIdx) {
            var _genidx = 0;
            while (_genidx < this.generations[person.GenerationIdx].length) {

                if (this.generations[person.GenerationIdx][_genidx].PersonId == person.ChildLst[0]) {
                    var _person = this.generations[person.GenerationIdx][_genidx];
                    isDisplayed = _person.IsDisplayed;
                    break;
                }

                _genidx++;
            }
        }

        return isDisplayed;
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
    CalcAreaLevel: function (area) {
        var _returnVal = 0;

        if (area > 0 && area < 1000) {
            _returnVal = 1;
        }
        else if (area >= 1000 && area < 2500) {
            _returnVal = 2;
        }
        else if (area >= 2500 && area <= 5000) {
            _returnVal = 3;
        }
        else if (area > 5000 && area <= 10000) {
            _returnVal = 4;
        }
        else if (area > 10000 && area <= 15000) {
            _returnVal = 5;
        }
        else if (area > 15000 && area <= 20000) {
            _returnVal = 6;
        }
        else if (area > 20000) {
            _returnVal = 7;
        }

        return _returnVal;
    },
    CalcTPZoom: function (genidx, personIdx) {
        var _tp = this.generations[genidx][personIdx];

        var _boxarea = (_tp.X2 - _tp.X1) * (_tp.Y2 - _tp.Y1);

        _tp.zoom = this.CalcAreaLevel(_boxarea);
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


           var _genidx = 0;
           var _personIdx = 0;


          // var treeUI = new TreeUI(this.bt_screenWidth, this.bt_screenHeight, this.layout.boxWidth, this.layout.boxHeight,1,null);
     //      this.treeUI.UpdateUI(this.bt_screenWidth, this.bt_screenHeight, this.layout.boxWidth, this.layout.boxHeight);

            try
            {


               this.bt_links = [];

               while (_genidx < this.generations.length) {
                   _personIdx = 0;

                   while (_personIdx < this.generations[_genidx].length) {

                       var _person = this.generations[_genidx][_personIdx];

                       var personLink = this.treeUI.DrawPerson(_person,
                            this.bt_screenWidth, this.bt_screenHeight, this.sourceId, this.zoomPercentage);

                       if(personLink !== null)
                        this.bt_links.push(personLink);

                       _personIdx++;
                   }
                   _genidx++;
               }

            }
            catch (err) {
                console.log('Error Drawing Persons');
                console.log(err);
            }




            try
            {
               var _fslOuter = 0;
               var _fslInner = 0;
               //   var _pointIdx = 0;


               while (_fslOuter < this.familySpanLines.length) {
                   _fslInner = 0;
                   while (_fslInner < this.familySpanLines[_fslOuter].length) {
                       this.treeUI.DrawLine(this.bt_screenWidth, this.bt_screenHeight, this.familySpanLines[_fslOuter][_fslInner]);
                       _fslInner++;
                   } // end familySpanLines[_fslOuter].length

                   _fslOuter++;
               } // end this.familySpanLines.length

            }
            catch (err) {
                console.log('Error Drawing Lines');
                console.log(err);
            }





       },

    ComputeLocations :function () {
       // dump(this.generations);
        var genidx = 0;
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


        var idx = 0;
        var pidx = 0;

        this.familySpanLines = [];

        while (idx < this.generations.length) {
            this.familySpanLines.push([]);
            pidx = 0;
            while (pidx < this.generations[idx].length) {
                this.familySpanLines[idx].push([]);

                pidx++;
            }

            idx++;
        }




        genidx = 0;
        while (genidx < this.generations.length) {


            var personIdx = 0;

            percentageLess += 2;

           // console.log('GENERATION: ' + genidx);

            while (personIdx < this.generations[genidx].length) {

                this.layout.changeGenScale(this.generations,genidx,personIdx,percentageLess);

                let r = this.GetNewX(this.generations,genidx,
                    personIdx,this.layout.adjustedDistances[genidx],
                    this.layout.adjustedBoxWidths[genidx]); // fills newxs

                var overlap = 0.0;
                var requiredSpace = 0.0;
                if (personIdx > 0) {

                    if (this.generations[genidx][personIdx - 1].X2 > r.x1) {
                        overlap = this.generations[genidx][personIdx - 1].X2 - r.x1;
                        overlap += this.layout.adjustedDistances[genidx];
                    }

                    var newChildidx = this.generations[genidx][personIdx].ChildIdx;
                    var oldChildidx = this.generations[genidx][personIdx - 1].ChildIdx;
                    var countPersonSpaces = newChildidx - oldChildidx;

                    if (countPersonSpaces > 1) {

                        countPersonSpaces--;
                        //needed space
                        requiredSpace = (countPersonSpaces * this.layout.adjustedBoxWidths[genidx - 1]) + ((countPersonSpaces + 1) * (this.layout.adjustedDistances[genidx - 1] + 5));

                        var spaceSoFarCreated = (this.generations[genidx - 1][newChildidx].X1 - this.generations[genidx - 1][oldChildidx].X2) + overlap;

                        // we dont have enough space!
                        if (requiredSpace > spaceSoFarCreated) {
                            // increase the overlap so enough space if provided
                            overlap += (requiredSpace - spaceSoFarCreated);
                        }
                        else if (overlap === 0) {
                            overlap = (requiredSpace - spaceSoFarCreated);
                        }

                    }

                }




                if (overlap > 0) {

                    //console.log('overlaped: ' + this.generations[genidx][personIdx].RecordLink.Name);

                    let moveList =  getDescendants(this.generations, personIdx - 1, genidx);

                     
                    var listIdx = 0;
                     
                    while (listIdx < moveList.length) {
                        var _treePerson = moveList[listIdx];
                        var tpPersonIdx = _treePerson.Index;

                        while (tpPersonIdx >= 0) {

                            //      Debug.WriteLine("moving: " + this.generations[_treePerson.generation][tpPersonIdx].name);
                            //console.log("moving: " + _treePerson.Name + " " + _treePerson.X1 + " " + _treePerson.X2);

                            var _movePerson = this.generations[_treePerson.GenerationIdx][tpPersonIdx];

                            var _prevPerson = null;
                            var _nextPerson = null;


                            if (tpPersonIdx > 0)
                                _prevPerson = this.generations[_treePerson.GenerationIdx][tpPersonIdx - 1];

                            if ((tpPersonIdx + 1) < this.generations[_treePerson.GenerationIdx].length)
                                _nextPerson = this.generations[_treePerson.GenerationIdx][tpPersonIdx + 1];

                            
                            let xRange = {
                                x1 : 0.0,
                                x2 : 0.0
                            };


                            if ((_movePerson.FatherIdx == -1 && _movePerson.MotherIdx == -1) || (_movePerson.GenerationIdx == genidx)) {
                                if (_movePerson.GenerationIdx == genidx) {
                                    xRange.x1 = _movePerson.X1 - overlap;
                                    xRange.x2 = _movePerson.X2 - overlap;
                                }
                                else {

                                    var parentlessPersonStartX = _movePerson.X1 - overlap; // GetX1ForParentlessPerson(_movePerson.generation, _movePerson.index);

                                    if (parentlessPersonStartX === 0.0) {
                                        parentlessPersonStartX = 15;
                                        xRange.x2 = _nextPerson.X1 - parentlessPersonStartX;
                                        xRange.x1 = xRange.x2 - this.layout.adjustedBoxWidths[_nextPerson.GenerationIdx];
                                    }
                                    else {
                                        xRange.x1 = parentlessPersonStartX;
                                        xRange.x2 = xRange.x1 + this.layout.adjustedBoxWidths[_nextPerson.GenerationIdx];
                                    }
                                }

                            }
                            else {
                                this.layout.setBoxWidth(_movePerson);
                                let parentGeneration = getParentGeneration(this.generations,_movePerson);
                                xRange = CreateChildPositionFromParent(parentGeneration, _movePerson, this.layout.boxWidth); 
                            }

              

                            _movePerson.X1 = xRange.x1; // -adjustedDistanceApart;
                            _movePerson.X2 = xRange.x2; // -adjustedDistanceApart;

                            tpPersonIdx--;
                        } //end while (tpPersonIdx >= 0)

                        listIdx++;
                    } 




                }

           

                
                this.generations[genidx][personIdx].X1 = r.x1; // _x - adjustedBoxWidth;
                this.generations[genidx][personIdx].X2 = r.x2; // _x + adjustedBoxWidth;


              


                this.generations[genidx][personIdx].Y1 = _y;
                this.generations[genidx][personIdx].Y2 = _y + this.layout.adjustedBoxHeights[genidx];


                this.CalcTPZoom(genidx, personIdx);

                personIdx++;
            }

            _y -= this.layout.distanceBetweenGens;

            genidx++;

        }


   
        this.layout.setBoxWidth(this.generations[0][0]);


        let parentGeneration = getParentGeneration(this.generations,this.generations[0][0]);

        let result = CreateChildPositionFromParent(parentGeneration, this.generations[0][0], this.layout.boxWidth);

        this.generations[0][0].X1 = result.x1;
        this.generations[0][0].X2 = result.x2;

        this.generations[0][0].IsDisplayed =true;

        genidx = 0;

        this.drawingX1 = this.generations[0][0].X1;
        this.drawingX2 = this.generations[0][0].X2;

        while (genidx < this.generations.length) {
            if (this.drawingX1 > this.generations[genidx][0].X1)
                this.drawingX1 = this.generations[genidx][0].X1;

            if (this.drawingX2 < this.generations[genidx][this.generations[genidx].length - 1].X2)
                this.drawingX2 = this.generations[genidx][this.generations[genidx].length - 1].X2;

            genidx++;
        }

        // top of the screen
        this.drawingY1 = this.generations[this.generations.length - 1][0].Y2;

        //bottom of the screen
        this.drawingY2 = this.generations[0][0].Y1;

        this.drawingHeight = this.generations[0][0].Y1 - this.generations[this.generations.length - 1][0].Y2;

        this.drawingCentre = (this.drawingX2 - this.drawingX1) / 2;
        this.drawingWidth = this.drawingX2 - this.drawingX1;




        this.CreateConnectionLines();


    },       //end compute locations

    //run when generation is loaded
    //run when visibility changed
    UpdateGenerationState: function () {


    },

    CreateConnectionLines : function () {

        // this.FamilySpanLines = new List<List<List<TreePoint>>>();

        var middleGeneration = 0.0;
        var middleXChild = 0.0;
        var middleParent = 0.0;
        var middleTopChild = 0.0;
        var bottomParent = 0.0;

        var parentHeight = 0.0;
        var distanceBetweenGens = 0.0;


        var genidx = 0;
        while (genidx < this.generations.length) {

            var personIdx = 0;

            if (genidx + 1 >= this.familySpanLines.length) {
                genidx++;
                continue;
            }


            while (personIdx < this.generations[genidx].length) {
                var _family0 = this.familySpanLines[genidx][personIdx];

                _family0 = [];
                           
                if (this.generations.length <= (genidx + 1) 
                    || this.generations[genidx][personIdx].Parents.length == 0) {
                        this.familySpanLines[genidx][personIdx] = _family0;
                        personIdx++;
                    continue;
                }


                // top middle of child
                middleTopChild = this.generations[genidx][personIdx].Y1;// + 10

                parentHeight = (this.generations[genidx + 1][0].Y2 - this.generations[genidx + 1][0].Y1);
                bottomParent = this.generations[genidx + 1][0].Y1 + parentHeight;// + 10
                distanceBetweenGens = (this.generations[genidx][personIdx].Y1 - this.generations[genidx + 1][0].Y2);


                middleXChild = (this.generations[genidx][personIdx].X1 + this.generations[genidx][personIdx].X2) / 2;
                middleGeneration = this.generations[genidx][personIdx].Y1 - (distanceBetweenGens / 2) + 10;
                // move to top and middle of child
                
                _family0[_family0.length] = new Array(middleXChild, middleTopChild);

                // move to middle of generations about child
                
                _family0[_family0.length] = new Array(middleXChild, middleGeneration);

                for(var parent of this.generations[genidx][personIdx].Parents){
                    middleParent = (parent.X1 + parent.X2) / 2;
                
                    _family0[_family0.length] = new Array(middleParent, middleGeneration);

                    if (this.drawingHeight > 200 || this.generations.length == 2) {
                        // move to bottom of parent
                
                        _family0[_family0.length] = new Array(middleParent, bottomParent);
                    }
                    else {
                
                        _family0[_family0.length] = new Array(middleParent, middleGeneration - 4);
                    }
                    // move to middle generation under parent
                
                    _family0[_family0.length] = new Array(middleParent, middleGeneration);
                    // move to middle of child
                
                    _family0[_family0.length] = new Array(middleXChild, middleGeneration);
                    // move to top and middle of child
                
                    //_family0[_family0.length] = new Array(middleXChild, middleTopChild-10);
                }

                this.familySpanLines[genidx][personIdx] = _family0;

                personIdx++;
            }

            genidx++;
        }



    }, //this.CreateConnectionLines

   

    


    GetNewX:function (nodes, genidx, personIdx,distanceApart, boxWidth) {

            var result = {
                x1 : 0.0,
                x2 : 0.0
            };
      
            var childIdx = nodes[genidx][personIdx].ChildIdx;

            if (genidx > 0) {

                var childBoxWidth = (nodes[genidx - 1][childIdx].X2 - nodes[genidx - 1][childIdx].X1);
                var childCentrePoint = nodes[genidx - 1][childIdx].X1 + (childBoxWidth / 2);
         
                var isFirstParent = false;
                var isLastParent = false;
                var isSingleParent = false;
                
              
                //trying to determine which of the parents we are refering to
                // because if its the first then x value will be lower than it would be for 2nd
                if (nodes[genidx].length > personIdx + 1) {
                    if (nodes[genidx][personIdx + 1].ChildIdx == nodes[genidx][personIdx].ChildIdx) {
                        isFirstParent = true;
                    }
                }

                if (personIdx > 0) {
                    if (nodes[genidx][personIdx].ChildIdx == nodes[genidx][personIdx - 1].ChildIdx) {
                        isLastParent = true;
                    }
                }

                if (!isFirstParent && !isLastParent) {
                    isSingleParent = true;
                }

                if (isFirstParent) {
                    result.x1 = childCentrePoint - (distanceApart / 2) - boxWidth;
                }

                if (isLastParent) {
                    result.x1 = childCentrePoint + (distanceApart / 2);                                       
                }

                if (isSingleParent) {
                    result.x1 = childCentrePoint - (boxWidth / 2);
                }

            }
            else {

                result.x1 = this.centrePoint;
            }

            result.x2 = result.x1 + boxWidth;
 
            return result;
    }

    

};

 
