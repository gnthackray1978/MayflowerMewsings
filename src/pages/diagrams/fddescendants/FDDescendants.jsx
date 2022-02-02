import  React, { useState, useEffect }  from 'react';

import FDDescendantsBody from './FDDescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';


function makeData(data, schema, subSchema){

  console.log('make data desc' );

  let rows = [];

  if(!data) return rows;

  let idx =0;

  if(!data[schema][subSchema]){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return rows;
  }

  if(data[schema][subSchema].results == null){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' results were null');
    return rows;
  }

  while(idx < data[schema][subSchema].results.length){
    let tp = data[schema][subSchema].results[idx];

    rows.push( {
                   ...tp
               });

    idx++;
  }


  return {
    rows
  };

}


function FDDescendants(props) {
 
    
  const {selectedTreeData,selectedTreePersonData} = props;



  const GET_FTMView = gql`
  query Diagram(      
    $personId : Int!,
    $origin : String!
  ){
    diagram{
      descendantsearch(
                personId : $personId,
                origin : $origin
          ) {
      page
      totalResults
      results {        
        id
        generationIdx,
        index,
        christianName,
        surname
      }
    }
    }
  }
  `;

  var state = useMapState(GET_FTMView,{
    personId : selectedTreePersonData,     
    origin : selectedTreeData
  });

  state = {
    ... state,
   
    title : 'Map View'
  };

  let data = makeData(state.data,'diagram','descendantsearch');

    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <FDDescendantsBody rows ={data.rows} />
          </DiagramWrapper>
        </div>
    );

}


export default FDDescendants;