import {Vector} from "../types/Vector.js";
import {Utils} from "./Utils.js";

export class RenderLib{

  constructor(graph,settings){
    this.graph = graph;
    this.settings = settings;
  
  }
  clear(ctx, cameraView) {
      ctx.clearRect(0, 0, cameraView.graph_width, cameraView.graph_height);
  }

  drawEdges(ctx,dims, edge, p1, p2) {

      var _utils = new Utils(dims.currentBB, dims.graph_width, dims.graph_height, this.settings.colourScheme);
      let colourScheme =  this.settings.colourScheme;

      var x1 = dims.mapOffset(_utils.toScreen(p1)).x;
      var y1 = dims.mapOffset(_utils.toScreen(p1)).y;

      var x2 = dims.mapOffset(_utils.toScreen(p2)).x;
      var y2 = dims.mapOffset(_utils.toScreen(p2)).y;


      if (!dims.validToDraw(x1, y1) && !dims.validToDraw(x2, y2)) return;

      if (edge.data.type == 'data' && colourScheme.infoLineColour == colourScheme.mapbackgroundColour) {
          return;
      }


      var direction = new Vector(x2 - x1, y2 - y1);

      // negate y
      var normal = direction.normal().normalise();


      var from = this.graph.getEdges(edge.source, edge.target);
      var to = this.graph.getEdges(edge.target, edge.source);

      var total = from.length + to.length;

      // Figure out edge's position in relation to other edges between the same nodes
      var n = 0;
      for (var i = 0; i < from.length; i++) {
          if (from[i].id === edge.id) {
              n = i;
          }
      }

      var spacing = 6.0;

      // Figure out how far off center the line should be drawn
      var offset = normal.multiply(-((total - 1) * spacing) / 2.0 + (n * spacing));


      var s1 = dims.mapOffset(_utils.toScreen(p1).add(offset));
      var s2 = dims.mapOffset(_utils.toScreen(p2).add(offset));


      var boxWidth = edge.target.getWidth(ctx);
      var boxHeight = edge.target.getHeight(ctx);

      var intersection = _utils.intersect_line_box(s1, s2, { x: x2 - boxWidth / 2.0, y: y2 - boxHeight / 2.0 }, boxWidth, boxHeight);

      if (!intersection) {
          intersection = s2;
      }

      var arrowWidth;
      var arrowLength;

      var weight = typeof(edge.data.weight) !== 'undefined' ? edge.data.weight : 1.0;

      ctx.lineWidth = Math.max(weight * 2, 0.1);
      arrowWidth = 10 + ctx.lineWidth;
      arrowLength = 10;


      var stroke = '';
      if (edge.data.type == 'data') {
          stroke = colourScheme.infoLineColour;
      } else {
          var averagedesc = (edge.source.data.RecordLink.currentDescendantCount + edge.target.data.RecordLink.currentDescendantCount) / 2;
          stroke = _utils.getLevel(300, averagedesc, colourScheme.normalLineGradient);
      }

      ctx.strokeStyle = stroke;
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y);
      ctx.lineTo(s2.x, s2.y);
      ctx.stroke();

      // arrow
      var distance = s1.distance(s2);
      var directional = typeof(edge.data.directional) !== 'undefined' ? edge.data.directional : true;
      if (directional && distance > 75) {
          ctx.save();
          ctx.fillStyle = stroke;

          ctx.translate((intersection.x + s1.x) / 2, (intersection.y + s1.y) / 2);

          ctx.rotate(Math.atan2(y2 - y1, x2 - x1));
          ctx.beginPath();
          ctx.moveTo(-arrowLength, arrowWidth);
          ctx.lineTo(0, 0);
          ctx.lineTo(-arrowLength, -arrowWidth);
          ctx.lineTo(-arrowLength * 0.8, -0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
      }


  }

  drawNodes(ctx,layout, dims, node, p) {
      var _utils = new Utils(dims.currentBB, dims.graph_width, dims.graph_height, this.settings.colourScheme);

      var x1 = dims.mapOffset(_utils.toScreen(p)).x;
      var y1 = dims.mapOffset(_utils.toScreen(p)).y;

      if (!dims.validToDraw(x1, y1)) return;

      var s = dims.mapOffset(_utils.toScreen(p));

      var distance = 0;

      if (layout.parentNode && layout.parentLayout) {
        const parentDims = layout.parentLayout.drawing.dims;
        const utils = new Utils(parentDims.currentBB, parentDims.graph_width, parentDims.graph_height);
    
        let parentNodePoint = layout.parentLayout.nodePoints[layout.parentNode.id];
        parentNodePoint = parentDims.mapOffset(utils.toScreen(parentNodePoint.p));
    
        distance = s.distance(parentNodePoint);
    }

      ctx.save();
      //2 = nearest
      var selectionId = layout.getSelection(node);


      if (node.data.type != undefined && node.data.type == 'infonode') {
          if (node.data.label != '' && distance < 150) {
              _utils.drawText(dims, ctx, s.x, s.y + 20, node.data.label, node.data.type, selectionId);
              _utils.star(dims, ctx, s.x, s.y, 5, 5, 0.4, false, node.data.type, selectionId);
          }

      } else {

          if (layout.nodePoints[node.id].m==1)
              _utils.star(dims, ctx, s.x, s.y, 12, 5, 0.4, false, node.data.type, selectionId);
          else
              _utils.star(dims, ctx, s.x, s.y, 12, 3, 0.4, false, node.data.type, selectionId);


          if (node.data.RecordLink != undefined) {
              var name = node.data.RecordLink.Name;
              var m = layout.nodePoints[node.id].m;

              if (node.data.RecordLink.DescendentCount > 10 && _utils.validDisplayPeriod(node.data.RecordLink.DOB, this.year, 20)) {
                  _utils.drawText(dims, ctx, s.x, s.y, name + ' ' + node.data.RecordLink.currentDescendantCount, node.data.type, selectionId);
              }

              if (selectionId == 3) {
                  _utils.drawText(dims, ctx, s.x, s.y, name + ' ' + m , node.data.type, selectionId);
              }

              if (selectionId == 2) {
                  _utils.drawText(dims, ctx, s.x, s.y, name + ' ' + m, node.data.type, selectionId);

                  var bstring = node.data.RecordLink.DOB + ' ' + node.data.RecordLink.BirthLocation;

                  if (bstring == '')
                      bstring = 'Birth Unknown';
                  else
                      bstring = 'Born: ' + bstring;

                  _utils.drawText(dims, ctx, s.x, s.y + 20, bstring, node.data.type, selectionId);


                  var dstring = node.data.RecordLink.DOD + ' ' + node.data.RecordLink.DeathLocation;

                  if (dstring == ' ')
                      dstring = 'Death Unknown';
                  else
                      dstring = 'Death: ' + dstring;

                  _utils.drawText(dims, ctx, s.x, s.y + 40, dstring, node.data.type, selectionId);
                  //that.layout.nodePoints[node.id].m

                  //Occupation
                  if (node.data.RecordLink.Occupation != '')
                      _utils.drawText(dims, ctx, s.x, s.y + 60, node.data.RecordLink.Occupation, node.data.type, selectionId);


                 // _utils.drawText(map, that.ctx, s.x, s.y + 40, 'mass : ' + that.layout.nodePoints[node.id].m, node.data.type, selectionId);
              }
          }

      }

      ctx.restore();
  }

}
