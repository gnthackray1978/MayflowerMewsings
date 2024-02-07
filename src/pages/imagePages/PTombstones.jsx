import React from 'react';

import {useTableState} from './useTable.jsx' 
import ImageParents from './ImageParents.jsx'; 


function PTombstones(props) {

  
    var state = useTableState();

  //console.log('PTombstones');
  
    return (
        <div>
          <ImageParents parents = {state.parents}/>
        </div>
    );

}


export default PTombstones;
