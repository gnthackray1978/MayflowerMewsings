import  React, { useState, useEffect }  from 'react';

import HeatMapBody from './HeatMapBody.jsx';
import MappingToolbar from '../MappingToolbar.jsx';

import MapWrapper from '../MapWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';

 

function makeData(data, schema, subSchema){

 

  let rows = [];

  if(!data) return rows;

  let idx =0;

  

  if(!data[schema][subSchema]){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return rows;
  }

  let allTrees = [];
  while(idx < data[schema][subSchema].results.length){
    let tp = data[schema][subSchema].results[idx];
   
    rows.push( {
                   ...tp, 
                  });

    idx++;
  }



  let totalRecordCount =0;

  if(data && data[schema])
   totalRecordCount =  data[schema][subSchema].totalResults;

   
  // var rows = parsedData.rows;

  // var totalRecordCount = parsedData.totalRecordCount;
  // var treeColours = parsedData.allTrees;
 
   var rowsPerPage = 1000;
   var page =0;

  return {
    rows,
    totalRecordCount,
    treeColours : allTrees,
    rowsPerPage,
    page
  };



}



function HeatMap() {

    const [filterParams, setFilterParams] = React.useState({   
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : '_21_Alan!Douglas'
    });

    const GET_FTMView = gql`
    query Dna(      
       $yearStart : Int!,
       $yearEnd : Int!,
       $origin : String!
     ){
      dna{
        ftmlatlngsearch(                  
                   yearStart : $yearStart,
                   yearEnd : $yearEnd,
                   origin : $origin
             ) {
         page
         totalResults
         results {
        	id
        	lat
          long
          weight
         }
       }
      }
    }
    `;

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    

    var state = useMapState(GET_FTMView);

    state = {
       filterParams,
      ... state,
      ... makeData(state.data,'dna','ftmlatlngsearch'),
      headCells : headCells,
      title : 'HeatMap View'
    };
 
   // console.log('HeatMap: ' + state.rows );

   var idx =0;
  var tpRows =[];

  if(state.rows && state.rows.length >0){
    while(idx < state.rows.length){
      if( !isNaN(state.rows[idx].lat) &&
          !isNaN(state.rows[idx].long) &&
          !isNaN(state.rows[idx].weight) ){
            tpRows.push({
              lat: state.rows[idx].lat,
              lng : state.rows[idx].long,
              weight : state.rows[idx].weight
            });
      }
      idx++;
    }

    console.log('HeatMap: ' + tpRows.length );

   } 

   var data =  {    
     positions: tpRows,
      options: {   
        radius: 20,   
        opacity: 0.6
      }
    };

    return ( 
        <div>
          <MapWrapper state = {state} >
            <MappingToolbar state ={state}/>
            <HeatMapBody rows ={data} />
          </MapWrapper>
        </div>
    );

}


export default HeatMap;
