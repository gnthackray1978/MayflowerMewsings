import React, { useRef, useEffect , useState} from 'react'
import { connect } from "react-redux";
import { Canvas } from './Canvas';



//comes from FDDescendants -> FDDescendantsBody
function FDDiagrams(props) {

    const {drawingContainer} = props;

    const draw = (ctx, drawing,frameCountx, frameCounty,timestamp) => { 
    
      let layouts = drawing.layouts;      
      let renderer = drawing.renderer;
      let channel = drawing.channel;

      drawing.setTime(timestamp);

   //   console.log("timer: ",drawing.timeInSeconds);  
   
      if(drawing.startYear == drawing.currentYear ||
         drawing.timeInSeconds > 10){

  //      console.log("year: ",drawing.currentYear);

        drawing.TopLayout().populateGraph(drawing.currentYear);
        drawing.currentYear = drawing.currentYear +5;      
        drawing.resetTimer();
      }
    
      // stop simulation when energy of the system goes below a threshold
      // change so that it handles all layouts including sublayouts.
      if(!drawing.DrawRequired()){
      //  console.log("finished");
        return;
      }

      if(drawing){
          
        drawing.UpdateActiveLayouts();

        renderer.clear(ctx,drawing.dims);

        channel.emit( "nodecount", { value: drawing.countOnscreenNodes() } );

        layouts.forEach(function(l,idx) {
            let layout = l.layout;
            let drawingDimensions = layout.drawing.dims;

            layout.applyCoulombsLaw();
            layout.applyHookesLaw();
            layout.attractToCentre();
            layout.updateVelocity(0.03);
            layout.updatePosition(0.03);
            layout.runCount++;
            
            // render
            layout.eachEdge(function(edge, spring) {
              renderer.drawEdges(ctx,drawingDimensions, edge, spring.point1.p, spring.point2.p);
            });

            layout.eachNode(function(node, point) {
              renderer.drawNodes(ctx,layout, drawingDimensions, node, point.p);          
            });
            
            idx++;
        });

        channel.emit( "energy",  {value: drawing.energyCount.toFixed(2) });
             
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