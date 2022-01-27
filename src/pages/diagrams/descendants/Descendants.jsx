import  React, { useState, useEffect }  from 'react';

import DescendantsBody from './DescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';


function Descendants() {
 
    let state = {
      title : 'Descendants View'
    };
    let data = {};

    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <DescendantsBody rows ={data} />
          </DiagramWrapper>
        </div>
    );

}


export default Descendants;
