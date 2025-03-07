// this.descGraph.original_distanceBetweenBoxs = dist_bet_box;
// this.descGraph.original_distanceBetweenGens = dist_bet_gen;
// this.descGraph.original_boxWidth = box_wid;
// this.descGraph.original_boxHeight = box_hig;
// this.descGraph.original_distancesbetfam = dist_bet_fam;
// this.descGraph.original_lowerStalkHeight = low_stalk_hi;
// this.descGraph.original_middleSpan = mid_span;
// this.descGraph.original_topSpan = top_span;

export class DescendantLayout {
    constructor() {
        this.initial_layout_state = {
            distanceBetweenBoxs: 0.0,
            distanceBetweenGens: 0.0,
            boxWidth: 0.0,
            boxHeight: 0.0,
            distancesbetfam: 0.0,
            lowerStalkHeight: 0.0,
            middleSpan: 40.0,
            topSpan: 20.0
        };

        this.distanceBetweenBoxs = 0.0;
        this.distanceBetweenGens = 0.0;
        this.distancesbetfam = 0.0;
        this.adjustedDistances = [];
        this.adjustedBoxWidths = [];
        this.adjustedBoxHeights = [];
        this.boxWidth = 0.0;
        this.boxHeight = 0.0;
        this.halfBox = 0.0;
        this.halfBoxHeight = 0.0;
        this.lowerStalkHeight = 0.0;
        this.middleSpan = 0.0;
        this.topSpan = 0.0;
    }

    setBoxWidth(movePerson) {
        if (this.adjustedBoxWidths.length > movePerson.GenerationIdx) {
            this.boxWidth = this.adjustedBoxWidths[movePerson.GenerationIdx];
        } else {
            this.boxWidth = this.boxWidth;
        }
    }

    zoomLayoutProps(zoomPercentage) {
         let _workingtp = 0.0; 
     
         _workingtp = this.initial_layout_state.distanceBetweenBoxs / 100;
         this.distanceBetweenBoxs = _workingtp * zoomPercentage;

        _workingtp = this.initial_layout_state.boxWidth / 100;
        this.boxWidth = _workingtp * zoomPercentage;
        this.halfBox = this.boxWidth / 2;

        //_workingtp = this.descGraph.original_distancesbetfam / 100;
        _workingtp = this.initial_layout_state.distancesbetfam / 100;
        this.distancesbetfam = _workingtp * zoomPercentage;

        _workingtp = this.initial_layout_state.distanceBetweenGens / 100;

        this.distanceBetweenGens = _workingtp * zoomPercentage; 

        _workingtp = this.initial_layout_state.boxHeight / 100;

        this.boxHeight = _workingtp * zoomPercentage;

        this.halfBoxHeight = this.boxHeight / 2;
    }

    changeGenScale(nodes, node, percentageLess) {
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
    }

    init(dist_bet_box, dist_bet_gen, box_wid, box_hig, dist_bet_fam, low_stalk_hi, mid_span, top_span) {
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
