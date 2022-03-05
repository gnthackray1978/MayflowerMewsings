import { useRef, useEffect } from 'react'


const useCanvas = (draw,graph, options={}) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
 
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || '2d');
    let frameCountx = 0;
    let frameCounty =0;
    let xMove = 1;
    let yMove = 1;

    let animationFrameId;

    const render = () => {

      if(frameCountx == 1000) xMove = -1;
      if(frameCountx == 0) xMove = 1;

      frameCountx += xMove;


      if(frameCounty == 1000) yMove = -1;
      if(frameCounty == 0) yMove = 1;

      frameCounty += yMove;


      draw(context,graph, frameCountx, frameCounty)
      
      animationFrameId = window.requestAnimationFrame(render)
    }

    options.predraw(context,canvas);
    
    render(graph);
    
    options.postdraw();
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}
export default useCanvas
