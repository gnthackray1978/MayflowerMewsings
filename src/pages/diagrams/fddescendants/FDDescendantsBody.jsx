import  React from 'react';
import FDDiagrams from '../canvas/FDDiagrams.jsx'

function FDDescendantsBody(props) {

    const { graph, ancestorConfig} = props;

    return ( 
        <div> 
            <FDDiagrams graph = {graph}/>
        </div>
    ); 
}


export default FDDescendantsBody;