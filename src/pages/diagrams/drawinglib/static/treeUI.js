import plusImg from '../../../../../public/Assets/plus.png';
import minusImg from '../../../../../public/Assets/minus.png';


const descendantConfig = {
    backgroundcolour : 'black',
    linecolour : '#99CCFF',
    textcolour :'black',
    spousecolour :'slateblue'
};
const ancestorConfig = {
    backgroundcolour : 'white',
    linecolour : 'black',
    textcolour :'black',
    spousecolour :'slateblue'
};



String.prototype.yearDate = function () {

    // var str = "abt 1978 between 1943";
    var pattern = /[1][5-9][0-9][0-9]+/g;

    if (this.match == undefined)
        this.match = function (pat) {
            return true;
        };

    var matches = this.match(pattern);

    if (matches != null && matches.length > 0) {
        return Number(matches[0]);
    } else {
        return 0;
    }
};

Array.prototype.ContainsRec = function(_rec) {

    for (var i = 0; i < this.length; i++) {

        if (this[i].latx == _rec.latx &&
            this[i].laty == _rec.laty &&
            this[i].boxlen == _rec.boxlen) {
            return true;
        }
    }
    return false;

};

//remove invalid selections from an array
Array.prototype.RemoveInvalid = function(selection) {
    var filteredArray = new Array();
    for (var si = 0; si < selection.length; si++) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == selection[si]) {
                filteredArray.push(this[i]);
                break;
            }
        }
    }
    return filteredArray;
};

Array.prototype.LinkContainingPoint = function (mx,my) {

    for (var i = 0; i < this.length; i++) {

        if ((this[i].x1 <= mx && this[i].x2 >= mx)
        && (this[i].y1 <= my && this[i].y2 >= my))
        {
            return this[i];
        }
    }



    return null;

};




export class TreeUI {


    constructor(ctx, uiConfig, isAnc, callback){

        this.docClose = new Image();
        this.docNew = new Image();
        this.modelCode = isAnc;
        
        this._ctx = ctx;
        this._uiConfig = uiConfig;
  
//         if (this.modelCode == 0) {
//             // descendants
//             this.backgroundcolour = 'black';
//             this.linecolour = '#99CCFF';
//             this.textcolour = 'black';// 'white';
//             this.spousecolour = 'slateblue';
  
//       //      $("#map_control").removeClass("ancestorstyle").addClass("descendantstyle");
//    //        $("#map_label").removeClass("ancestorstyle").addClass("descendantstyle");
  
//         }
//         else {
  
//             this.backgroundcolour = 'white';
//             this.linecolour = 'black';
//             this.textcolour = 'black';
//             this.spousecolour = 'slateblue';
  
//        //     $("#map_control").removeClass("descendantstyle").addClass("ancestorstyle");
//       //      $("#map_label").removeClass("descendantstyle").addClass("ancestorstyle");
  
//         }
  
        this.docClose.src = plusImg;
  
        var that = this;
        this.docClose.onload = function () {
            that.docNew.src = minusImg;
  
            that.docNew.onload = function () {
                callback(that);
            };
  
        };
    }

    //code from here moved to constructor
    // Init(isAnc, callback){

    // }

    // UpdateUI (screen_width, screen_height, box_width, box_height) {

    //     this.screen_width = screen_width;
    //     this.screen_height = screen_height;
    //     // this.canvas = document.getElementById("myCanvas");


    //     // this.context = this.canvas.getContext("2d");

    //     this.boxWidth = box_width;
    //     this.boxHeight = box_height;
    // }

    ClearScreen(){
        let ctx = this._ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#000000';
    }

    DrawLine(width,height, points) {

        let ctx = this._ctx;
        let uiConfig = this._uiConfig;

        let _pointIdx = 0;
        ctx.beginPath();
        let _validLine = false;
        let _sx1 = -100; //screen left
        // var _sx2 = this.screen_width + 100; // screen right
        let _sx2 = width +100;
        let _sy1 = -100;
        //var _sy2 = this.screen_height + 100;
        let _sy2 = height + 100;

        while (_pointIdx < points.length) {
            let _Point = points[_pointIdx];


            if (((_Point[0] > _sx1) && (_Point[0] < _sx2)) && ((_Point[1] > _sy1) && (_Point[1] < _sy2))) {
                _validLine = true;
                break;
            }

            // but its also valid if line crosses the screen!
            if (_pointIdx > 0 && !_validLine) {
                let _prevPoint = points[_pointIdx - 1];
                if ((_prevPoint[0] > _sx1 && _prevPoint[0] < _sx2 && _Point[0] > _sx1 && _Point[0] < _sx2) && ((_prevPoint[1] < _sy2 && _Point > _sy2) || (_prevPoint[1] < _sy1 && _Point[1] > _sy2))) _validLine = true;
                if ((_prevPoint[1] > _sy1 && _prevPoint[1] < _sy2 && _Point[1] > _sy1 && _Point[1] < _sy2) && ((_prevPoint[0] < _sx2 && _Point > _sx2) || (_prevPoint[0] < _sx1 && _Point[0] > _sx1))) _validLine = true;

                if (_validLine)
                    break;
            }

            _pointIdx++;
        }


        if (_validLine) {
            _pointIdx = 0;
            while (_pointIdx < points.length) {
                let _Point = points[_pointIdx];
                if (_pointIdx === 0) {
                    ctx.moveTo(_Point[0], _Point[1]);
                }
                else {
                    ctx.lineTo(_Point[0], _Point[1]);
                }
                _pointIdx++;
            }

            ctx.globalAlpha = 0.5;
            ctx.lineWidth = 2;

            ctx.strokeStyle = uiConfig.linecolour;

            ctx.stroke();
        }


    }

    DrawButton (width, height, _person, checked) {

        let ctx = this._ctx;
        let uiConfig = this._uiConfig;

        var linkArea = { x1: 0, x2: 0, y1: 0, y2: 0, action: 'box' };
        //
        if (_person.IsDisplayed &&
                    _person.X2 > 0 &&
                 //   _person.X1 < this.screen_width &&
                    _person.X1 < width &&
                    _person.Y2 > -100 &&
                    //_person.Y1 < this.screen_height &&
                    _person.Y1 < height &&
                    _person.ChildLst.length > 0 &&
                    _person.zoom >= 3 &&
                    !_person.IsHtmlLink
                    ) {

            // this doesnt correspond to the isdisplayed person of the property
            // because obviously the we want the parent to stay visible so we
            // can turn on and off the childrens visibility. if we cant see it , we cant turn anything on and off..
            if (checked) {
                ctx.fillStyle = "red";
                ctx.drawImage(this.docClose, _person.X1 - 10, _person.Y1 + 5);
            }
            else {
                ctx.fillStyle = "black";
                ctx.drawImage(this.docNew, _person.X1 - 10, _person.Y1 + 5);
            }


            linkArea.y1 = _person.Y1 + 5;
            linkArea.x1 = _person.X1 - 10;

            linkArea.y2 = _person.Y1 + 30;
            linkArea.x2 = _person.X1 + 10;

            linkArea.action = _person.PersonId + "," + String(checked);
        }
        else {
            linkArea = null;
        }
        return linkArea;

    }

    DrawPerson ( _person,width, height, sourceId, zoomPerc) {

        let ctx = this._ctx;
        let uiConfig = this._uiConfig;


        var xoffset = 0;

        var linkArea = { x1: 0, x2: 0, y1: 0, y2: 0, action: '' };

        if (_person.IsDisplayed &&
                    _person.X2 > 0 &&
                    _person.X1 < width &&
                    _person.Y2 > -100 &&
                    _person.Y1 < height) {


            ctx.beginPath();


            //   ctx.rect(_person.X1, _person.Y1, this.boxWidth, this.boxHeight);

            if (_person.zoom >= 1000) {
                var rectX = _person.X1;
                var rectY = _person.Y1;
                var rectWidth = Math.abs(_person.X2 - _person.X1);
                var rectHeight = Math.abs(_person.Y2 - _person.Y1);
                var radius = 10;
                ctx.strokeStyle = "#99003A";
                ctx.lineWidth = 2;
                this.RoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, radius);
            }
            else {
                if (this.modelCode == 1) {
                    //boxs
                    xoffset = 3;

                    ctx.rect(_person.X1, _person.Y1, Math.abs(_person.X2 - _person.X1), Math.abs(_person.Y2 - _person.Y1));


                    ctx.fillStyle = uiConfig.backgroundcolour;
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = uiConfig.linecolour;
                    ctx.stroke();

                }
                else {
                    xoffset = 16;
                    //lines
                    let halfwidth = Math.abs(_person.X2 - _person.X1) / 2;
                    let middlebox = _person.X1 + halfwidth;



                    //middle of box
                    if ((_person.ChildCount > 0 || _person.SpouseIdLst.length> 0) && !_person.IsHtmlLink) {
                    //
                        // ctx.beginPath();

                        if (_person.GenerationIdx == 0) {

                            ctx.moveTo(middlebox, _person.Y2 - 7);
                            ctx.lineTo(middlebox, _person.Y2);
                            ctx.closePath();
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.lineWidth = 7;
                        }
                        else {

                            ctx.moveTo(middlebox, _person.Y1);
                            ctx.lineTo(middlebox, _person.Y2);
                            ctx.closePath();
                            ctx.fill();
                            ctx.globalAlpha = 0.5;
                            ctx.lineWidth = 2;


                        }




                    }
                    else {

                        if (!_person.IsHtmlLink) {

                            ctx.moveTo(middlebox, _person.Y1);
                            ctx.lineTo(middlebox, _person.Y1 + 7);
                        }
                        else {
                            ctx.moveTo(middlebox, _person.Y2 - 7);
                            ctx.lineTo(middlebox, _person.Y2);
                        }

                        ctx.closePath();
                        ctx.fill();
                        ctx.globalAlpha = 0.9;
                        ctx.lineWidth = 7;


                    }

                    ctx.strokeStyle = uiConfig.linecolour;
                    ctx.stroke();
                }


            }


            ctx.globalAlpha = 1.0;

            var linespacing = 15;

            if (_person.zoom >= 7) {
                linespacing = 30;

            }


            var _y = this.WriteName(ctx,_person.X1 + xoffset, _person.Y1 + 19, _person, 0);

            if (_person.IsHtmlLink) {
                linkArea.y1 = _person.Y1;
                linkArea.x1 = _person.X1 + xoffset;
                linkArea.y2 = _y - linespacing;
                linkArea.x2 = _person.X2;
                linkArea.action = _person.PersonId;
            }
            else {
                linkArea = null;
            }

            ctx.font = "8pt Calibri";
            ctx.fillStyle = uiConfig.textcolour;

            switch (_person.zoom) {

                case 4: //show name
                    ctx.fillText("DOB: " + _person.RecordLink.DOB, _person.X1 + xoffset, _y);
                    _y += linespacing;
                    if (_y <= _person.Y2 - 10) {
                        _y = this.WriteBLocation(ctx, _person.X1 + xoffset, _y, _person, 1); //+ linespacing
                    }
                    break;
                case 5: //show name
                case 6:
                case 7:
                case 8:

                    ctx.fillText("Dob: " + _person.RecordLink.DOB, _person.X1 + xoffset, _y);
                    _y += linespacing;

                    if (_y <= _person.Y2 - 10) {
                        _y = this.WriteBLocation(ctx, _person.X1 + xoffset, _y, _person, 2); //+ linespacing
                    }

                    if (_y <= _person.Y2 - 10) {
                        ctx.fillText("Dod: " + _person.RecordLink.DOD, _person.X1 + xoffset, _y);

                        _y += linespacing;

                        this.WriteDLocation(ctx,_person.X1 + xoffset, _y, _person, 2);
                    }
                    break;

            }
        }

        //typically used in descendanttree drawtree method
        //adds to basetree links collection
        return linkArea;

    }

    RoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.stroke();
    }

    WriteName(ctx,xpos, ypos, _person, maxlines) {
        let uiConfig = this._uiConfig;
        ctx.font = "bold 8pt Calibri";

        if (_person.IsHtmlLink) {
            //this.context.fillStyle = "#1600BF";
            ctx.fillStyle = uiConfig.spousecolour;
        }
        else {
            ctx.fillStyle = uiConfig.textcolour;
        }

        let _textToDisplay = this.MakeArray(_person, _person.RecordLink.Name);
        let _y = ypos;

        let linespacing = 15;

        if (maxlines === 0 || _textToDisplay.length <= maxlines) {
            maxlines = _textToDisplay.length;
        }

        for (var i = 0; i < maxlines; i++) {
            ctx.fillText(_textToDisplay[i], xpos, _y);
            _y += linespacing;
        }

        //reset to black.
        ctx.font = "8pt Calibri";
        ctx.fillStyle = "black";
        return _y;
    }


    WriteBLocation(ctx, xpos, ypos, _person, maxlines) {
        let uiConfig = this._uiConfig;
        ctx.font = "8pt Calibri";
        ctx.fillStyle = uiConfig.textcolour;

        _person.RecordLink.BirthLocation = _person.RecordLink.BirthLocation.replace(",", " ");
        _person.RecordLink.BirthLocation = _person.RecordLink.BirthLocation.replace("  ", " ");

        let _textToDisplay = this.MakeArray(_person, _person.RecordLink.BirthLocation);
        let _y = ypos;

        let linespacing = 15;


        if (maxlines === 0 || _textToDisplay.length <= maxlines) {
            maxlines = _textToDisplay.length;
        }


        for (let i = 0; i < maxlines; i++) {
            ctx.fillText(_textToDisplay[i], xpos, _y);
            _y += linespacing;
        }
        return _y;
    }



    WriteDLocation(ctx, xpos, ypos, _person, maxlines) {
        let uiConfig = this._uiConfig;

        ctx.font = "8pt Calibri";
        ctx.fillStyle = uiConfig.textcolour;

        var _textToDisplay = this.MakeArray(_person, _person.RecordLink.DeathLocation);

        var _y = ypos;

        var linespacing = 15;

        if (maxlines === 0 || _textToDisplay.length <= maxlines) {
            maxlines = _textToDisplay.length;
        }

        for (var i = 0; i < maxlines; i++) {
            if (_y < _person.Y2 - 10) {
                ctx.fillText(_textToDisplay[i], xpos, _y);
                _y += linespacing;
            }
        }
        return _y;
    }

    MakeArray(person, parseStr) {

        var name = '';
        var nameAr = [];
        var i = 0;
        var character_width = 3;
        var max_text_width = Math.abs(person.X2 - person.X1);
        var max_char_count = max_text_width / character_width;

        switch (person.zoom) {

            case 1:
                nameAr.push('');
                break;
            case 2:

                if (parseStr !== '') {
                    var parts = parseStr.split(' ');

                    for (i = 0; i < parts.length; i++) {

                        if (parts[i].length > 0)
                            name += parts[i].slice(0, 1) + " ";
                    }
                }
                nameAr.push(name);
                break;
            case 3:
            case 4:
            case 5:
            case 6:

                nameAr = parseStr.split(' ');

                for (i = 0; i < nameAr.length; i++) {

                    if ((nameAr[i].length * character_width) > max_text_width)
                        nameAr[i] = nameAr[i].slice(0, max_char_count - 1) + " ";
                }
                break;
            case 7:
            case 8:
                nameAr.push(parseStr);
                break;
        }

        return nameAr;
    }

    static WireUp(runner){
      $("#myCanvas").unbind();
      $(".button_box").unbind();

      $(".button_box").mousedown(function (evt) {
          var _dir = '';

          if (evt.target.id == "up") _dir = 'UP';
          if (evt.target.id == "dn") _dir = 'DOWN';
          if (evt.target.id == "we") _dir = 'WEST';
          if (evt.target.id == "no") _dir = 'NORTH';
          if (evt.target.id == "es") _dir = 'EAST';
          if (evt.target.id == "so") _dir = 'SOUTH';
          if (evt.target.id == "de") _dir = 'DEBUG';

          runner.movebuttondown(_dir);

      }).mouseup(function () {
          runner.movebuttonup();
      });

      $("#myCanvas").mousedown(function (evt) {
          evt.preventDefault();
          evt.originalEvent.preventDefault();
          runner.canvasmousedown();
      });

      $("#myCanvas").mouseup(function (evt) {
        evt.preventDefault();
        runner.canvasmouseup();
      });

      $("#myCanvas").click(function (evt) {
        var boundingrec = document.getElementById("myCanvas").getBoundingClientRect();
        runner.canvasclick(evt.clientX ,boundingrec.left, evt.clientY , boundingrec.top);
      });

      $("#myCanvas").mousemove(function (evt) {
         var boundingrec = document.getElementById("myCanvas").getBoundingClientRect();
         runner.canvasmove(evt.clientX ,boundingrec.left, evt.clientY , boundingrec.top);
      });
    }
}
