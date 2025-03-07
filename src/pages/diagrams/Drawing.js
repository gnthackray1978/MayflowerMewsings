
export class Drawing {
    constructor(data) {
        this.nodes = data;
        this.drawingX1 = 0.0;
        this.drawingX2 = 0.0;
        this.drawingY1 = 0.0;
        this.drawingY2 = 0.0;
        this.bt_buttonLinks = [];
        this.bt_links = [];
        this.mouse_x = 0;
        this.mouse_y = 0;

        this.bt_refreshData =false;
        this.bt_screenHeight = 0.0;
        this.bt_screenWidth = 0.0;
    }


    
    SetMouse(x, y, mousestate, update) {
        //    console.log('mouse set: ' + x + ' , ' + y);
        this.mouse_x = x;
        this.mouse_y = y;
 
        const mouseLink = this.bt_links.LinkContainingPoint(this.mouse_x, this.mouse_y);

        const buttonLink = this.bt_buttonLinks.LinkContainingPoint(this.mouse_x, this.mouse_y);

        if(update)
            update((mouseLink || buttonLink));
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

    GetPercDistances(mousePoint) {
        let _distanceFromX1 = 0.0;
        let _distanceFromY1 = 0.0;
        let _onePercentDistance = 0.0;

        let percX1 = 0.0;
        let percY1 = 0.0;


        let drawingWidth = this.drawingX2 - this.drawingX1;
        let drawingHeight = this.drawingY2 - this.drawingY1;

        if (drawingWidth !== 0 && drawingHeight !== 0) {
            if (this.drawingX1 > 0) {
                _distanceFromX1 = mousePoint.x - this.drawingX1; //;
            }
            else {
                 _distanceFromX1 = Math.abs(this.drawingX1) + mousePoint.x;
            }

            _onePercentDistance = drawingWidth / 100;
            percX1 = _distanceFromX1 / _onePercentDistance;

            if (this.drawingY1 > 0) {
                _distanceFromY1 = mousePoint.y - this.drawingY1; // ;
            }
            else {
                _distanceFromY1 = Math.abs(this.drawingY1) + mousePoint.y;
            }

            _onePercentDistance = drawingHeight / 100;
            percY1 = _distanceFromY1 / _onePercentDistance;

        }

        return {
            percX1,
            percY1
        };
    }


    CalcAreaLevel(area) {
        let _returnVal = 0;

        if (area > 0 && area < 1000) {
            _returnVal = 1;
        }
        else if (area >= 1000 && area < 2500) {
            _returnVal = 2;
        }
        else if (area >= 2500 && area <= 5000) {
            _returnVal = 3;
        }
        else if (area > 5000 && area <= 10000) {
            _returnVal = 4;
        }
        else if (area > 10000 && area <= 15000) {
            _returnVal = 5;
        }
        else if (area > 15000 && area <= 20000) {
            _returnVal = 6;
        }
        else if (area > 20000) {
            _returnVal = 7;
        }

        return _returnVal;
    }

    CalcZoomLevel(zoomPercentage) {
        let _retVal = 0;

        if (zoomPercentage > 0 && zoomPercentage < 40) {
            _retVal = 1;
        }
        else if (zoomPercentage >= 40 && zoomPercentage < 60) {
            _retVal = 2;
        }
        else if (zoomPercentage >= 60 && zoomPercentage <= 150) {
            _retVal = 3;
        }
        else if (zoomPercentage > 150 && zoomPercentage <= 200) {
            _retVal = 4;
        }
        else if (zoomPercentage > 200 && zoomPercentage <= 250) {
            _retVal = 5;
        }
        else if (zoomPercentage > 250 && zoomPercentage <= 300) {
            _retVal = 6;
        }
        else if (zoomPercentage > 300) {
            _retVal = 7;
        }

        return _retVal;
    }
}
