
import React, { useRef, useEffect , useState} from 'react'

import { connect } from "react-redux";

import {TreeUI} from './drawinglib/treeUI';
import useCanvas from './useCanvas'

function resizeCanvas(canvas) {
  const { width, height } = canvas.getBoundingClientRect()
  
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio:ratio=1 } = window
    const context = canvas.getContext('2d')
    canvas.width = width*ratio
    canvas.height = height*ratio
    context.scale(ratio, ratio)
    return true
  }

  return false
}

function resizeCanvasToDisplaySize(canvas) {
    
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }

  return false
}

const postdraw = () => {
 
 // ctx.restore()
 }
 const predraw = (context, canvas) => {
 // context.save()

  //const { width, height } = canvas.getBoundingClientRect()
  resizeCanvas(canvas);
//  console.log(width + ' ' + height);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}


const Canvas = props => {  

  const { draw,graph, options, ...rest } = props ;

  const canvasRef = useCanvas(draw, graph, {predraw, postdraw});

  return <canvas ref={canvasRef} {...rest}/>
}



function Diagrams(props) {

    const { graph, ancestorConfig} = props;

    const draw = (ctx, graph) => { 
    
      if(graph){
      
      

        graph.centrePoint += graph.movementx ;
        graph.centreVerticalPoint += graph.movementy ;

        graph.treeUI = new TreeUI(ctx,ancestorConfig, true, ()=>{});
     
        graph.DrawTreeInner();
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
export default connect(mapStateToProps, mapDispatchToProps)(Diagrams);