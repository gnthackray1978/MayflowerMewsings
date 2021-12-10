import React from 'react';

import {useTableState} from './useTable.jsx' 
import ImageParents from './ImageParents.jsx'; 



function BMDs(props) {

  var state = useTableState();


  return (
      <div>
        <ImageParents parents = {state.parents}/>
      </div>
  );

}


export default BMDs;
