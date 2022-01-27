
import React, { useRef, useEffect } from 'react'
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

  const { draw, options, ...rest } = props
 // const { context, ...moreConfig } = options
  ///const canvasRef = useCanvas(draw, {predraw, postdraw})
  const canvasRef = useCanvas(draw, {predraw, postdraw})

  return <canvas ref={canvasRef} {...rest}/>
}



function Diagrams(props) {

    const {className, theme, classes} = props;

    const draw = (ctx, frameCount) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
      ctx.fill()
    }


    return (
        <div>
          Diagrams
          <Canvas  draw={draw} style ={{height:"420", width: "1163"}}></Canvas>
        </div>
    );

}


export default Diagrams;
