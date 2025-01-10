import {Utils} from "./Utils.js";
import {FDLayout} from "./FDLayout.js";
import {CameraView} from "./CameraView.js";
import {Graph} from "./Graph.js";
import {DrawingDimensions} from "./DrawingDimensions.js";

export function Drawing(channel, graph, renderer, settings, dataSource){
    this.graph = graph;    
    this.settings = settings;
    this.channel = channel;
    this.layouts =[];
    this.dataSource = dataSource;  
    this.renderer = renderer;  
    //this.forceDirect = forceDirect;

    this.energyCount = -9999;
    this.timeActive = 0;
    this.timer=0;
    this.timeInSeconds = 0;
    this.currentYear = 1950;      
    this.topYear= this.dataSource.TopYear;
    this.bottomYear =this.dataSource.BottomYear;
    this.currentYear =this.dataSource.BottomYear;

    this.colourScheme = this.settings.colourScheme;

    this.dims = new DrawingDimensions(window.innerWidth, window.innerHeight);

    this.IsValid = ()=>{return true;}
    this.resetTimer = ()=>{this.timer = 0;}
    this.setTime = (timestamp)=>{

      if (this.timeActive === 0 && !isNaN(timestamp)) {
        this.timeActive = timestamp;        
      }

     // let timeInSeconds = 0;
      // drawingContainer.timer = Math.floor(((drawingContainer.timeActive - drawingContainer.timer)/1000));
      if(!isNaN(timestamp) && timestamp != this.timeActive){

          let step = timestamp - this.timeActive;
          this.timeActive = timestamp; 
          this.timer += Number(step);
          this.timeInSeconds = Math.floor(this.timer/1000);
      }

    }  
}


//init
//add new layout

Drawing.prototype ={
    Init : function(){

        var parentLayout = this.layout = new FDLayout(this.channel, this.graph, this, this.settings, null, null, null,this.dataSource);   
        
        //base layout.
        this.layouts.push({ layout: parentLayout, type: 'parent' });
        this.currentYear = 1950;  
    },

    
    AddLayout : function(parentLayout, entry){
        // adds a node to a parent layout
        // if entry is specified then adds edges/nodes representing 
        // biographical information

        // create a new graph

        var infoGraph = new Graph(this.channel);

        var centreNode = infoGraph.newNode({
            label: '',
            parentId: entry.data.RecordLink.PersonId,
            type: 'infonode'
        });

        

        if (entry.data.RecordLink.Name != '') {
            var nameNode = infoGraph.newNode({
                label: entry.data.RecordLink.Name,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, nameNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DOB != '') {
            var dobNode = infoGraph.newNode({
                label: 'DOB:' + entry.data.RecordLink.DOB,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dobNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DOD != '') {
            var dodNode = infoGraph.newNode({
                label: 'DOD:' + entry.data.RecordLink.DOD,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dodNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.BirthLocation != '') {
            var blocNode = infoGraph.newNode({
                label: 'Born: ' + entry.data.RecordLink.BirthLocation,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, blocNode, { type: 'data', directional: false });
        }

        if (entry.data.RecordLink.DeathLocation != '') {
            var dlocNode = infoGraph.newNode({
                label: 'Died:' + entry.data.RecordLink.DeathLocation,
                parentId: entry.data.RecordLink.PersonId,
                type: 'infonode'
            });

            infoGraph.newEdge(centreNode, dlocNode, { type: 'data', directional: false });
        }

        return new FDLayout(this.channel,infoGraph,
            new CameraView(this.settings.colourScheme, 200, 200), this.settings, entry, parentLayout, centreNode);

    },

    UpdateActiveLayouts : function(){

        var that = this;

        let onScreenList = that.onscreenNodes();
        
        // create a list of the new layouts we need to add
        onScreenList.forEach(node => {
            const nodePresent = that.layouts.some(value => 
                value.type === 'child' && value.layout.parentNode.id === node.id
            );

            if (!nodePresent) {
                that.layouts.push({ layout: that.AddLayout(that.layouts[0].layout, node), type: 'child' });
            }
        });
        
      // Remove the layouts for nodes that are no longer on the screen
        for (let i = that.layouts.length - 1; i >= 0; i--) {
            if (that.layouts[i].type === 'child') {
                const nodePresent = onScreenList.some(node => that.layouts[i].layout.parentNode.id === node.id);

                if (!nodePresent) {
                    that.layouts.splice(i, 1);
                }
            }
        }

        that.layouts.forEach(function(layout, index, ar) {
            // if (layout.layout.graph.eventListeners.length == 0)
            //     layout.layout.graph.addGraphListener(that);
            that.adjustPosition(layout.layout);
            //layout.layout._cameraView.adjustPosition();
        });



    },

    TopLayout: function(){
        return this.layouts[0].layout;
    },

    addToMovementPath: function (x, y) {        
        this.dims.addToMouseQueue(x, y);
    },
   
    adjustPosition: function (layout) {



        if (layout.parentNode == undefined) {
            this.dims.targetBB = layout.getBoundingBox();

            // current gets 20% closer to target every iteration
            this.dims.zoomCurrentBB(this.dims.targetBB, 10);

            while (this.dims.mouseQueue.length > 0) {
                let _point = this.dims.mouseQueue.shift();
                this.dims.SetCentrePoint(_point[0], _point[1]);
            }

            this.dims.UpdatePosition(this.dims.moving);
        }
        else {
            if (layout.parentNode && layout.firstNode) {
                let firstNodePoint = layout.nodePoints[layout.firstNode.id].p;

                let currentUtils = new Utils(this.dims.currentBB, this.dims.graph_width, this.dims.graph_height);

                let screenFirstNode = currentUtils.toScreen(firstNodePoint);

                let parentLayoutCameraView = layout.parentLayout._cameraView;

                let parentUtils = new Utils(parentLayoutCameraView.currentBB, parentLayoutCameraView.graph_width, parentLayoutCameraView.graph_height);

                let parentPoint = layout.parentLayout.nodePoints[layout.parentNode.id].p;

                let screenParentNode = parentUtils.toScreen(parentPoint);

                // add parentlayout centre points !
                this.dims.centrePoint = parentLayoutCameraView.centrePoint + screenParentNode.x - screenFirstNode.x; // (this.graph_width / 2);

                this.dims.centreVerticalPoint = parentLayoutCameraView.centreVerticalPoint + screenParentNode.y - screenFirstNode.y; // (this.graph_height / 2);
            }
        }

    },

    onscreenNodes: function () {

        let maxnumber = this.settings.sublayoutNodeThreshold;
        let sublayoutZoom = this.settings.sublayoutZoom;
        let that = this;
        let countonscreen = 0;
        let onscreenNodes = [];
        let offscreenNodes = [];
        let maxNodes = false;

        if (this.dims.zoompercentage <= sublayoutZoom) {
            return onscreenNodes;
        }


        //console.log('debug');

        this.layout.eachNode(function (node, point) {

            //console.log(node.data.label);
            let _utils = new Utils(that.dims.currentBB, that.dims.graph_width, that.dims.graph_height);

            let x1 = that.dims.mapOffset(_utils.toScreen(point.p)).x;
            let y1 = that.dims.mapOffset(_utils.toScreen(point.p)).y;

            if (that.dims.validToDraw(x1, y1, 0)) {

                if (countonscreen <= maxnumber)
                    onscreenNodes.push(node);

                if (node.data.type == 'normal')
                    countonscreen++;


            }
            else {

                if (!that.dims.validToDraw(x1, y1, 2000)) {
                    if (node.data.type == 'normal')
                        offscreenNodes.push(node);
                }
            }



            // console.log(node.data.label + ' - ' + x1 + ' ' + y1);
        });

        // if there are more nodes on the screen than the max allowed then we arent interested
        if (countonscreen > maxnumber) onscreenNodes = [];

        return onscreenNodes;
    },

    countOnscreenNodes: function () {

        let that = this;
        let countonscreen = 0;
        let onscreenNodes = [];
        let offscreenNodes = [];
        let maxNodes = false;

        this.layout.eachNode(function (node, point) {

            //console.log(node.data.label);
            let _utils = new Utils(that.dims.currentBB, that.dims.graph_width, that.dims.graph_height);

            let x1 = that.dims.mapOffset(_utils.toScreen(point.p)).x;
            let y1 = that.dims.mapOffset(_utils.toScreen(point.p)).y;

            if (that.dims.validToDraw(x1, y1, 0)) {
                onscreenNodes.push(node);
                if (node.data.type == 'normal')
                    countonscreen++;
            }
            else {
                if (!that.dims.validToDraw(x1, y1, 2000)) {
                    if (node.data.type == 'normal')
                        offscreenNodes.push(node);
                }
            }

        });

        return countonscreen;
    }

};
 
