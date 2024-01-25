
import React, { useRef, useEffect , useState} from 'react'

import { connect } from "react-redux";

import {TreeUI} from '../drawinglib/treeUI';
import { Canvas } from './Canvas';

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