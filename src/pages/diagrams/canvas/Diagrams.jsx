
import React, { useRef, useEffect , useState} from 'react'

import { connect } from "react-redux";

import {TreeUI} from '../drawinglib/treeUI';
import { Canvas } from './Canvas';

function Diagrams(props) {

    const { drawing, ancestorConfig} = props;

    const draw = (ctx, drawing) => { 
    
      if(drawing && drawing.IsValid()) {
      
        drawing.centrePoint += drawing.movementx ;
        drawing.centreVerticalPoint += drawing.movementy ;

        let ui = new TreeUI(ctx,ancestorConfig, true, ()=>{});
     
        drawing.RefreshLayout();

        drawing.Draw(ui);
      } 
    }
 

    return (
        <div>          
         {drawing && <Canvas onClick={(e)=>{          
            drawing.PerformClick(e.clientX, e.clientY);
         }}
            onDrag={(e)=>{console.log('on drag')}}
            onMouseMove={(e)=>{
                drawing.SetMouse(e.clientX, e.clientY,e, (validLink,mousestate)=>{
                  document.body.style.cursor = validLink ? 'pointer' : (mousestate ? 'move' : 'default');
                });                
              }
            }
        //    onMouseDown={(e)=>{console.log('on mouse down')}}
            onMouseUp={(e)=>{console.log('on mouse up')}}
            drawing ={drawing} draw={draw} style ={{height:"100%", width: "100%", position: "absolute", top :"0", left :"0"}}></Canvas>}
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