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
    
      if(drawingContainer.drawing){
          
        drawingContainer.drawing.layouts.UpdateActiveLayouts();

        var energyCount = 0;

        renderer.clear(ctx,drawingContainer.drawing.layouts.TopLayout()._cameraView);

        _channel.emit( "nodecount", { value: that.layouts.TopLayout()._cameraView.countOnscreenNodes() } );

        drawing.layouts.forEach(function(layout,idx) {

            layout.applyCoulombsLaw();
            layout.applyHookesLaw();
            layout.attractToCentre();
            layout.updateVelocity(0.03);
            layout.updatePosition(0.03);


            var map = layout._cameraView;

            // render
            layout.eachEdge(function(edge, spring) {
              drawingContainer.renderer.drawEdges(ctx,map, edge, spring.point1.p, spring.point2.p);
            });

            layout.eachNode(function(node, point) {
              drawingContainer.renderer.drawNodes(ctx,layout.layout, map, node, point.p);
            });

            energyCount += layout.totalEnergy();

            idx++;
        });

        _channel.emit( "energy",  {value: energyCount.toFixed(2) });


        // stop simulation when energy of the system goes below a threshold
        if (energyCount < 0.01) {
          
        }  
      } 
    }
 

    return (
        <div>          
         {graph && <Canvas graph ={drawingContainer.graph} draw={draw} style ={{height:"420", width: "1163"}}></Canvas>}
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