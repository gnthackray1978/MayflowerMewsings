import React, { useRef, useEffect , useState} from 'react'
import { connect } from "react-redux";
import { Canvas } from './Canvas';


//formerly called renderinghandler
//comes from FDDescendants -> FDDescendantsBody
function FDDiagrams(props) {

    const {drawingContainer} = props;

    const draw = (ctx, drawingContainer,frameCountx, frameCounty,timestamp) => { 
    
      let layouts = drawingContainer.drawing.layouts;
      let drawing = drawingContainer.drawing;
      let renderer = drawingContainer.renderer;
      let channel = drawingContainer.drawing.channel;

      drawingContainer.setTime(timestamp);

     // console.log("timer: ",timeInSeconds);  
      if(drawingContainer.timeInSeconds > 10){
        console.log("year: ",drawingContainer.currentYear);

        drawing.TopLayout().populateGraph(drawingContainer.currentYear);
        drawingContainer.currentYear = drawingContainer.currentYear +5;      
        drawingContainer.resetTimer();
      }
    
      // stop simulation when energy of the system goes below a threshold
      // change so that it handles all layouts including sublayouts.
      if(drawing.TopLayout().hasFinished()){
        console.log("finished");
        return;
      }

      if(drawing){
          
        drawing.UpdateActiveLayouts();

        renderer.clear(ctx,drawing.TopLayout()._cameraView);

        channel.emit( "nodecount", { value: drawing.TopLayout()._cameraView.countOnscreenNodes() } );

        layouts.forEach(function(layout,idx) {
            let _lay = layout.layout;

            _lay.applyCoulombsLaw();
            _lay.applyHookesLaw();
            _lay.attractToCentre();
            _lay.updateVelocity(0.03);
            _lay.updatePosition(0.03);
            _lay.runCount++;


            var map = _lay._cameraView;

            // render
            _lay.eachEdge(function(edge, spring) {
              renderer.drawEdges(ctx,map, edge, spring.point1.p, spring.point2.p);
            });

            _lay.eachNode(function(node, point) {
              renderer.drawNodes(ctx,_lay, map, node, point.p);          
            });
            
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