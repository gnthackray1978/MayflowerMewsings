import  React, { useState, useEffect }  from 'react';

import FDDescendantsBody from './FDDescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';

function FDDescendants() {
 
    let state = {
      title : 'FDDescendants View'
    };
 
    let data = {};

    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <FDDescendantsBody rows ={data} />
          </DiagramWrapper>
        </div>
    );

}


export default FDDescendants;