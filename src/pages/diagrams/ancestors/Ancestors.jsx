import  React, { useState, useEffect }  from 'react';

import AncestorsBody from './AncestorsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';

 


function Ancestors() {
 
    let state = {
      title : 'Ancestor View'
    };
    let data = {};

    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <AncestorsBody rows ={data} />
          </DiagramWrapper>
        </div>
    );

}


export default Ancestors;
