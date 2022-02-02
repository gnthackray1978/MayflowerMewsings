import  React, { useState, useEffect }  from 'react';

import AncestorsBody from './AncestorsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import { connect } from "react-redux";
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


function Ancestors(props) {

  const {selectedTreeData,selectedTreePersonData} = props;

  
  const GET_FTMView = gql`
  query Diagram(      
    $personId : Int!,
    $origin : String!
  ){
    diagram{
      ancestorsearch(
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
   
    title : 'Ancestor View'
  };

  let data = makeData(state.data,'diagram','ancestorsearch');


    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <AncestorsBody rows ={data.rows} />
          </DiagramWrapper>
        </div>
    );

}


const mapStateToProps = state => {
  return { 

    selectedTreePersonData : state.ux.selectedTreePersonData.personId != 0 ? state.ux.selectedTreePersonData.personId :3217,
    selectedTreeData : state.ux.selectedTreeData != '' ? state.ux.selectedTreeData : '_34_Kennington'
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Ancestors);