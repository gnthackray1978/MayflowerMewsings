import { TreeUI } from './drawinglib/treeUI.js';

export class Drawing {
    constructor(graph) {
        this.graph = graph;
        this.nodes = [];
        this.edges = [];
        this.childlessMarriages = [];
        this.centrePoint = 750.0;
        this.centreVerticalPoint = 0.0;
        this.zoomLevel = 0.0;
        this.zoomAmount =7.0;
        this.mouseXPercLocat = 0.0;
        this.mouseYPercLocat = 0.0;
        this.movementx = 0;
        this.movementy = 0;
        this.drawingX1 = 0.0;
        this.drawingX2 = 0.0;
        this.drawingY1 = 0.0;
        this.drawingY2 = 0.0;
        this.bt_buttonLinks = [];
        this.bt_links = [];
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.bt_refreshData = false;
        this.bt_screenHeight = 0.0;
        this.bt_screenWidth = 0.0;
        this.layout = null;
        this.refreshLayout = () => {
            console.log('not set - it should be overridden');
        };
    }

    CreateWithDefaultValues(personId, data) {
    }

    SetMovementX(x) {
        this.movementx = x;
    }

    SetMovementY(y) {
        this.movementy = y;
    }

    SetInitialValues(zoomPerc, dist_bet_box, dist_bet_gen, box_wid, box_hig, dist_bet_fam, low_stalk_hi, mid_span, top_span, screen_width, screen_height) {
        this.zoomPercentage = zoomPerc;
        this.layout.init(dist_bet_box, dist_bet_gen, box_wid, box_hig, dist_bet_fam, low_stalk_hi, mid_span, top_span);
        this.bt_screenWidth = screen_width;
        this.bt_screenHeight = screen_height;
    }

    SetZoom(delta) {
        const x = this.bt_screenWidth / 2;
        const y = this.bt_screenHeight / 2;

        this.SetMouse(x, y);
 
        const before = this.GetPercDistances2();

        if (delta !== 0.0) {
        
            this.zoomPercentage += delta;
            this.zoomLevel += delta;
           
            this.layout.zoomLayoutProps(this.zoomPercentage);

            this.refreshLayout();

            const after = this.GetPercDistances2();
 
            const drawingHeight = this.drawingY2 - this.drawingY1;
            const drawingWidth = this.drawingX2 - this.drawingX1;


            this.centreVerticalPoint += (drawingHeight / 100) * (after.y - before.y);

            this.centrePoint += (drawingWidth / 100) * (after.x - before.x);

           
            this.refreshLayout();
        }
    }

    SetMouse(x, y, update) {
        this.mouse_x = x;
        this.mouse_y = y;
        if (update) {
            const mouseLink = this.bt_links.LinkContainingPoint(this.mouse_x, this.mouse_y);
            const buttonLink = this.bt_buttonLinks.LinkContainingPoint(this.mouse_x, this.mouse_y);
            update((mouseLink || buttonLink));
        }
    }

    GetPercDistances2() {
        const drawingWidth = this.drawingX2 - this.drawingX1;
        const drawingHeight = this.drawingY2 - this.drawingY1;
        if (drawingWidth === 0 || drawingHeight === 0) return { x: 0, y: 0 };
        const dx = this.mouse_x - this.drawingX1;
        const dy = this.mouse_y - this.drawingY1;
        return {
            x: dx / (drawingWidth / 100),
            y: dy / (drawingHeight / 100)
        };
    }

    CalcAreaLevel(area) {
        if (area > 0 && area < 1000) {
            return 1;
        }
        if (area >= 1000 && area < 2500) {
            return 2;
        }
        if (area >= 2500 && area <= 5000) {
            return 3;
        }
        if (area > 5000 && area <= 10000) {
            return 4;
        }
        if (area > 10000 && area <= 15000) {
            return 5;
        }
        if (area > 15000 && area <= 20000) {
            return 6;
        }
        if (area > 20000) {
            return 7;
        }
        return 0;
    }

    CalcZoomLevel(zoomPercentage) {
        if (zoomPercentage > 0 && zoomPercentage < 40) {
            return 1;
        }
        if (zoomPercentage >= 40 && zoomPercentage < 60) {
            return 2;
        }
        if (zoomPercentage >= 60 && zoomPercentage <= 150) {
            return 3;
        }
        if (zoomPercentage > 150 && zoomPercentage <= 200) {
            return 4;
        }
        if (zoomPercentage > 200 && zoomPercentage <= 250) {
            return 5;
        }
        if (zoomPercentage > 250 && zoomPercentage <= 300) {
            return 6;
        }
        if (zoomPercentage > 300) {
            return 7;
        }
        return 0;
    }

    SetNodeZoomLevel(node) {
        const nodeArea = (node.X2 - node.X1) * (node.Y2 - node.Y1);
        node.zoom = this.CalcAreaLevel(nodeArea);
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

    IsValid() {
        return this.nodes.length > 0;
    }

    
}