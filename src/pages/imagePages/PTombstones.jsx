import React from 'react';

import { gql} from '@apollo/client';
  
import {useTableState} from './useTable.jsx' 
import ImageParents from './ImageParents.jsx'; 

const GET_IMAGES = gql`
  
query Image($page : String!){
  image
  {
    imagesearch(page : $page) {
      page
       error
      loginInfo
      results {
        id
        path
        title
        info
        parentImageId
      }
    }
    
    imageparentsearch(page : $page) {
      page
       error
       
      results {
        id
        title
        to
        from
        info
        page
      }
    }
    
  }
   
  
}
`;
 
 
function PTombstones(props) {

  
    var state = useTableState(GET_IMAGES);

    console.log('PTombstones');
  
    return (
        <div>
          <ImageParents parents = {state.parents}/>
        </div>
    );

}


export default PTombstones;
