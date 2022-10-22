import  React from 'react';
import Diagrams from '../canvas/Diagrams.jsx'



function DescendantsBody(props) {

    const { graph, ancestorConfig} = props;
    
    return ( 
        <div> 
            <Diagrams graph = {graph}/>
        </div>
    );

}


export default DescendantsBody;