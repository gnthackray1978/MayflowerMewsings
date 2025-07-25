import { FamilyGraph } from '../FamilyGraph.js';
import { AncestorLayout } from './AncestorLayout.js';
import { Drawing } from '../Drawing.js';
import { TreeUI } from '../drawinglib/treeUI.js';

export class AncestorDrawing extends Drawing {
    constructor() {
        super(new FamilyGraph([]));
        this.refreshLayout = this.RefreshLayout.bind(this);
        this.layout = new AncestorLayout();
    }

    CreateWithDefaultValues(personId, data) {
        if (data.length === 0) {
            return;
        }

        this.ancGraph = new FamilyGraph(data);
        this.nodes = data;

        const _zoomLevel = 100;
        this.selectedPersonId = personId;
        this.selectedPersonX = 0;
        this.selectedPersonY = 0;
        this.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0, 70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

        this.SetCentrePoint(0, 0);
        this.RelocateToSelectedPerson();
        this.bt_refreshData = false;
    }

    PerformClick(x, y) {
        const mouseLink = this.bt_links.LinkContainingPoint(x, y);

        if (mouseLink) {
            const selectedPerson = this.ancGraph.getTreePerson(mouseLink.action);
            this.selectedPersonId = selectedPerson.PersonId;
            this.selectedPersonX = selectedPerson.X1;
            this.selectedPersonY = selectedPerson.Y1;
            this.bt_refreshData = true;
        } else {
            const buttonLink = this.bt_buttonLinks.LinkContainingPoint(x, y);
            if (buttonLink) {
                const parts = buttonLink.action.split(',');
                const clickedPerson = this.ancGraph.getTreePerson(parts[0]);
                const isVis = parts[1] === 'false';
                this.ancGraph.setVisibility(clickedPerson, isVis);
            }
        }
    }

    RelocateToSelectedPerson() {
        const personId = this.selectedPersonId;
        const _xpos = this.selectedPersonX;
        const _ypos = this.selectedPersonY;

        this.RefreshLayout();

        let distanceToMoveX = 0.0;
        let distanceToMoveY = 0.0;
        const _temp = this.ancGraph.getTreePerson(personId);

        if (_temp !== null) {
            const currentPersonLocationX = (_temp.X1 + _temp.X2) / 2;
            const currentPersonLocationY = (_temp.Y1 + _temp.Y2) / 2;

            if (_xpos === 0.0) {
                const requiredLocationX = this.bt_screenWidth / 2;
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

            const x = _xpos === 0 ? this.bt_screenWidth / 2 : currentPersonLocationX;
            const y = _ypos === 0 ? 0 - this.bt_screenHeight / 2 : currentPersonLocationY;

            this.SetMouse(x, y);
            this.RefreshLayout();
        }
    }

    RefreshLayout() {
        this.drawingX2 = 0.0;
        this.drawingX1 = 0.0;
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

        this.nodes.forEach((generation, genidx) => {
            percentageLess += 2;
            generation.forEach((currentNode, personIdx) => {
                this.layout.changeGenScale(this.nodes, currentNode, percentageLess);
                let xEdge = this.CalculateNodeXPosition(
                    this.nodes,
                    currentNode,
                    this.layout.adjustedDistances[genidx],
                    this.layout.adjustedBoxWidths[genidx]
                );
                const spacing = this.ancGraph.lastGenerationSpacing(currentNode);
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
                                    xRange.x2 = xRange.x1 + this.layout.adjustedBoxWidths[n.next?.GenerationIdx ?? n.node.GenerationIdx];
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
                this.ancGraph.setZoomLevel(currentNode);
            });
            _y -= this.layout.distanceBetweenGens;
        });

        this.layout.setBoxWidth(this.nodes[0][0]);
        let result = this.ancGraph.createXAxisFromParents(this.nodes[0][0], this.layout.boxWidth);
        this.nodes[0][0].X1 = result.x1;
        this.nodes[0][0].X2 = result.x2;
        this.nodes[0][0].IsDisplayed = true;

        this.drawingX1 = Math.min(...this.nodes.map(node => node[0].X1));
        this.drawingX2 = Math.max(...this.nodes.map(node => node[node.length - 1].X2));
        this.drawingY1 = this.nodes[this.nodes.length - 1][0].Y2;
        this.drawingY2 = this.nodes[0][0].Y1;

        this.CreateEdges();
    }

    CreateEdges() {
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
                const parentHeight = this.ancGraph.nextGenerationHeight(genidx);
                const bottomParent = node.Parents[0].Y1 + parentHeight;
                const distanceBetweenGens = this.ancGraph.distanceToNextGeneration(genidx);
                const middleXChild = (node.X1 + node.X2) / 2;
                const middleGeneration = node.Y1 - (distanceBetweenGens / 2) + 10;
                const drawingHeight = this.drawingY2 - this.drawingY1;
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
    }

    CalculateNodeXPosition(nodes, node, distanceApart, boxWidth) {
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

    draw(ctx, ancestorConfig) {
        if (this.IsValid()) {
            
            this.centrePoint += this.movementx;
            this.centreVerticalPoint += this.movementy;

            let ui = new TreeUI(ctx, ancestorConfig, true, () => { });

            this.RefreshLayout();

            ui.ClearScreen();

            this.bt_links = [];

            this.nodes.forEach((generation, genidx) => {
                generation.forEach(node => {
                    const personLink = ui.DrawPerson(node, this.bt_screenWidth, this.bt_screenHeight, this.sourceId, this.zoomPercentage);

                    if (personLink !== null) {
                        this.bt_links.push(personLink);
                    }
                });
            });


            this.edges.forEach(edgeGroup => {
                edgeGroup.forEach(edge => {
                    ui.DrawLine(this.bt_screenWidth, this.bt_screenHeight, edge);
                });
            });
        }
    }
}
