import React, { useRef, useEffect , useState} from 'react'

import { connect } from "react-redux";

import { Canvas } from './Canvas';

function FDDiagrams(props) {

    const {channel, layoutList, renderer} = props;

    let graph = {
        channel,
        layoutList,
        renderer
    };

    const draw = (ctx, graph) => { 
    
      if(graph){
        
 
 
        graph.layouts.UpdateActiveLayouts();

            var energyCount = 0;


            graph.renderer.clear(that.layouts.TopLayout()._cameraView);

            graph._channel.emit( "nodecount", { value: that.layouts.TopLayout()._cameraView.countOnscreenNodes() } );

            graph.layouts.layouts.forEach(function(layout,idx) {

                layout.layout.applyCoulombsLaw();
                layout.layout.applyHookesLaw();
                layout.layout.attractToCentre();
                layout.layout.updateVelocity(0.03);
                layout.layout.updatePosition(0.03);


                var map = layout.layout._cameraView;

                // render
                layout.layout.eachEdge(function(edge, spring) {
                    graph.renderer.drawEdges(map, edge, spring.point1.p, spring.point2.p);
                });

                layout.layout.eachNode(function(node, point) {
                    graph.renderer.drawNodes(layout.layout, map, node, point.p);
                });

                energyCount += layout.layout.totalEnergy();

                idx++;
            });

            graph._channel.emit( "energy",  {value: energyCount.toFixed(2) });


            // stop simulation when energy of the system goes below a threshold
            if (energyCount < 0.01) {
              
            }  
      } 
    }
 

    return (
        <div>          
         {graph && <Canvas 
            graph ={graph} draw={draw} style ={{height:"420", width: "1163"}}></Canvas>}
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