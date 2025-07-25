import { FamilyGraph } from '../FamilyGraph.js';
import { DescendantLayout } from './DescendantLayout.js';
import { Drawing } from '../Drawing.js';
import { MiddleParents, createFamilyCountArray, GetPrev, GetFirst, GetParentXs, CreateArray } from '../drawinglib/graphDiagFuncs.jsx';
import { TreeUI } from '../drawinglib/treeUI.js';

export class DescendantDrawing extends Drawing {
    constructor() {
        super(new FamilyGraph([]));
        this.refreshLayout = this.RefreshLayout.bind(this);
        this.layout = new DescendantLayout();
    }

    CreateWithDefaultValues(personId, data) {
        if (data.length === 0) {
            return;
        }

        this.graph = new FamilyGraph(data);
        this.nodes = data;

        const _zoomLevel = 100;
        this.selectedPersonId = personId;
        this.selectedPersonX = 0;
        this.selectedPersonY = 0;
        this.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0, 70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

        this.UpdateGenerationState();
        this.SetCentrePoint(0, 0);
        this.RelocateToSelectedPerson();
        this.bt_refreshData = false;
    }

    PerformClick(x, y) {
        const mouseLink = this.bt_links.LinkContainingPoint(x, y);

        if (mouseLink && mouseLink !== null) {
            const selectedPerson = this.graph.getTreePerson(mouseLink.action);
            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;
            this.bt_refreshData = true;
        } else {
            const buttonLink = this.bt_buttonLinks.LinkContainingPoint(x, y);
            if (buttonLink !== null) {
                const parts = buttonLink.action.split(',');
                const clickedPerson = this.graph.getTreePerson(parts[0]);
                const isVis = parts[1] === 'false';
                this.graph.SetVisibility(clickedPerson, isVis);
            }
        }
    }

    RelocateToSelectedPerson() {
        const personId = this.selectedPersonId;
        const _xpos = this.selectedPersonX;
        const _ypos = this.selectedPersonY;

        this.RefreshLayout();

        let distanceToMove = 0.0;
        let currentPersonLocation = 0;
        const _temp = this.graph.getTreePerson(personId);

        let x = 0.0;
        let y = 0.0;

        if (_temp !== null) {
            if (_xpos === 0.0) {
                currentPersonLocation = (this.graph.nodes[0][0].X1 + this.graph.nodes[0][0].X2) / 2;
                const requiredLocation = this.bt_screenWidth / 2;
                distanceToMove = requiredLocation - currentPersonLocation;
                this.centrePoint += distanceToMove;
            } else {
                currentPersonLocation = _temp.X1;
                if (currentPersonLocation < 0.0) {
                    distanceToMove = _xpos - currentPersonLocation;
                } else if (currentPersonLocation > this.bt_screenWidth) {
                    distanceToMove = 0.0 - ((this.bt_screenWidth - _xpos) + (_xpos - this.bt_screenWidth));
                } else if (currentPersonLocation >= 0 && currentPersonLocation <= this.bt_screenWidth) {
                    distanceToMove = _xpos - currentPersonLocation;
                }
                this.centrePoint += distanceToMove;
            }

            if (_ypos === 0.0) {
                const _currentPersonLocation = (this.graph.nodes[0][0].Y1 + this.graph.nodes[0][0].Y2) / 2;
                const _requiredLocation = this.layout.boxHeight;
                const _distanceToMove = _requiredLocation - _currentPersonLocation;
                this.centreVerticalPoint -= _distanceToMove;
            } else {
                if (_temp !== null) {
                    currentPersonLocation = _temp.Y1;
                    if (currentPersonLocation > this.bt_screenHeight) {
                        distanceToMove = currentPersonLocation - _ypos;
                    } else if (currentPersonLocation >= 0 && currentPersonLocation <= this.bt_screenHeight) {
                        distanceToMove = currentPersonLocation - _ypos;
                    } else if (currentPersonLocation < 0) {
                        distanceToMove = _ypos - currentPersonLocation;
                    }
                }
                this.centreVerticalPoint -= distanceToMove;
            }

            this.RefreshLayout();

            if (_ypos === 0) {
                y = 0 - this.bt_screenHeight / 2;
            } else {
                y = (_temp.Y2 + _temp.Y1) / 2;
            }

            if (_xpos === 0) {
                x = this.bt_screenWidth / 2;
            } else {
                x = (_temp.X2 + _temp.X1) / 2;
            }

            this.SetMouse(x, y);

            const percentages = this.GetPercDistances2();
            this.mouseXPercLocat = percentages.x;
            this.mouseYPercLocat = percentages.y;
        }
    }

    RefreshLayout() {
        if (this.graph.nodes.length === 0) {
            return;
        }

        let _displayGenCount = 0;
        this.marriageEdges = [];
        this.X2 = 0.0;
        let lastPersonY2 = 0.0;
        this.familyEdges = this.graph.nodes.map(g => Array.from({ length: g.VisibleFamilyCount }, () => []));

        this.graph.nodes.filter(f => f.GenerationVisible).forEach((genArray, genIdx) => {
            let prevGenArray = genIdx > 0 ? this.graph.nodes[genIdx - 1] : null;
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
                let secondRow = parent_gen_lower_y + this.layout.middleSpan;
                const thirdRow = parent_gen_lower_y + this.layout.middleSpan;
                const fourthRow = parent_gen_lower_y + this.layout.topSpan;

                if ((!(genPerson.IsFamilyEnd && isSpouse)) && genIdx > 0 && !genPerson.DoubleSpouseEnd) {
                    const family = this.familyEdges[genIdx][genPerson.FamilyIdx];
                    const point = [(genPerson.X1 + this.layout.halfBox), firstRow];
                    family.push(point);
                    if (!isSpouse) {
                        family.push([(genPerson.X1 + this.layout.halfBox), current_gen_upper_y]);
                    }
                    family.push(point);
                }

                if (genPerson.IsParentalLink && genIdx > 0) {
                    const middleParents = MiddleParents(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);
                    const nextParentLink = GetFirst(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);
                    const prevParentLink = GetPrev(prevGenArray, genPerson.FatherIdx, genPerson.MotherIdx);

                    if (genPerson.Father === undefined || genPerson.Mother === undefined) {
                        //console.log('error - father or mother undefined. All parental links should have a mother or a father. Info: ' + genPerson.Id + ' ' + genPerson.PersonId);
                    }

                    const parentXs = GetParentXs(genPerson.Father?.X1 ?? 0, genPerson.Mother?.X1 ?? 0, this.layout.halfBox);
                    const incSize = (this.layout.distanceBetweenGens - this.layout.middleSpan - this.layout.lowerSpan) / familydirectionCounts[famIdx];
                    let increment_temp = (famIdx === 0 && genPerson.X1 > middleParents) ? this.layout.distanceBetweenGens - this.layout.middleSpan - this.layout.lowerSpan : 0.0;
                    let thirdStorkX = genPerson.X1 > middleParents ? Math.max(genPerson.X1, Math.min(nextParentLink, genPerson.X2)) : Math.min(genPerson.X1, Math.max(prevParentLink, genPerson.X1));
                    secondRow += increment_temp;

                    if (Math.abs(firstRow - secondRow) <= 1) {
                        secondRow -= (incSize / 2);
                    }

                    let secondStorkX = genPerson.X1;
                    if (genPerson.IsFamilyStart) {
                        const nextFamilyStart = genArray.Count > 1 ? genArray[personIdx + 1].X1 : genArray[personIdx].X2;
                        const sizeToAdd = genPerson.IsFamilyEnd ? this.layout.halfBox : this.layout.boxWidth;
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
                        secondRow += 25;
                    }

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
                }

                genPerson.Y1 = current_gen_upper_y;
                genPerson.Y2 = current_gen_upper_y + this.layout.boxHeight;
                lastPersonY2 = genPerson.Y2;
                this.SetNodeZoomLevel(genPerson);
            });
        });

        if (this.graph.nodes.length > 0) {
            this.drawingX1 = Math.min(...this.graph.nodes.map(node => node[0].X1));
            this.drawingX2 = Math.max(...this.graph.nodes.map(node => node[node.length - 1].X2));
            this.drawingY1 = this.graph.nodes[this.graph.nodes.length - 1][0].Y2;
            this.drawingY2 = this.graph.nodes[0][0].Y1;
        }
    }

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

        for (let genIdx = 0; genIdx < this.graph.nodes.length; genIdx++) {
            this.familyEdges.push([]);
            personCount = 0;
            isDisplayed = false;
            familyCount = 0;
            firstVisibleIdx = -1;
            lastVisibleIdx = -1;
            firstFamilyIdx = 0;
            lastFamilyIdx = 0;
            _familyIdx = -1;

            for (let personIdx = 0; personIdx < this.graph.nodes[genIdx].length; personIdx++) {
                if (this.graph.nodes[genIdx][personIdx].IsDisplayed) {
                    if (this.graph.nodes[genIdx][personIdx].IsFamilyStart) {
                        _familyIdx++;
                        this.familyEdges[genIdx].push([]);
                    }

                    if (this.graph.nodes[genIdx][personIdx].IsFamilyStart) {
                        familyCount++;
                    }

                    personCount++;
                    isDisplayed = true;
                    lastVisibleIdx = personIdx;

                    if (this.graph.nodes[genIdx][personIdx].ChildLst.length > 0) {
                        lastFamilyIdx = personIdx;
                        if (firstFamilyIdx === -1) firstFamilyIdx = personIdx;
                    }

                    if (firstVisibleIdx === -1) firstVisibleIdx = personIdx;

                    let _isDoubleSpouseEnd = false;
                    if (this.graph.nodes[genIdx][personIdx].IsHtmlLink) {
                        if ((this.graph.nodes[genIdx].length > personIdx + 1)
                            && this.graph.nodes[genIdx][personIdx + 1].IsHtmlLink) {
                            _isDoubleSpouseEnd = true;
                        }
                    }

                    this.graph.nodes[genIdx][personIdx].DoubleSpouseEnd = _isDoubleSpouseEnd;
                    this.graph.nodes[genIdx][personIdx].FamilyIdx = _familyIdx;
                }
            }

            this.graph.nodes[genIdx].VisibleFamilyCount = familyCount;
            this.graph.nodes[genIdx].VisiblePersonCount = personCount;
            this.graph.nodes[genIdx].GenerationVisible = isDisplayed;
            this.graph.nodes[genIdx].FirstVisibleIdx = firstVisibleIdx;
            this.graph.nodes[genIdx].LastVisibleIdx = lastVisibleIdx;
            this.graph.nodes[genIdx].FirstFamilyIdx = firstFamilyIdx;
            this.graph.nodes[genIdx].LastFamilyIdx = lastFamilyIdx;
        }
    }

    SetScheduleVars(genidx, currentRowX1) {
        let prevGenX1 = 0.0;
        let prevGenX2 = 0.0;

        if (genidx === 0) {
            this.X1 = currentRowX1;
            currentRowX1 = this.centrePoint - (((this.graph.nodes[genidx].length * this.layout.boxWidth) + ((this.graph.nodes[genidx].length - 1) * this.layout.distanceBetweenBoxs)) / 2);
        } else {
            prevGenX1 = this.graph.nodes[genidx - 1][this.graph.nodes[genidx - 1].FirstFamilyIdx].X1;
            prevGenX2 = this.graph.nodes[genidx - 1][this.graph.nodes[genidx - 1].LastFamilyIdx].X1 + this.layout.boxWidth;

            currentRowX1 = prevGenX1 + (this.layout.boxWidth / 2);
            const endx2 = prevGenX2 - (this.layout.boxWidth / 2);

            const _prevGenLen = endx2 - currentRowX1;
            let _curGenLen = (this.graph.nodes[genidx].VisiblePersonCount * (this.layout.boxWidth + this.layout.distanceBetweenBoxs)) - (this.layout.distanceBetweenBoxs * this.graph.nodes[genidx].VisibleFamilyCount);

            if (_prevGenLen > _curGenLen) {
                this.layout.distancesbetfam = (_prevGenLen - _curGenLen) / this.graph.nodes[genidx].VisibleFamilyCount;
            } else {
                this.layout.distancesbetfam = (this.layout.initial_layout_state.distancesbetfam / 100) * this.zoomPercentage;
            }

            _curGenLen = _curGenLen + (this.layout.distancesbetfam * (this.graph.nodes[genidx].VisibleFamilyCount - 1));
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

    draw(ctx, ancestorConfig) {
        if (this.IsValid()) {
            this.centrePoint += this.movementx;
            this.centreVerticalPoint += this.movementy;

            const ui = new TreeUI(ctx, ancestorConfig, true, () => { });

            this.RefreshLayout();

            ui.ClearScreen();

            this.bt_links = [];
            this.bt_buttonLinks = [];

            this.nodes.forEach((generation) => {
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
        }
    }

    GetChildDisplayStatus(person) {
        let isDisplayed = true;

        if (this.graph.nodes.length > person.GenerationIdx) {
            for (let i = 0; i < this.graph.nodes[person.GenerationIdx].length; i++) {
                if (this.graph.nodes[person.GenerationIdx][i].PersonId === person.ChildLst[0]) {
                    isDisplayed = this.graph.nodes[person.GenerationIdx][i].IsDisplayed;
                    break;
                }
            }
        }
        return isDisplayed;
    }
}