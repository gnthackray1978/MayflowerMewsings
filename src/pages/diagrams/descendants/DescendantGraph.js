export class DescendantGraph {
    constructor(data) {
        this.nodes = data;
        this.original_distanceBetweenBoxs = 0.0;
        this.original_distanceBetweenGens = 0.0;
        this.original_boxWidth = 0.0;
        this.original_boxHeight = 0.0;
        this.original_distancesbetfam = 0.0;
        this.original_lowerStalkHeight = 0.0;
        this.original_middleSpan = 40.0;
        this.original_topSpan = 20.0;
    }
    getTreePerson(personId) {
        for (let generation of this.nodes) {
            for (let person of generation) {
                if (person.PersonId === personId) {
                    return person;
                }
            }
        }
        return null;
    }
    SetVisibility(parent, isDisplay) {
        let personStack = [];
        parent.Children.forEach(child => {
            personStack.push(child);
        });
        while (personStack.length > 0) {
            let currentTP = personStack.pop();
            currentTP.IsDisplayed = isDisplay;
            currentTP.Spouses.forEach(spouse => {
                spouse.IsDisplayed = isDisplay;
            });
            currentTP.Children.forEach(child => {
                personStack.push(child);
            });
        }
    }
    GetChildDisplayStatus(person) {
        let isDisplayed = true;
        if (this.nodes.length > person.GenerationIdx) {
            let _genidx = 0;
            while (_genidx < this.nodes[person.GenerationIdx].length) {
                if (this.nodes[person.GenerationIdx][_genidx].PersonId == person.ChildLst[0]) {
                    var _person = this.nodes[person.GenerationIdx][_genidx];
                    isDisplayed = _person.IsDisplayed;
                    break;
                }
                _genidx++;
            }
        }
        return isDisplayed;
    }
}
