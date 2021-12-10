import React from 'react';

import {useTableState} from './useTable.jsx' 
import ImageParents from './ImageParents.jsx'; 



function Trees(props) {

  var state = useTableState();


  return (
      <div>
        <ImageParents parents = {state.parents}/>
      </div>
  );

}


export default Trees;
