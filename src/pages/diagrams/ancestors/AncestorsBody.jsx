import  React from 'react';
import Diagrams from '../canvas/Diagrams.jsx'

function AncestorsBody(props) {

    
    const { graph, ancestorConfig} = props;
    
    return ( 
        <div> 
            <Diagrams drawing = {graph}/>
        </div>
    );
}


export default AncestorsBody;