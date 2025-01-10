
//import { settings } from "shared/common.js";
import {Vector} from "../types/Vector.js";
import {Utils} from "./Utils.js";
import {DrawingDimensions} from "./DrawingDimensions.js";



export function CameraView(colourScheme, startwidth, startheight) {

    this.layout = null;
    this.colourScheme = colourScheme;
    this.dims = new DrawingDimensions(startwidth, startheight);

}

CameraView.prototype = {
    
    addToMovementPath: function (x, y) {        
        this.dims.addToMouseQueue(x, y);
    },
   
    adjustPosition: function () {



        if (this.layout.parentNode == undefined) {
            this.dims.targetBB = this.layout.getBoundingBox();

            // current gets 20% closer to target every iteration
            this.dims.zoomCurrentBB(this.dims.targetBB, 10);

            while (this.dims.mouseQueue.length > 0) {
                let _point = this.dims.mouseQueue.shift();
                this.dims.SetCentrePoint(_point[0], _point[1]);
            }

            this.dims.UpdatePosition(this.dims.moving);
        }
        else {
            if (this.layout.parentNode && this.layout.firstNode) {
                let firstNodePoint = this.layout.nodePoints[this.layout.firstNode.id].p;

                let currentUtils = new Utils(this.dims.currentBB, this.dims.graph_width, this.dims.graph_height);

                let screenFirstNode = currentUtils.toScreen(firstNodePoint);

                let parentLayoutCameraView = this.layout.parentLayout._cameraView;

                let parentUtils = new Utils(parentLayoutCameraView.currentBB, parentLayoutCameraView.graph_width, parentLayoutCameraView.graph_height);

                let parentPoint = this.layout.parentLayout.nodePoints[this.layout.parentNode.id].p;

                let screenParentNode = parentUtils.toScreen(parentPoint);

                // add parentlayout centre points !
                this.dims.centrePoint = parentLayoutCameraView.centrePoint + screenParentNode.x - screenFirstNode.x; // (this.graph_width / 2);

                this.dims.centreVerticalPoint = parentLayoutCameraView.centreVerticalPoint + screenParentNode.y - screenFirstNode.y; // (this.graph_height / 2);
            }
        }

    },

    onscreenNodes: function (settings) {

        let maxnumber = settings.sublayoutNodeThreshold;
        let sublayoutZoom = settings.sublayoutZoom;
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
