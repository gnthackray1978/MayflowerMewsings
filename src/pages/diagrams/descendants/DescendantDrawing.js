import {MiddleParents, createFamilyCountArray, GetPrev, GetFirst, GetParentXs, CreateArray} from '../drawinglib/graphDiagFuncs.jsx';
import { FamilyGraph } from '../FamilyGraph.js';
import {Drawing} from '../Drawing.js'; // new import
import { DescendantLayout } from './DescendantLayout.js';
import { TreeUI } from '../drawinglib/treeUI.js';

export class DescendantDrawing {
    constructor() {
        this.descGraph = new FamilyGraph([]);
        this.drawing = new Drawing();
        this.layout = new DescendantLayout();

        this._qryString = '';
        this.bt_refreshData = false;

        this.familyEdges = [];
        this.marriageEdges = [];

        this.centrePoint = 750.0;
        this.centreVerticalPoint = 0.0;
        this.zoomLevel = 0.0;

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

        this.movementx = 0;
        this.movementy = 0;
    }

    SetMovementX(x) {
        this.movementx = x;
    }

    SetMovementY(y) {
        this.movementy = y;
    }

    CreateWithDefaultValues(personId, data) {
        if (data.length === 0) {
            return;
        }

        this.descGraph = new FamilyGraph(data);
        this.layout = new DescendantLayout();

        const _zoomLevel = 100;
        this.selectedPersonId = personId;
        this.selectedPersonX = 0;
        this.selectedPersonY = 0;
        this.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0,
            70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

        this.descGraph.nodes = data;
        this.UpdateGenerationState();
        this.SetCentrePoint(0, 0);
        this.RelocateToSelectedPerson();
        this.bt_refreshData = false;
    }

    SetInitialValues(zoomPerc,
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
    }

    SetZoom(delta) {
        const x = this.drawing.bt_screenWidth / 2;
        const y = this.drawing.bt_screenHeight / 2;

        this.drawing.SetMouse(x, y);
 
        const before = this.drawing.GetPercDistances2();

        if (delta !== 0.0) {
        
            this.zoomPercentage += delta;
            this.zoomLevel += delta;
           
            this.layout.zoomLayoutProps(this.zoomPercentage);

            this.RefreshLayout();

            const after = this.drawing.GetPercDistances2();
 
            const drawingHeight = this.drawing.drawingY2 - this.drawing.drawingY1;
            const drawingWidth = this.drawing.drawingX2 - this.drawing.drawingX1;


            this.centreVerticalPoint += (drawingHeight / 100) * (after.y - before.y);

            this.centrePoint += (drawingWidth / 100) * (after.x - before.x);

           
            this.RefreshLayout();
        }
    }
     
    

    GetChildDisplayStatus(person) {
        let isDisplayed = true;

        if (this.descGraph.nodes.length > person.GenerationIdx) {
            for (let i = 0; i < this.descGraph.nodes[person.GenerationIdx].length; i++) {
                if (this.descGraph.nodes[person.GenerationIdx][i].PersonId === person.ChildLst[0]) {
                    isDisplayed = this.descGraph.nodes[person.GenerationIdx][i].IsDisplayed;
                    break;
                }
            }
        }
        return isDisplayed;
    }

    // move this up to the derived classes

    PerformClick(x, y) {
        const mouseLink = this.drawing.bt_links.LinkContainingPoint(x, y);

        if (mouseLink !== null) {
            const selectedPerson = this.descGraph.getTreePerson(mouseLink.action);
            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;
            this.drawing.bt_refreshData = true;
        } else {
            const buttonLink = this.drawing.bt_buttonLinks.LinkContainingPoint(x, y);
            if (buttonLink !== null) {
                const parts = buttonLink.action.split(',');
                const clickedPerson = this.descGraph.getTreePerson(parts[0]);
                const isVis = parts[1] === 'false';
                this.descGraph.SetVisibility(clickedPerson, isVis);
            }
        }
    }

    SetCentrePoint(param_x, param_y) {
        this.centrePoint = param_x;
        this.centreVerticalPoint = param_y;
    }
    ResetOffset() {
        this.centrePointXOffset = 0;
        this.centrePointYOffset = 0;
    }
    ZoomIn() {
        this.zoomAmount++;
        this.SetZoom(this.zoomAmount);
    }
    ZoomOut() {
        if (this.zoomAmount > 7)
            this.zoomAmount--;
        this.SetZoom(this.zoomAmount - (this.zoomAmount * 2));
    }
  


    SetNodeZoomLevel(node) {
        const nodeArea = (node.X2 - node.X1) * (node.Y2 - node.Y1);
        node.zoom = this.drawing.CalcAreaLevel(nodeArea);
    }

    RelocateToSelectedPerson() {
        const personId = this.selectedPersonId;
        const _xpos = this.selectedPersonX;
        const _ypos = this.selectedPersonY;

        this.RefreshLayout();

        let distanceToMove = 0.0;
        let currentPersonLocation = 0;
        const _temp = this.descGraph.getTreePerson(personId);

        let x = 0.0;
        let y = 0.0;

        if (_temp !== null) {
            if (_xpos === 0.0) {
                currentPersonLocation = (this.descGraph.nodes[0][0].X1 + this.descGraph.nodes[0][0].X2) / 2;
                const requiredLocation = this.drawing.bt_screenWidth / 2;
                distanceToMove = requiredLocation - currentPersonLocation;
                this.centrePoint += distanceToMove;
            } else {
                currentPersonLocation = _temp.X1;
                if (currentPersonLocation < 0.0) {
                    distanceToMove = _xpos - currentPersonLocation;
                } else if (currentPersonLocation > this.drawing.bt_screenWidth) {
                    distanceToMove = 0.0 - ((this.drawing.bt_screenWidth - _xpos) + (_xpos - this.drawing.bt_screenWidth));
                } else if (currentPersonLocation >= 0 && currentPersonLocation <= this.drawing.bt_screenWidth) {
                    distanceToMove = _xpos - currentPersonLocation;
                }
                this.centrePoint += distanceToMove;
            }

            if (_ypos === 0.0) {
                const _currentPersonLocation = (this.descGraph.nodes[0][0].Y1 + this.descGraph.nodes[0][0].Y2) / 2;
                const _requiredLocation = this.layout.boxHeight;
                const _distanceToMove = _requiredLocation - _currentPersonLocation;
                this.centreVerticalPoint -= _distanceToMove;
            } else {
                if (_temp !== null) {
                    currentPersonLocation = _temp.Y1;
                    if (currentPersonLocation > this.drawing.bt_screenHeight) {
                        distanceToMove = currentPersonLocation - _ypos;
                    } else if (currentPersonLocation >= 0 && currentPersonLocation <= this.drawing.bt_screenHeight) {
                        distanceToMove = currentPersonLocation - _ypos;
                    } else if (currentPersonLocation < 0) {
                        distanceToMove = _ypos - currentPersonLocation;
                    }
                }
                this.centreVerticalPoint -= distanceToMove;
            }

            this.RefreshLayout();

            if (_ypos === 0) {
                y = 0 - this.drawing.bt_screenHeight / 2;
            } else {
                y = (_temp.Y2 + _temp.Y1) / 2;
            }

            if (_xpos === 0) {
                x = this.drawing.bt_screenWidth / 2;
            } else {
                x = (_temp.X2 + _temp.X1) / 2;
            }

            this.drawing.SetMouse(x, y);

            const percentages = this.drawing.GetPercDistances2();
            this.mouseXPercLocat = percentages.x;
            this.mouseYPercLocat = percentages.y;
        }
    }


    Debug() {
        // This method seems to be for debugging and contains commented-out console.log statements.
        // It's generally good practice to remove or refactor debug code for production.
        // Keeping it as is for now, but noting it for potential future cleanup.
    }

    IsValid() {
        return this.descGraph.nodes?.length > 0;
    }

  
    draw(ctx, ancestorConfig) {
        if (this.IsValid()) {
            this.centrePoint += this.movementx;
            this.centreVerticalPoint += this.movementy;

            const ui = new TreeUI(ctx, ancestorConfig, true, () => { });

            this.RefreshLayout();

            ui.ClearScreen();


            this.bt_links = [];
            this.bt_buttonLinks = [];

            this.descGraph.nodes.forEach((generation) => {
                generation.forEach(person => {
                    const personLink = ui.DrawPerson(person, this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, this.sourceId, this.zoomPercentage);
                    if (personLink) this.bt_links.push(personLink);

                    if (person.GenerationIdx !== 0) {
                        const buttonLink = ui.DrawButton(this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, person, this.GetChildDisplayStatus(person));
                        if (buttonLink) this.bt_buttonLinks.push(buttonLink);
                    }
                });
            });

            this.familyEdges.forEach(familyEdgeGroup => {
                familyEdgeGroup.forEach(edge => {
                    ui.DrawLine(this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, edge);
                });
            });

            this.marriageEdges.forEach(edge => {
                ui.DrawLine(this.drawing.bt_screenWidth, this.drawing.bt_screenHeight, edge);
            });
        }
    }

    RefreshLayout() {

        if (this.descGraph.nodes.length === 0) {
            return;
        }

        // unused
        let _displayGenCount = 0;

        this.marriageEdges = [];

        this.X2 = 0.0;

        let lastPersonY2 = 0.0;

        this.familyEdges = this.descGraph.nodes.map(g => Array.from({ length: g.VisibleFamilyCount }, () => [])); // CreateArray(this.descGraph.nodes);

        this.descGraph.nodes.filter(f => f.GenerationVisible).forEach((genArray, genIdx) => {

            let prevGenArray = genIdx > 0 ? this.descGraph.nodes[genIdx - 1] : null;

            _displayGenCount++;

            this.startx1 = this.SetScheduleVars(genIdx, this.startx1);

            this.fillGenXs(genArray);

            const current_gen_upper_y = (genIdx * this.layout.boxHeight) + (genIdx * this.layout.distanceBetweenGens) + this.centreVerticalPoint;

            let famIdx = 0;

            const familydirectionCounts = genIdx > 0 ? createFamilyCountArray(genIdx, genArray, prevGenArray) : [];

            genArray.filter(f => f.IsDisplayed).forEach((genPerson, personIdx) => {


                genPerson.X2 = genPerson.X1 + this.layout.boxWidth;

                const isSpouse = genPerson.IsHtmlLink;

                let parent_gen_lower_y = 0.0;

                //childless marriages
                if (genPerson.SpouseIdxLst.length > 0 && genPerson.ChildCount === 0 && !isSpouse) {
                    const spouseIdx = genPerson.SpouseIdxLst[0];
                    const tp = genArray[spouseIdx].X1;

                    if (Math.abs(spouseIdx - personIdx) <= 2 && genArray[spouseIdx].ChildCount === 0) {
                        const marriagePoints = [
                            [(genPerson.X1 + this.layout.halfBox), (current_gen_upper_y + this.layout.boxHeight)],
                            [(genPerson.X1 + this.layout.halfBox), (current_gen_upper_y + this.layout.boxHeight + this.layout.topSpan)],
                            [(tp + this.layout.halfBox), (current_gen_upper_y + this.layout.boxHeight + this.layout.topSpan)],
                            [(tp + this.layout.halfBox), (current_gen_upper_y + this.layout.boxHeight)]
                        ];

                        this.marriageEdges.push(marriagePoints);
                    }
                }

                if (genIdx > 0) {
                    if (prevGenArray[genPerson.FatherIdx] === undefined) {
                        console.log('error');
                        throw new Error('father undefined: ' + genIdx + ' ' + genPerson.RecordLink.FirstName + ' ' + genPerson.RecordLink.Surname);
                    }
                    parent_gen_lower_y = prevGenArray[genPerson.FatherIdx].Y2;
                }
                const firstRow = current_gen_upper_y - this.layout.lowerSpan;
                let secondRow = parent_gen_lower_y + this.layout.middleSpan; // changed with increment later on - need to calculate the maximum and minimum this increment will be
                const thirdRow = parent_gen_lower_y + this.layout.middleSpan;
                const fourthRow = parent_gen_lower_y + this.layout.topSpan;

                if ((!(genPerson.IsFamilyEnd && isSpouse)) && genIdx > 0 && !genPerson.DoubleSpouseEnd) {
                    const family = this.familyEdges[genIdx][genPerson.FamilyIdx];
                    const point = [(genPerson.X1 + this.layout.halfBox), firstRow];



                    //top of edge that comes out from the top of the node
                    family.push(point);

                    if (!isSpouse) {
                        //bottom of edge that comes out from the top of the node
                        family.push([(genPerson.X1 + this.layout.halfBox), current_gen_upper_y]);
                    }

                    //move the 'cursor' to the top the created edge.   
                    family.push(point);

                }

                if (genPerson.IsParentalLink && genIdx > 0) {



                    const middleParents = MiddleParents(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);

                    const nextParentLink = GetFirst(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);
                    const prevParentLink = GetPrev(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);

                    //there should always be a father and mother at this point
                    //as we are never in generation zero
                    if (genPerson.Father === undefined || genPerson.Mother === undefined) {
                        //console.log('error - father or mother undefined. All parental links should have a mother or a father. Info: ' + genPerson.Id + ' ' + genPerson.PersonId);
                    }


                    const parentXs = GetParentXs(genPerson.Father?.X1 ?? 0, genPerson.Mother?.X1 ?? 0, this.layout.halfBox);

                    const incSize = (this.layout.distanceBetweenGens - this.layout.middleSpan - this.layout.lowerSpan) / familydirectionCounts[famIdx];
                    let increment_temp = (famIdx === 0 && genPerson.X1 > middleParents) ? this.layout.distanceBetweenGens - this.layout.middleSpan - this.layout.lowerSpan : 0.0;

                    let thirdStorkX = genPerson.X1 > middleParents ? Math.max(genPerson.X1, Math.min(nextParentLink, genPerson.X2)) : Math.min(genPerson.X1, Math.max(prevParentLink, genPerson.X1));

                    //   increment_temp += genPerson.X1 > middleParents ? -incSize : incSize;
                    secondRow += increment_temp;

                    if (Math.abs(firstRow - secondRow) <= 1) {
                        secondRow -= (incSize / 2);
                    }

                    let secondStorkX = genPerson.X1;

                    if (genPerson.IsFamilyStart) {
                        const nextFamilyStart = genArray.Count > 1 ? genArray[personIdx + 1].X1 : genArray[personIdx].X2;
                        const sizeToAdd = genPerson.IsFamilyEnd ? this.layout.halfBox : this.layout.boxWidth;
                        //debugger;
                        if (middleParents < nextFamilyStart && middleParents > genArray[personIdx].X1) {
                            secondStorkX = middleParents;
                            thirdStorkX = middleParents;
                        }

                        if (secondStorkX === thirdStorkX) {
                            thirdStorkX += sizeToAdd;
                        }

                        secondStorkX += sizeToAdd;
                    }

                    if (genPerson.RecordLink.Surname === 'Lutton') {
                        //console.log('Lutton');
                        secondRow += 25;
                    }
                    //firstrow = top of the edge that comes out from the top of the node

                    //endregion
                    const points = [
                        [secondStorkX, firstRow],
                        [secondStorkX, secondRow],
                        [thirdStorkX, secondRow],
                        [thirdStorkX, thirdRow],
                        [middleParents, thirdRow],
                        [middleParents, fourthRow],
                        [parentXs.firstPX, fourthRow],
                        [parentXs.firstPX, parent_gen_lower_y],
                        [parentXs.firstPX, fourthRow],
                        [parentXs.secondPX, fourthRow],
                        [parentXs.secondPX, parent_gen_lower_y],
                        [parentXs.secondPX, fourthRow],
                        [middleParents, fourthRow],
                        [middleParents, thirdRow],
                        [thirdStorkX, thirdRow],
                        [thirdStorkX, secondRow],
                        [secondStorkX, secondRow],
                        [secondStorkX, firstRow]
                    ];

                    points.forEach(point => this.familyEdges[genIdx][genPerson.FamilyIdx].push(new Array(...point)));

                    famIdx++;
                } //end (genPerson.IsParentalLink && genIdx > 0)

                genPerson.Y1 = current_gen_upper_y;
                genPerson.Y2 = current_gen_upper_y + this.layout.boxHeight;

                lastPersonY2 = genPerson.Y2;

                this.SetNodeZoomLevel(genPerson);

            }); // end while personidx


        });

        // if (this.descGraph.nodes.length > 0) {
        //     this.Y1 = this.descGraph.nodes[0][0].Y1;
        // }
        // if (this.descGraph.nodes[_displayGenCount - 1].length > 0) {
        //     this.Y2 = lastPersonY2;
        // }

        // may have broken something here when nodes are made visible/invisible
        if (this.descGraph.nodes.length > 0) {
            this.drawing.drawingX1 = Math.min(...this.descGraph.nodes.map(node => node[0].X1));
            this.drawing.drawingX2 = Math.max(...this.descGraph.nodes.map(node => node[node.length - 1].X2));
            this.drawing.drawingY1 = this.descGraph.nodes[this.descGraph.nodes.length - 1][0].Y2;
            this.drawing.drawingY2 = this.descGraph.nodes[0][0].Y1;
        }
    }

    //run when generation is loaded
    //run when visibility changed
    UpdateGenerationState() {
        let familyCount = 0;
        let personCount = 0;
        let isDisplayed = true;
        let firstVisibleIdx = -1;
        let lastVisibleIdx = -1;
        let firstFamilyIdx = -1;
        let lastFamilyIdx = -1;
        let _familyIdx = -1;

        this.marriageEdges = [];
        this.familyEdges = [];

        for (let genIdx = 0; genIdx < this.descGraph.nodes.length; genIdx++) {
            this.familyEdges.push([]);
            personCount = 0;
            isDisplayed = false;
            familyCount = 0;
            firstVisibleIdx = -1;
            lastVisibleIdx = -1;
            firstFamilyIdx = 0;
            lastFamilyIdx = 0;
            _familyIdx = -1;

            for (let personIdx = 0; personIdx < this.descGraph.nodes[genIdx].length; personIdx++) {
                if (this.descGraph.nodes[genIdx][personIdx].IsDisplayed) {
                    if (this.descGraph.nodes[genIdx][personIdx].IsFamilyStart) {
                        _familyIdx++;
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
                        if (firstFamilyIdx === -1) firstFamilyIdx = personIdx;
                    }

                    if (firstVisibleIdx === -1) firstVisibleIdx = personIdx;

                    let _isDoubleSpouseEnd = false;
                    if (this.descGraph.nodes[genIdx][personIdx].IsHtmlLink) {
                        if ((this.descGraph.nodes[genIdx].length > personIdx + 1)
                            && this.descGraph.nodes[genIdx][personIdx + 1].IsHtmlLink) {
                            _isDoubleSpouseEnd = true;
                        }
                    }

                    this.descGraph.nodes[genIdx][personIdx].DoubleSpouseEnd = _isDoubleSpouseEnd;
                    this.descGraph.nodes[genIdx][personIdx].FamilyIdx = _familyIdx;
                }
            }

            this.descGraph.nodes[genIdx].VisibleFamilyCount = familyCount;
            this.descGraph.nodes[genIdx].VisiblePersonCount = personCount;
            this.descGraph.nodes[genIdx].GenerationVisible = isDisplayed;
            this.descGraph.nodes[genIdx].FirstVisibleIdx = firstVisibleIdx;
            this.descGraph.nodes[genIdx].LastVisibleIdx = lastVisibleIdx;
            this.descGraph.nodes[genIdx].FirstFamilyIdx = firstFamilyIdx;
            this.descGraph.nodes[genIdx].LastFamilyIdx = lastFamilyIdx;
        }
    }

    SetScheduleVars(genidx, currentRowX1) {
        let prevGenX1 = 0.0;
        let prevGenX2 = 0.0;

        if (genidx === 0) {
            this.X1 = currentRowX1;
            currentRowX1 = this.centrePoint - (((this.descGraph.nodes[genidx].length * this.layout.boxWidth) + ((this.descGraph.nodes[genidx].length - 1) * this.layout.distanceBetweenBoxs)) / 2);
        } else {
            prevGenX1 = this.descGraph.nodes[genidx - 1][this.descGraph.nodes[genidx - 1].FirstFamilyIdx].X1;
            prevGenX2 = this.descGraph.nodes[genidx - 1][this.descGraph.nodes[genidx - 1].LastFamilyIdx].X1 + this.layout.boxWidth;

            currentRowX1 = prevGenX1 + (this.layout.boxWidth / 2);
            const endx2 = prevGenX2 - (this.layout.boxWidth / 2);

            const _prevGenLen = endx2 - currentRowX1;
            let _curGenLen = (this.descGraph.nodes[genidx].VisiblePersonCount * (this.layout.boxWidth + this.layout.distanceBetweenBoxs)) - (this.layout.distanceBetweenBoxs * this.descGraph.nodes[genidx].VisibleFamilyCount);

            if (_prevGenLen > _curGenLen) {
                this.layout.distancesbetfam = (_prevGenLen - _curGenLen) / this.descGraph.nodes[genidx].VisibleFamilyCount;
            } else {
                this.layout.distancesbetfam = (this.layout.initial_layout_state.distancesbetfam / 100) * this.zoomPercentage;
            }

            _curGenLen = _curGenLen + (this.layout.distancesbetfam * (this.descGraph.nodes[genidx].VisibleFamilyCount - 1));
            const _desiredMidPoint = ((endx2 - currentRowX1) / 2) + currentRowX1;
            currentRowX1 = _desiredMidPoint - (_curGenLen / 2);
        }
        return currentRowX1;
    }

    fillGenXs(gen) {
        let prevPerson = null;
        gen.filter((p) => p.IsDisplayed).forEach((node, idx) => {
            if (idx === 0) {
                node.X1 = this.startx1;
            } else {
                node.X1 = prevPerson.X1 + this.layout.boxWidth + (node.IsFamilyStart ? this.layout.distancesbetfam : this.layout.distanceBetweenBoxs);
            }
            node.X2 = node.X1 + this.layout.boxWidth;
            prevPerson = node;
        });
    }
}