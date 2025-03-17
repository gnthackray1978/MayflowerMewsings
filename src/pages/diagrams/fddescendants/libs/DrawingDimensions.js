import {Vector} from "../types/Vector.js";
import {Utils} from "./Utils.js";

export class DrawingDimensions {
    constructor( startwidth, startheight) {
        
        this.currentBB = null; // layout.getBoundingBox();
        // this.targetBB = null;
        this.targetBB = { bottomleft: new Vector(-2, -2), topright: new Vector(2, 2) };
        // graph size
        this.original_graph_width = startwidth;
        this.original_graph_height = startheight;

        // graph size
        this.graph_width = this.original_graph_width;
        this.graph_height = this.original_graph_height;

        //display size
        this.display_width = window.innerWidth + 500;
        this.display_height = window.innerHeight + 500;

        //save screen width/height
        this.bt_screenHeight = screen.height;
        this.bt_screenWidth = screen.width;

        //positional controls
        this.centrePoint = 0;
        this.centreVerticalPoint = 0;
        this.zoomOffset = 0;

        this.centrePointXOffset = 0.0;
        this.centrePointYOffset = 0.0;

        this.mouse_x = 0;
        this.mouse_y = 0;

        // queue of points to move graph to
        this.mouseQueue = [];

        this.mouseXPercLocat = 0.0;
        this.mouseYPercLocat = 0.0;

        this.percX1 = 0.0;
        this.percY1 = 0.0;

        // zoom level
        this.zoompercentage = 0;

        //info tracker
        this.infoDisplayed = [];


        this.movementx = 0;
        this.movementy = 0;
        this.zoomVelocity = 0;
    }
 
    SetCentrePoint(param_x, param_y) {
        
        if (param_x == 1000000 && param_y == 1000000) {
            this.centrePointXOffset = 0;
            this.centrePointYOffset = 0;
        }
        else {
            if (this.centrePointXOffset === 0) {
                this.centrePointXOffset = this.centrePoint - param_x;
            }
            else {

                this.centrePoint = param_x + this.centrePointXOffset;
            }
            if (this.centrePointYOffset === 0) {
                this.centrePointYOffset = this.centreVerticalPoint - param_y;
            }
            else {

                this.centreVerticalPoint = param_y + this.centrePointYOffset;
            }
        }
    }

    GetPercDistances() {


        let _distanceFromX1 = 0.0;
        let _distanceFromY1 = 0.0;
        let _onePercentDistance = 0.0;

        this.percX1 = 0.0;
        this.percY1 = 0.0;

        if (this.graph_width !== 0 && this.graph_height !== 0) {
            if (this.centrePoint > 0) {
                _distanceFromX1 = this.mouse_x - this.centrePoint; //;
            }
            else {
                _distanceFromX1 = Math.abs(this.centrePoint) + this.mouse_x;
            }

            _onePercentDistance = this.graph_width / 100;
            this.percX1 = _distanceFromX1 / _onePercentDistance;

            if (this.centreVerticalPoint > 0) {
                _distanceFromY1 = this.mouse_y - this.centreVerticalPoint; // ;
            }
            else {
                _distanceFromY1 = Math.abs(this.centreVerticalPoint) + this.mouse_y;
            }

            _onePercentDistance = this.graph_height / 100;
            this.percY1 = _distanceFromY1 / _onePercentDistance;

        }


    }

    zoomCurrentBB(targetBB, amount) {
        this.currentBB = {
            bottomleft: this.currentBB.bottomleft.add(targetBB.bottomleft.subtract(this.currentBB.bottomleft)
                .divide(amount)),
            topright: this.currentBB.topright.add(targetBB.topright.subtract(this.currentBB.topright)
                .divide(amount))
        };
    }

    SetZoomStart () {
        this.GetPercDistances();
        this.mouseXPercLocat = this.percX1;
        this.mouseYPercLocat = this.percY1;
    }

    currentPositionFromScreen (pos) {
        let utils = new Utils(this.currentBB, this.graph_width, this.graph_height);
        let p = utils.fromScreen({ x: (pos.pageX - this.centrePoint) - pos.left, y: (pos.pageY - this.centreVerticalPoint) - pos.top });
        return p;
    }


    UpdateLocation () {

        let increment = 2;

        if (this.movementy == -1) {    
            
            this.centreVerticalPoint -= increment;
            console.log('movementy:'+ this.centreVerticalPoint);        
        }
        if (this.movementy == 1) {
            this.centreVerticalPoint += increment;
            console.log('movementy:'+ this.centreVerticalPoint);        
        }
        if (this.movementx == -1) {
            this.centrePoint += increment;
            console.log('movementx:'+ this.centrePoint);        
        }
        if (this.movementx == 1) {
            this.centrePoint -= increment;
            console.log('movementx:'+ this.centrePoint);
        }

        if (this.zoomVelocity!==0) {

            this.mouse_x = this.bt_screenWidth / 2;
            this.mouse_y = this.bt_screenHeight / 2;

            this.GetPercDistances();

            this.mouseXPercLocat = this.percX1;
            this.mouseYPercLocat = this.percY1;

            // zero the centre point
            this.SetCentrePoint(1000000, 1000000);

            if (this.zoomVelocity >0) {
                this.graph_width += 50;
                this.graph_height += 50;
            } else {
                this.graph_width -= 50;
                this.graph_height -= 50;
            }

            this.GetPercDistances();


            //console.log('y zoom ' + percY1 + ' ' + mouseYPercLocat);
            this.centreVerticalPoint += (this.graph_height / 100) * (this.percY1 - this.mouseYPercLocat);
            //console.log('x zoom ' + percX1 + ' ' + mouseXPercLocat);

            this.centrePoint += (this.graph_width / 100) * (this.percX1 - this.mouseXPercLocat);
        }

  
        let old_area = this.original_graph_width * this.original_graph_height;
        let new_area = this.graph_width * this.graph_height;
        this.zoompercentage = (new_area - old_area) / old_area * 100;

     //   $('#map_zoom').html(Math.round(this.zoompercentage));
    //    $('#map_X').html(Math.round(this.centrePoint));
     //   $('#map_Y').html(Math.round(this.centreVerticalPoint));
    }

    currentPositionToScreen(pos, e) {
        let utils = new Utils(this.currentBB, this.graph_width, this.graph_height);
        let p = utils.toScreen({ x: (e.pageX - this.centrePoint) - pos.left, y: (e.pageY - this.centreVerticalPoint) - pos.top });
        return p;
    }

    addToMouseQueue (x, y) {
        let _point = new Array(x, y);
        this.mouseQueue[this.mouseQueue.length] = _point;
    }

    validToDraw(x1, y1, margin) {

        let validDraw = true;

        if (margin == undefined) margin = 500;

        if (x1 > (this.display_width + margin)) validDraw = false;
        if (x1 < (0 - margin)) validDraw = false;

        if (y1 > (this.display_height + margin)) validDraw = false;
        if (y1 < (0 - margin)) validDraw = false;

        return validDraw;
    }

    mapOffset (v1) {

        v1.x += this.centrePoint;
        v1.y += this.centreVerticalPoint;

        return v1;
    }

}
