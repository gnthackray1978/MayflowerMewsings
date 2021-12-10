import React from 'react';

import {useTableState} from './useTable.jsx' 
import ImageParents from './ImageParents.jsx'; 


function Deeds(props) {

  
    var state = useTableState();

    console.log('Deeds');
  
    return (
        <div>
          <ImageParents parents = {state.parents}/>
        </div>
    );

}


export default Deeds;
