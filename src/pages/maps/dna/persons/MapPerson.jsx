import  React, { useState, useEffect }  from 'react';

import MapPersonBody from './MapPersonBody.jsx';
import MapPersonToolbar from './MapPersonToolbar.jsx';

import MapWrapper from '../../MapWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../../useMap';

// function MPBWrapper({ rows, treeColours }) {
//   return (
//     <div>
//      <MapPersonBody rows ={rows} treeColours = {treeColours}/>
//     </div>
//   );
// }

function makeData(data, schema, subSchema){

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let rows = [];

  if(!data) return rows;

  let idx =0;

  

  if(!data[schema][subSchema]){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return rows;
  }

  let allTrees = [];
  let previousColours =[];
  while(idx < data[schema][subSchema].results.length){
    let tp = data[schema][subSchema].results[idx];
    let trees = [];

    if(tp.ftmPersonSummary.length >0){
      tp.ftmPersonSummary.forEach(e => {
        if(!trees.includes(e.treeName)){
          trees.push(e.treeName);
        }


        if (!allTrees.filter(f => f.treeName === e.treeName).length > 0) {

          let colour = getRandomColor();

          while(previousColours.includes(colour))
            colour = getRandomColor();

          previousColours.push(colour);

          allTrees.push({
            'treeName': e.treeName,
            'colour' : colour
          });

        }

      });
    }

    rows.push( {
                   ...tp,
                    trees : trees,
                    show :false
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



function MapPerson() {

    const [filterParams, setFilterParams] = React.useState({   
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : '_21_Alan!Douglas'
    });

    const GET_FTMView = gql`
    query Dna(      
       $surname : String!,
       $yearStart : Int!,
       $yearEnd : Int!,
       $location : String!,
       $origin : String!
     ){
      dna{
        ftmlocsearch(
                   surname : $surname,
                   yearStart : $yearStart,
                   yearEnd : $yearEnd,
                   location : $location,
                   origin : $origin
             ) {
         page
         totalResults
         results {
          ftmPersonSummary {
            firstName
            surname
            treeName
            yearFrom
            yearTo
          }
        	birthLat
        	birthLong
          locationName
          id
         }
       }
      }
    }
    `;

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

   // console.log('MapPerson' )

    var state = useMapState(GET_FTMView);

    state = {
       filterParams,
      ... state,
      ... makeData(state.data,'dna','ftmlocsearch'),
      headCells : headCells,
      title : 'Map View'
    };

    //useEffect(() => console.log('MapPerson componentDidMount' ), []);
 
    return (
        //rows treeColours
        <div>
          <MapWrapper state = {state} >
            <MapPersonToolbar state ={state}/>
            <MapPersonBody rows ={state.rows} treeColours = {state.treeColours}/>
          </MapWrapper>
        </div>
    );

}


export default MapPerson;