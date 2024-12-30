import  React from 'react';
import FDDiagrams from '../canvas/FDDiagrams.jsx'

function FDDescendantsBody(props) {

    const { drawingContainer} = props;

    return ( 
        <div> 
            <FDDiagrams drawingContainer = {drawingContainer}/>
        </div>
    ); 
}


export default FDDescendantsBody;