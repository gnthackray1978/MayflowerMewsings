// this should be the drawing object
// which is made up of a layout
// and a graph
export class AncestorGraph {
    constructor(data) {
        this.generations = data;

        //this.familySpanLines = [];
        //this.childlessMarriages = [];
    }

    GetTreePerson(personId) {

        for (let gidx = 0; gidx < this.generations.length; gidx++) {
            for (let pidx = 0; pidx < this.generations[gidx].length; pidx++) {
                if (this.generations[gidx][pidx].PersonId === personId) {
                    return this.generationsgraph[gidx][pidx];
                }
            }
        }

        return null;
    }

    GetChildDisplayStatus(person) {

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
    }

    GetPerson(gen, idx) {
        return this.generations[gen][idx];
    }

    DistanceToNextGeneration(genidx) {
        //return this.generations[genidx][personIdx].X2 - this.generations[genidx][personIdx].X1;
        //(this.generations[genidx][personIdx].Y1 - this.generations[genidx + 1][0].Y2);
        return this.generations[genidx][0].Y1 - this.generations[genidx + 1][0].Y2;
    }

    NextGenerationHeight(genidx) {
        return (this.generations[genidx + 1][0].Y2 - this.generations[genidx + 1][0].Y1);
    }
    LastGenerationSpacing(node) {

        const genidx = node.GenerationIdx;
        const personIdx = node.Index;

        if (personIdx < 1) {
            return { nodeCount: 0 }; // leave undefined spacing and previousX2 becase there is no previous node
        }

        const previousNode = this.generations[genidx][personIdx - 1];
        const newChildIdx = node.ChildIdx;
        const oldChildIdx = previousNode.ChildIdx;
        const nodeCount = newChildIdx - oldChildIdx - 1;
        const spacing = this.generations[genidx - 1][newChildIdx].X1 - this.generations[genidx - 1][oldChildIdx].X2;

        return { nodeCount, spacing, previousX2: this.generations[genidx][personIdx - 1].X2 };
    }
    PrecedingNodes(searchNode) {
        return this.generations[searchNode.GenerationIdx]
            .slice(0, searchNode.Index + 1)
            .reverse()
            .map((node, i) => ({
                node,
                parentsKnown: !(node.FatherIdx === -1 && node.MotherIdx === -1),
                next: this.generations[searchNode.GenerationIdx][i + 1] || null,
                update: (range) => {
                    node.X1 = range.x1;
                    node.X2 = range.x2;
                }
            }));
    }

    GetDescendants(person, startGen) {

        let moveList = [];
        let moveGenIdx = startGen;

        while (moveGenIdx > 0) {

            const node = this.generations[moveGenIdx][person];

            if (!moveList.some(p => p.PersonId === node.PersonId)) {
                moveList.push(node);
            }

            person = node.ChildIdx;
            moveGenIdx--;
        }

        moveList.sort((a, b) => b.GenerationIdx - a.GenerationIdx);

        return moveList;
    };

    forEachPrevNodeDescendant(node, callback) {

        const personIdx = node.Index;
        const genidx = node.GenerationIdx;

        this.GetDescendants(personIdx - 1, genidx)
                .forEach((descendant) => {
                    this.PrecedingNodes(descendant).forEach((n) => {
                        callback(n);
                    });
        });

    };

    
    getParentGeneration(movePerson){

        let requiredGeneration = movePerson.GenerationIdx + 1;

        if(this.generations.length > requiredGeneration)
            return this.generations[requiredGeneration];
        
        return;
    };

    createXAxisFromParents = (node, width) => {

        const parentGeneration = this.getParentGeneration(node);  

        const result = { x1: 0.0, x2: 0.0 };
        
        if (!parentGeneration) return result;
        
        const getParentCenterX = (parentIdx) => {
            const parent = parentGeneration[parentIdx];
            return (parent.X1 + parent.X2) / 2;
        };
        
        if (node.FatherIdx === -1) {
            const centerX = getParentCenterX(node.MotherIdx);
            result.x1 = centerX - (width / 2);
            result.x2 = result.x1 + width;
        } else if (node.MotherIdx === -1) {
            const centerX = getParentCenterX(node.FatherIdx);
            result.x1 = centerX - (width / 2);
            result.x2 = result.x1 + width;
        } else {
            const fatherX1 = parentGeneration[node.FatherIdx].X1;
            const motherX2 = parentGeneration[node.MotherIdx].X2;
            const fatherX2 = parentGeneration[node.FatherIdx].X2;
            const motherX1 = parentGeneration[node.MotherIdx].X1;
        
            const parentX1 = Math.min(fatherX1, motherX1);
            const parentX2 = Math.max(fatherX2, motherX2);
        
            result.x1 = ((parentX2 + parentX1) / 2) - ((node.X2 - node.X1) / 2);
            result.x2 = result.x1 + (node.X2 - node.X1);
        }
        
        return result;
    };

    //formerly CalcTPZoom
    SetZoomLevel = (node)=> {                
        const getAreaCategory = (area) => {   
            if (area > 20000) return 7;
            if (area > 15000) return 6;
            if (area > 10000) return 5;
            if (area > 5000) return 4;
            if (area > 2500) return 3;
            if (area >= 1000) return 2;
            if (area > 0) return 1;
            return 0;
        };

        const nodeArea = (node.X2 - node.X1) * (node.Y2 - node.Y1);

        node.zoom = getAreaCategory(nodeArea);
    };
}
