import React, { useRef, useEffect , useState} from 'react'

import {Graph} from "../fddescendants/libs/Graph.js";
import {Drawing} from "../fddescendants/libs/Drawing.js";
import {RenderLib } from '../fddescendants/libs/RenderLib.js';

import { connect } from "react-redux";

import { Canvas } from './Canvas';


//formerly called renderinghandler
//comes from FDDescendants -> FDDescendantsBody
function FDDiagrams(props) {

    // not currently any of these!
    //these are properties of the rendering handler.
    //const {channel, layoutList, renderer} = props;

    const {drawingContainer} = props;

    // let _channel = forceDirect.channel;
    // //but ForceDirect
    // //force direct originally contained the rendering handler.
    // //It was initialized like this.
    // //new RenderingHandler(that.channel, layoutList, new RenderLib(graph, ctx));


    // let graph = new Graph(_channel);

    // let renderer = new RenderLib(graph);

    // var layoutList = new Drawing(_channel, graph,  forceDirect.settings, forceDirect.dataSource);

    // layoutList.Init();


    const draw = (ctx, drawingContainer) => { 
    
      let layouts = drawingContainer.drawing.layouts;
      let drawing = drawingContainer.drawing;
      let renderer = drawingContainer.renderer;
      let channel = drawingContainer.drawing.channel;

      // stop simulation when energy of the system goes below a threshold
      // starts with -9999, so it will always run the first time
      if(drawingContainer.energyCount > -9999 && energyCount < 0.01){
        return;
      }

      if(drawingContainer.energyCount == -9999)
        drawingContainer.energyCount = 0;

      if(drawing){
          
        drawing.UpdateActiveLayouts();

        //drawingContainer.energyCount = 0;

        renderer.clear(ctx,drawing.TopLayout()._cameraView);

        channel.emit( "nodecount", { value: drawing.TopLayout()._cameraView.countOnscreenNodes() } );

        layouts.forEach(function(layout,idx) {

            layout.applyCoulombsLaw();
            layout.applyHookesLaw();
            layout.attractToCentre();
            layout.updateVelocity(0.03);
            layout.updatePosition(0.03);

            var map = layout._cameraView;

            // render
            layout.eachEdge(function(edge, spring) {
              renderer.drawEdges(ctx,map, edge, spring.point1.p, spring.point2.p);
            });

            layout.eachNode(function(node, point) {
              renderer.drawNodes(ctx,layout.layout, map, node, point.p);
            });

            drawingContainer.energyCount += layout.totalEnergy();

            idx++;
        });

        channel.emit( "energy",  {value: drawingContainer.energyCount.toFixed(2) });
             
      } 
    }
 

    return (
        <div>          
         {drawingContainer && <Canvas graph ={drawingContainer} draw={draw} style ={{height:"420", width: "1163"}}></Canvas>}
        </div>
    );

}

const mapStateToProps = state => {
  return { 
    ancestorConfig : state.ux.ancestorConfig
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FDDiagrams);