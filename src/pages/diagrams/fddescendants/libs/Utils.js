import { CssBaseline } from "@mui/material";
import {Vector} from "../types/Vector.js";

export function Utils(currentBB, gwidth, hwidth, colourScheme) {
    this.currentBB = currentBB;
    this.colourScheme = colourScheme;
    this.graph_width = gwidth;
    this.graph_height = hwidth;
}

Utils.prototype = {

    toScreen: function (p) {
        var size = this.currentBB.topright.subtract(this.currentBB.bottomleft);
        var sx = p.subtract(this.currentBB.bottomleft).divide(size.x).x * this.graph_width;
        var sy = p.subtract(this.currentBB.bottomleft).divide(size.y).y * this.graph_height;
        return new Vector(sx, sy);
    },

    fromScreen: function (s) {
        var size = this.currentBB.topright.subtract(this.currentBB.bottomleft);
        var px = (s.x / this.graph_width) * size.x + this.currentBB.bottomleft.x;
        var py = (s.y / this.graph_height) * size.y + this.currentBB.bottomleft.y;
        return new Vector(px, py);
    },
    intersect_line_line: function (p1, p2, p3, p4) {
        var denom = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

        // lines are parallel
        if (denom === 0) {
            return false;
        }

        var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
        var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;

        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false;
        }

        return new Vector(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
    },

    intersect_line_box: function (p1, p2, p3, w, h) {
        var tl = { x: p3.x, y: p3.y };
        var tr = { x: p3.x + w, y: p3.y };
        var bl = { x: p3.x, y: p3.y + h };
        var br = { x: p3.x + w, y: p3.y + h };

        var result;
        if (result == this.intersect_line_line(p1, p2, tl, tr)) { return result; } // top
        if (result == this.intersect_line_line(p1, p2, tr, br)) { return result; } // right
        if (result == this.intersect_line_line(p1, p2, br, bl)) { return result; } // bottom
        if (result == this.intersect_line_line(p1, p2, bl, tl)) { return result; } // left

        return false;
    },

    getLevel: function (count, number, data) {

        var idx = 0;
        var chunk = count / data.length;
        var chunkIdx = chunk;

        var selectedIdx = 0;
        while (idx < data.length) {

            var bottom = chunkIdx - chunk;

            if (number >= bottom && number < chunkIdx) {
                selectedIdx = idx;
            }

            idx++;
            chunkIdx += chunk;
        }

        return data[selectedIdx];
    },

    validDisplayPeriod: function (dob, currentyear, offset) {
        if (!dob) dob = 1600;
        if (!currentyear) currentyear = 1600;
        if (!offset) offset = 0;

        var min = currentyear - offset;
        var max = currentyear + offset;

        return (dob >= min && dob <= max) ? true : false;
    },

    star: function (map, ctx, x, y, r, p, m, filled, type, state) {
        let cs = this.colourScheme;
        //var radgrad = ctx.createRadialGradient(s.x + 2, s.y + 3, 1, s.x + 5, s.y + 5, 5);

        //radgrad.addColorStop(0, '#CCFFFF');
        //radgrad.addColorStop(0.9, 'FFFFFF');
        //radgrad.addColorStop(1, 'rgba(1,159,98,0)');

        var colour = '';

        switch (state) {
            case 1:
                colour = cs.normalMainShapeBackground;
                break;
            case 2:
                colour = cs.nearestMainShapeBackground;
                break;
            case 3:
                colour = cs.selectedMainShapeBackground;
                break;
        }

        ctx.save();


        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, 0 - r);
        for (var i = 0; i < p; i++) {
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - (r * m));
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - r);
        }



        if (filled) {

            ctx.fillStyle = colour;
            ctx.fill();

        }
        {
            ctx.strokeStyle = colour;
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        //whaeever
        ctx.restore();
    },

    drawText: function (map, ctx, x, y, text, type, state) {
        
        let cs = this.colourScheme;

        //boxWidth = node.getWidth();
        //boxHeight = node.getHeight();

        if (!type) type = 'normal';
        if (!state) state = 1;
        if (!text) text = '';

      //  text = text.replace(' ', '');
        // 1 nothing
        // 2 nearest
        // 3 selected

        switch (state) {
            case 1:
                ctx.fillStyle = type == 'normal' ? cs.normalMainLabelBackground : cs.normalInfoLabelBackground;
                break;
            case 2:
                ctx.fillStyle = type == 'normal' ? cs.nearestMainLabelBackground : cs.nearestInfoLabelBackground;
                break;
            case 3:
                ctx.fillStyle = type == 'normal' ? cs.selectedMainLabelBackground : cs.selectedInfoLabelBackground;
                break;
        }

        let boxWidth = ctx.measureText(text).width + 10;

        ctx.fillRect(x, y, boxWidth, 20);

        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        switch (state) {
            case 1:
                ctx.fillStyle = type == 'normal' ? cs.normalMainLabelColour : cs.normalInfoLabelColour;
                break;
            case 2:
                ctx.fillStyle = type == 'normal' ? cs.selectedMainLabelColour : cs.selectedInfoLabelColour;
                break;
            case 3:
                ctx.fillStyle = type == 'normal' ? cs.nearestMainLabelColour : cs.nearestInfoLabelColour;
                break;
        }

        ctx.font = "16px Verdana, sans-serif";



        ctx.fillText(text,x,y);// x - boxWidth / 2 + 5, y - 8);
    }

};
