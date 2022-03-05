import  React from 'react';
import Diagrams from '../Diagrams.jsx'

function AncestorsBody(props) {

    
    const { graph, ancestorConfig} = props;
    
    return ( 
        <div> 
            <Diagrams graph = {graph}/>
        </div>
    );
}


export default AncestorsBody;