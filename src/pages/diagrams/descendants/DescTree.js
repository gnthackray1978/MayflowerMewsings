import {MiddleParents, createFamilyCountArray, GetPrev, GetFirst, GetParentXs, CreateArray} from '../drawinglib/graphDiagFuncs.jsx';
import { DescendantGraph } from './DescendantGraph.js'; // new import

export function DescTree() {
    //console.log('tree created');

    this.descGraph = new DescendantGraph();

    this.X1 = 0.0;
    this.X2 = 0.0;
    this.Y1 = 0.0;
    this.Y2 = 0.0;

    this._qryString = '';
    this.bt_refreshData =false;
    this.bt_screenHeight = 0.0;
    this.bt_screenWidth = 0.0;

    this.bt_buttonLinks = [];
    this.bt_links = [];
    //this.generations = [];
    this.familyEdges = [];
    this.marriageEdges = [];

    this.centrePoint = 750.0;
    this.centreVerticalPoint = 0.0;
    this.zoomLevel = 0.0;

    this.original_distanceBetweenBoxs = 0.0;
    this.original_distanceBetweenGens = 0.0;
    this.original_boxWidth = 0.0;
    this.original_boxHeight = 0.0;
    this.original_distancesbetfam = 0.0;
    this.original_lowerStalkHeight = 0.0;

    this.original_middleSpan = 40.0;
    this.original_topSpan = 20.0;

    this.distancesbetfam = 0.0;
    this.lowerSpan = 0.0;
    this.middleSpan = 0.0;
    this.topSpan = 0.0;
    this.distanceBetweenBoxs = 0.0;
    this.distanceBetweenGens = 0.0;
    
    this.halfBox = 0.0;
    this.halfBoxHeight = 0.0;
    this.boxWidth = 0.0;
    this.boxHeight = 0.0;

    //this._graphBoundary = new GraphBoundary();

    this.mouse = {
        x: 0,
        y: 0
    };


    this.mouseXPercLocat = 0.0;
    this.mouseYPercLocat = 0.0;
    this.zoomPercentage = 0.0;

    this.zoomAmount = 8; //int


    this.sourceId = null;


    this.selectedPersonId = '';
    this.selectedPersonX = 0;
    this.selectedPersonY = 0;
    this.treeUI;
    this.startx1 = 0.0;
    //this.endx2 = 0.0;

    // this.percX1 = 0.0;
    // this.percY1 = 0.0;
    this.movementx =0;
    this.movementy =0;

 
}


DescTree.prototype = {
    GetPercDistances: function (mousePoint) {
        let _distanceFromX1 = 0.0;
        let _distanceFromY1 = 0.0;
        let _onePercentDistance = 0.0;

        let percX1 = 0.0;
        let percY1 = 0.0;


        let drawingWidth = this.X2 - this.X1;
        let drawingHeight = this.Y2 - this.Y1;

        if (drawingWidth !== 0 && drawingHeight !== 0) {
            if (this.X1 > 0) {
                _distanceFromX1 = mousePoint.x - this.X1; //;
            }
            else {
                 _distanceFromX1 = Math.abs(this.X1) + mousePoint.x;
            }

            _onePercentDistance = drawingWidth / 100;
            percX1 = _distanceFromX1 / _onePercentDistance;

            if (this.Y1 > 0) {
                _distanceFromY1 = mousePoint.y - this.Y1; // ;
            }
            else {
                _distanceFromY1 = Math.abs(this.Y1) + mousePoint.y;
            }

            _onePercentDistance = drawingHeight / 100;
            percY1 = _distanceFromY1 / _onePercentDistance;

        }

        return {
            percX1,
            percY1
        };
    },

    SetMovementX: function (x) {
        this.movementx = x;
    },
    SetMovementY: function (y) {    
        this.movementy = y;
    },

    CreateWithDefaultValues: function (personId, data) {
         
        if(data.length === 0){
            //console.log('no data to set up ancestor tree');
            return;
          }

        var _zoomLevel = 100;
        this.selectedPersonId = personId;
        this.selectedPersonX = 0;
        this.selectedPersonY = 0;
        this.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0, 
                        70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

        this.descGraph = new DescendantGraph(data);

        this.descGraph.nodes = data;
        this.UpdateGenerationState();
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
            // this.centrePointXOffset = 0.0;
            // this.centrePointYOffset = 0.0;
            this.mouse ={x:0,y:0};
            this.mouseXPercLocat = 0.0;
            this.mouseYPercLocat = 0.0;

            this.bt_screenHeight = screen_height;
            this.bt_screenWidth = screen_width;

            this.zoomPercentage = zoomPerc;

            this.original_distanceBetweenBoxs = dist_bet_box;
            this.original_distanceBetweenGens = dist_bet_gen;
            this.original_boxWidth = box_wid;
            this.original_boxHeight = box_hig;
            this.original_distancesbetfam = dist_bet_fam;
            this.original_lowerStalkHeight = low_stalk_hi;
            this.original_middleSpan = mid_span;
            this.original_topSpan = top_span;


            this.distanceBetweenBoxs = this.original_distanceBetweenBoxs;
            this.distanceBetweenGens = this.original_distanceBetweenGens;
            this.boxWidth = this.original_boxWidth;
            this.boxHeight = this.original_boxHeight;
            this.distancesbetfam = this.original_distancesbetfam;
            this.halfBox = this.boxWidth / 2;
            this.halfBoxHeight = this.boxHeight / 2;

            this.lowerSpan = this.original_lowerStalkHeight;

            this.middleSpan = this.original_middleSpan;

            this.topSpan = this.original_topSpan;




            },

    SetZoom: function (percentage) {

        // var workingtp = this.original_lowerStalkHeight / 100;

        // this.lowerSpan = workingtp * this.zoomPercentage; // (int)original_lowerStalkHeight;

        // workingtp = this.original_middleSpan / 100;

        // this.middleSpan = workingtp * this.zoomPercentage; //(int)original_middleSpan;

        // workingtp = this.original_topSpan / 100;

        // this.topSpan = workingtp * this.zoomPercentage; //(int)original_topSpan;

        var x = this.bt_screenWidth / 2;
        var y = this.bt_screenHeight / 2;

        this.SetMouse(x, y);

 

        let percentages = this.GetPercDistances(this.mouse);

        this.mouseXPercLocat = percentages.percX1;
        this.mouseYPercLocat = percentages.percY1;
        

        if (percentage !== 0.0) {
            var _workingtp = 0.0; 
            //console.log('centre vertical point1: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);
            //zoom drawing components
            this.zoomPercentage += percentage;
            this.zoomLevel += percentage;
            _workingtp = this.original_distanceBetweenBoxs / 100;
            this.distanceBetweenBoxs = _workingtp * this.zoomPercentage;
            _workingtp = this.original_boxWidth / 100;
            this.boxWidth = _workingtp * this.zoomPercentage;
            this.halfBox = this.boxWidth / 2;
            _workingtp = this.original_distancesbetfam / 100;
            _workingtp = this.original_distanceBetweenGens / 100;
            this.distanceBetweenGens = _workingtp * this.zoomPercentage;
            _workingtp = this.original_boxHeight / 100;
            this.boxHeight = _workingtp * this.zoomPercentage;

            this.halfBoxHeight = this.boxHeight / 2;

            this.RefreshLayout();

            let percentages = this.GetPercDistances(this.mouse);
 
             let drawingHeight = this.Y2 - this.Y1;
             let drawingWidth = this.X2 - this.X1;


            this.centreVerticalPoint += (drawingHeight / 100) * (percentages.percY1 - this.mouseYPercLocat);

            this.centrePoint += (drawingWidth / 100) * (percentages.percX1 - this.mouseXPercLocat);

            //console.log('centre vertical point2: ' + this.centreVerticalPoint + ' centre point: ' + this.centrePoint);

            this.RefreshLayout();
        } //end percentage ==0.0)



       // this.Draw();

    },
     
    
    SetMouse: function (x, y, mousestate) {
        //    //console.log('mouse set: ' + x + ' , ' + y);
       

        this.mouse = {
            x:  x,
            y: y
        };



        if (mousestate == undefined) mousestate = false;

        var mouseLink = this.bt_links.LinkContainingPoint(this.mouse.x, this.mouse.y);

        var buttonLink = this.bt_buttonLinks.LinkContainingPoint(this.mouse.x, this.mouse.y);


        if (mouseLink !== null || buttonLink !== null) {
            document.body.style.cursor = 'pointer';
            //   //console.log(mouseLink.action);
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

        if (this.descGraph.nodes.length > person.GenerationIdx) {
            var _genidx = 0;
            while (_genidx < this.descGraph.nodes[person.GenerationIdx].length) {

                if (this.descGraph.nodes[person.GenerationIdx][_genidx].PersonId == person.ChildLst[0]) {
                    var _person = this.descGraph.nodes[person.GenerationIdx][_genidx];
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

            var selectedPerson = this.descGraph.getTreePerson(mouseLink.action);
    
            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;
    
            this.bt_refreshData = true;
        }
        else {

            var buttonLink = this.bt_buttonLinks.LinkContainingPoint(x, y); 

            if (buttonLink !== null) {

                var parts = buttonLink.action.split(',');

                var clickedPerson = this.descGraph.getTreePerson(parts[0]);

                var isVis = true;

                if (parts[1] == 'false') {
                isVis = true;
                }
                else {
                isVis = false;
                }

                this.descGraph.SetVisibility(clickedPerson, isVis); 
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

        //         this.centreVerticalPoint = param_y + this.centrePointYOffset;
        //     }

        // }

    // //console.log('setcentrepoint: '+ this.centrePointXOffset + ' ' + this.centrePoint);
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
        //  SetZoom(zoomAmount - (zoomAmount * 2));
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
            retVal = 7;
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

    SetNodeZoomLevel: function (node) {
     //   var node = this.descGraph.nodes[genidx][personIdx];

        var nodeArea = (node.X2 - node.X1) * (node.Y2 - node.Y1);

        node.zoom = this.CalcAreaLevel(nodeArea);
    },

    RelocateToSelectedPerson: function () {


        var personId = this.selectedPersonId;
        var _xpos = this.selectedPersonX;
        var _ypos = this.selectedPersonY;

        this.RefreshLayout();


        var distanceToMove = 0.0;
        var currentPersonLocation = 0;
        var _temp = this.descGraph.getTreePerson(personId);

        var x = 0.0;
        var y = 0.0;

        if (_temp !== null) {
            if (_xpos === 0.0) {
                currentPersonLocation = (this.descGraph.nodes[0][0].X1 + this.descGraph.nodes[0][0].X2) / 2;
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
                var _currentPersonLocation = (this.descGraph.nodes[0][0].Y1 + this.descGraph.nodes[0][0].Y2) / 2;
                var _requiredLocation = this.boxHeight;
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

            this.RefreshLayout();

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
 
            let percentages = this.GetPercDistances(this.mouse);

            this.mouseXPercLocat = percentages.percX1;
            this.mouseYPercLocat = percentages.percY1;

            //console.log('setzoomstart: ' + this.mouseXPercLocat + ' ' + this.mouseYPercLocat);

            //this.DrawTree();
        }
    },


    Debug: function () {
        //console.log('debugging');

        var idx = 0;

        while (this.descGraph.nodes.length > idx) { 
            var cid = 0;
            var cife = 0;
            var cipl = 0;
            var cifs = 0;
            var cihl = 0;

            var personidx = 0;

            while (this.descGraph.nodes[idx].length > personidx) {

            if (this.descGraph.nodes[idx][personidx].RecordLink.Name == "Jane Thackray") {
                //console.log("Jane Thackray X1 Y2");
                //console.log(this.descGraph.nodes[idx][personidx].X1);
                //console.log(this.descGraph.nodes[idx][personidx].Y1);

            }

            if (this.descGraph.nodes[idx][personidx].RecordLink.Name == "William Talbot") {
                //console.log("William Talbot X1 Y2");
                //console.log(this.descGraph.nodes[idx][personidx].X1);
                //console.log(this.descGraph.nodes[idx][personidx].Y1);
            }

            personidx++;
        }

        idx++;
        }

    },

    IsValid :function () {
        return this.descGraph.nodes.length>0;
    },

  
    Draw: function (ui) {

        ui.ClearScreen();

        this.RefreshLayout();

      
        this.bt_links = [];
        this.bt_buttonLinks = [];
        
        this.descGraph.nodes.forEach((generation, genidx) => {
            generation.forEach(person => {
                const personLink = ui.DrawPerson(person, this.bt_screenWidth, this.bt_screenHeight, this.sourceId, this.zoomPercentage);
                if (personLink) this.bt_links.push(personLink);
        
                if (person.GenerationIdx !== 0) {
                    const buttonLink = ui.DrawButton(this.bt_screenWidth, this.bt_screenHeight, person, this.GetChildDisplayStatus(person));
                    if (buttonLink) this.bt_buttonLinks.push(buttonLink);
                }
            });
        });

        this.familyEdges.forEach(familyEdgeGroup => {
            familyEdgeGroup.forEach(edge => {
                ui.DrawLine(this.bt_screenWidth, this.bt_screenHeight, edge);
            });
        });

        this.marriageEdges.forEach(edge => {
            ui.DrawLine(this.bt_screenWidth, this.bt_screenHeight, edge);
        });
        
    },

    RefreshLayout: function () {

        if (this.descGraph.nodes.length === 0) {
            return;
        }

        // unused
        var _displayGenCount = 0;
        var _genIdx = 0;

        this.marriageEdges = [];

        this.X2 = 0.0;


        _genIdx = 0;

        var lastPersonY2 = 0.0;

        this.familyEdges = this.descGraph.nodes.map(g =>Array.from({ length: g.VisibleFamilyCount }, () => [])); // CreateArray(this.descGraph.nodes);
        
        this.descGraph.nodes.filter(f=>f.GenerationVisible).forEach((genArray, _genIdx) => {
            
            let prevGenArray = _genIdx > 0 ? this.descGraph.nodes[_genIdx - 1] : null;
        
            _displayGenCount++;

            this.startx1 = this.SetScheduleVars(_genIdx, this.startx1);

            this.fillGenXs(genArray);

            var _current_gen_upper_y = (_genIdx * this.boxHeight) + (_genIdx * this.distanceBetweenGens) + this.centreVerticalPoint;

            var _famIdx = 0;

            var familydirectionCounts = [];
                
            if(_genIdx>0)
                familydirectionCounts = createFamilyCountArray(_genIdx, genArray, prevGenArray);

            genArray.filter(f=>f.IsDisplayed).forEach((genPerson, _personIdx) => {

                
                genPerson.X2 = genPerson.X1 + this.boxWidth;

                var _isSpouse = genPerson.IsHtmlLink;

                var _parent_gen_lower_y = 0.0;
                
                //childless marriages
                if (genPerson.SpouseIdxLst.length > 0 && genPerson.ChildCount === 0 && !_isSpouse) {
                    var spouseIdx = genPerson.SpouseIdxLst[0];
                    var tp = genArray[spouseIdx].X1;
                
                    if (Math.abs(spouseIdx - _personIdx) <= 2 && genArray[spouseIdx].ChildCount === 0) {
                        var marriagePoints = [
                            [(genPerson.X1 + this.halfBox), (_current_gen_upper_y + this.boxHeight)],
                            [(genPerson.X1 + this.halfBox), (_current_gen_upper_y + this.boxHeight + this.topSpan)],
                            [(tp + this.halfBox), (_current_gen_upper_y + this.boxHeight + this.topSpan)],
                            [(tp + this.halfBox), (_current_gen_upper_y + this.boxHeight)]
                        ];
                
                        this.marriageEdges.push(marriagePoints);
                    }
                }

                if (_genIdx > 0){
                    if(prevGenArray[genPerson.FatherIdx] == undefined){
                        console.log('error');
                        throw new Error('father undefined: ' + _genIdx + ' ' + genPerson.RecordLink.FirstName + ' ' + genPerson.RecordLink.Surname); 
                    }
                    _parent_gen_lower_y = prevGenArray[genPerson.FatherIdx].Y2;
                }
                var _firstRow = _current_gen_upper_y - this.lowerSpan;
                var _secondRow = _parent_gen_lower_y + this.middleSpan; // changed with increment later on - need to calculate the maximum and minimum this increment will be
                var _thirdRow = _parent_gen_lower_y + this.middleSpan;
                var _fourthRow = _parent_gen_lower_y + this.topSpan;

                if ((!(genPerson.IsFamilyEnd && _isSpouse)) && _genIdx > 0 && !genPerson.DoubleSpouseEnd) {
                    var _family = this.familyEdges[_genIdx][genPerson.FamilyIdx];
                    var point = [(genPerson.X1 + this.halfBox), _firstRow];
                
                   
                    
                    //top of edge that comes out from the top of the node
                    _family.push(point);
                
                    if (!_isSpouse) {                        
                        //bottom of edge that comes out from the top of the node
                        _family.push([(genPerson.X1 + this.halfBox), _current_gen_upper_y]);
                    }
                    
                    //move the 'cursor' to the top the created edge.   
                    _family.push(point);
                    
                }

                if (genPerson.IsParentalLink && _genIdx > 0 ) {



                    let _middleParents = MiddleParents(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);

                    var _nextParentLink = GetFirst(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);
                    var _prevParentLink = GetPrev(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);
                
                    //there should always be a father and mother at this point
                    //as we are never in generation zero
                    if(genPerson.Father == undefined || genPerson.Mother == undefined){
                        //console.log('error - father or mother undefined. All parental links should have a mother or a father. Info: ' + genPerson.Id + ' ' + genPerson.PersonId);
                    }


                    let parentXs = GetParentXs(genPerson.Father?.X1 ?? 0, genPerson.Mother?.X1 ?? 0, this.halfBox);

                    let incSize = (this.distanceBetweenGens - this.middleSpan - this.lowerSpan) / familydirectionCounts[_famIdx];
                    let _increment_temp = (_famIdx === 0 && genPerson.X1 > _middleParents) ? this.distanceBetweenGens - this.middleSpan - this.lowerSpan : 0.0;
                    
                    let _thirdStorkX = genPerson.X1 > _middleParents ? Math.max(genPerson.X1, Math.min(_nextParentLink, genPerson.X2)) : Math.min(genPerson.X1, Math.max(_prevParentLink, genPerson.X1));
                    
                 //   _increment_temp += genPerson.X1 > _middleParents ? -incSize : incSize;
                    _secondRow += _increment_temp;
                    
                    if (Math.abs(_firstRow - _secondRow) <= 1) {
                        _secondRow -= (incSize / 2);
                    }
                    
                    let _secondStorkX = genPerson.X1;
                    
                    if (genPerson.IsFamilyStart) {
                        let _nextFamilyStart = genArray.Count > 1 ? genArray[_personIdx + 1].X1 : genArray[_personIdx].X2;
                        let _sizeToAdd = genPerson.IsFamilyEnd ? this.halfBox : this.boxWidth;
                    
                        if (_middleParents < _nextFamilyStart && _middleParents > genArray[_personIdx].X1) {
                            _secondStorkX = _middleParents;
                            _thirdStorkX = _middleParents;
                        }
                    
                        if (_secondStorkX == _thirdStorkX) {
                            _thirdStorkX += _sizeToAdd;
                        }
                    
                        _secondStorkX += _sizeToAdd;
                    }

                    if(genPerson.RecordLink.Surname == 'Lutton'){
                        //console.log('Lutton');
                        _secondRow+=25;
                    }
                    //firstrow = top of the edge that comes out from the top of the node

                    //endregion
                    const points = [
                        [_secondStorkX, _firstRow],
                        [_secondStorkX, _secondRow],
                        [_thirdStorkX, _secondRow],
                        [_thirdStorkX, _thirdRow],
                        [_middleParents, _thirdRow],
                        [_middleParents, _fourthRow],
                        [parentXs.firstPX, _fourthRow],
                        [parentXs.firstPX, _parent_gen_lower_y],
                        [parentXs.firstPX, _fourthRow],
                        [parentXs.secondPX, _fourthRow],
                        [parentXs.secondPX, _parent_gen_lower_y],
                        [parentXs.secondPX, _fourthRow],
                        [_middleParents, _fourthRow],
                        [_middleParents, _thirdRow],
                        [_thirdStorkX, _thirdRow],
                        [_thirdStorkX, _secondRow],
                        [_secondStorkX, _secondRow],
                        [_secondStorkX, _firstRow]
                        ];
                        
                        points.forEach(point => this.familyEdges[_genIdx][genPerson.FamilyIdx].push(new Array(...point)));

                    _famIdx++;
                } //end (genPerson.IsParentalLink && _genIdx > 0)

                genPerson.Y1 = _current_gen_upper_y;
                genPerson.Y2 = _current_gen_upper_y + this.boxHeight;

                lastPersonY2 = genPerson.Y2;

                this.SetNodeZoomLevel(genPerson);

            }); // end while personidx
         
            
        });

        if (this.descGraph.nodes.length > 0) {
            this.Y1 = this.descGraph.nodes[0][0].Y1;
        }

        if (this.descGraph.nodes[_displayGenCount - 1].length > 0) {
            this.Y2 = lastPersonY2;
        }
   

    },

    //run when generation is loaded
    //run when visibility changed
    UpdateGenerationState: function () {

        ////console.log('DescTree.UpdateGenerationState');

        var familyCount = 0;
        var personCount = 0;
        var isDisplayed = true;
        var genIdx = 0;
        var personIdx = 0;
        var firstVisibleIdx = -1;
        var lastVisibleIdx = -1;
        var firstFamilyIdx = -1;
        var lastFamilyIdx = -1;
        var _familyIdx = -1;

        this.marriageEdges = [];

        this.familyEdges = [];
        // initialize familyspan array
        // set generation variables
        // visible family count
        // visible person count
        // generation displayed
        while (genIdx < this.descGraph.nodes.length) {
            this.familyEdges.push([]);

            personIdx = 0;
            isDisplayed = false;
            familyCount = 0;
            personCount = 0;
            firstVisibleIdx = -1; // there might not be anything visible so we need this to be -1
            lastVisibleIdx = -1;
            firstFamilyIdx = 0; //should always be a family
            lastFamilyIdx = 0;
            _familyIdx = -1;

            while (personIdx < this.descGraph.nodes[genIdx].length) {
                if (this.descGraph.nodes[genIdx][personIdx].IsDisplayed) {

                    if (this.descGraph.nodes[genIdx][personIdx].IsFamilyStart) {
                        _familyIdx++; 
                        ////console.log('added:' + genIdx + ' ' + personIdx);
                        
                        this.familyEdges[genIdx].push([]);
                    }

                    if (this.descGraph.nodes[genIdx][personIdx].IsFamilyStart) {
                        familyCount++;
                    }

                    personCount++;

                    isDisplayed = true;

                    lastVisibleIdx = personIdx;

                    if (this.descGraph.nodes[genIdx][personIdx].ChildLst.length > 0) {

                        lastFamilyIdx = personIdx;

                        if (firstFamilyIdx == -1) firstFamilyIdx = personIdx;
                    }


                    if (firstVisibleIdx == -1) firstVisibleIdx = personIdx;


                    let _isDoubleSpouseEnd = false;
          
                    if (this.descGraph.nodes[genIdx][personIdx].IsHtmlLink) {
          
                        if ((this.descGraph.nodes[genIdx][personIdx].length > personIdx + 1) 
                              && this.descGraph.nodes[genIdx][personIdx + 1].IsHtmlLink) {
                            _isDoubleSpouseEnd = true; 
                        }
          
                    }
                    
                    this.descGraph.nodes[genIdx][personIdx].DoubleSpouseEnd = _isDoubleSpouseEnd;
                    this.descGraph.nodes[genIdx][personIdx].FamilyIdx = _familyIdx;
                }
                personIdx++;
            }

            this.descGraph.nodes[genIdx].VisibleFamilyCount = familyCount;
            this.descGraph.nodes[genIdx].VisiblePersonCount = personCount;
            this.descGraph.nodes[genIdx].GenerationVisible = isDisplayed;
            this.descGraph.nodes[genIdx].FirstVisibleIdx = firstVisibleIdx;
            this.descGraph.nodes[genIdx].LastVisibleIdx = lastVisibleIdx;
            this.descGraph.nodes[genIdx].FirstFamilyIdx = firstFamilyIdx;
            this.descGraph.nodes[genIdx].LastFamilyIdx = lastFamilyIdx;


            genIdx++;
        }



    },


    SetScheduleVars: function (genidx, currentRowX1) {
      
        var prevGenX1 = 0.0;
        var prevGenX2 = 0.0;



        if (genidx === 0) {
            this.X1 = currentRowX1;
            currentRowX1 = this.centrePoint - (((this.descGraph.nodes[genidx].length * this.boxWidth) + ((this.descGraph.nodes[genidx].length - 1) * this.distanceBetweenBoxs)) / 2);
        }
        else {
            prevGenX1 = this.descGraph.nodes[genidx - 1][this.descGraph.nodes[genidx - 1].FirstFamilyIdx].X1;
            prevGenX2 = this.descGraph.nodes[genidx - 1][this.descGraph.nodes[genidx - 1].LastFamilyIdx].X1 + this.boxWidth;

            currentRowX1 = prevGenX1 + (this.boxWidth / 2);
            var endx2 = prevGenX2 - (this.boxWidth / 2);

            var _prevGenLen = endx2 - currentRowX1;

            var _curGenLen = (this.descGraph.nodes[genidx].VisiblePersonCount * (this.boxWidth + this.distanceBetweenBoxs)) - (this.distanceBetweenBoxs * this.descGraph.nodes[genidx].VisibleFamilyCount);
            if (_prevGenLen > _curGenLen) {
                this.distancesbetfam = (_prevGenLen - _curGenLen) / this.descGraph.nodes[genidx].VisibleFamilyCount;
            }
            else {
                this.distancesbetfam = (this.original_distancesbetfam / 100) * this.zoomPercentage;
            }
            //add in the distances between the families
            _curGenLen = _curGenLen + (this.distancesbetfam * (this.descGraph.nodes[genidx].VisibleFamilyCount - 1));
            // middle of the families of the previous generation
            var _desiredMidPoint = ((endx2 - currentRowX1) / 2) + currentRowX1;
            // set new start point by subtracting half the total space required for the generation
            currentRowX1 = _desiredMidPoint - (_curGenLen / 2);

        }


      //  //console.log('SetScheduleVars:' + (currentRowX1-tp) + ' ' + tp + ' ' + currentRowX1);
        return currentRowX1;

    },

    fillGenXs: function (gen) {

        let prevPerson = null;
        
        gen.filter((p)=>p.IsDisplayed).forEach((node, idx) => {         
            if (idx === 0) {
                node.X1 = this.startx1;                
            } else {
                node.X1 = prevPerson.X1 + this.boxWidth + (node.IsFamilyStart ? this.distancesbetfam : this.distanceBetweenBoxs);
            }
            node.X2 = node.X1 + this.boxWidth;

            prevPerson = node;              
        });
    }


};
