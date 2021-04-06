import React, { Component } from 'react';
import PoiTable from './PoiTable.jsx'
import { gql} from '@apollo/client';

function Poi() {


  const GET_Poi = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $surname : String!,
      $country : String!,
      $mincm : Int!,
      $location : String!,
      $yearStart : Int!,
      $yearEnd : Int!,
      $name: String!
   ){
    dna{
      poisearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             surname : $surname,
              country : $country,
              mincm : $mincm,
              location : $location,
              yearStart : $yearStart,
              yearEnd : $yearEnd,
              name : $name
           ) {
       page
       totalResults
       results {
           id
           christianName
           surname
           birthYear
           birthPlace
           birthCounty
           testDisplayName
           testAdminDisplayName
           treeUrl
           testAdminDisplayName
           sharedCentimorgans
           memory
           name
       }
     }
    }
  }
  `;


    const makeData = function(data){

      let rows = [];

      if(!data) return rows;

      let idx =0;

      while(idx < data.dna.poisearch.results.length){
        let tp = data.dna.poisearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.dna)
       totalRecordCount =  data.dna.poisearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    const headCells = [
    //  { id: 'Id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'ChristianName', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
    { id: 'BirthYear', numeric: false, disablePadding: true, label: 'Birth Year' },

    { id: 'BirthPlace', numeric: false, disablePadding: true, label: 'Location' },
    { id: 'BirthCounty', numeric: false, disablePadding: true, label: 'County' },

      { id: 'TestDisplayName', numeric: false, disablePadding: true, label: 'Testee' },
      { id: 'TestAdminDisplayName', numeric: false, disablePadding: true, label: 'Admin Name' },

      { id: 'SharedCentimorgans', numeric: false, disablePadding: true, label: 'cMs' },

    ];

    return (
        <div>
          <PoiTable ReturnData = {GET_Poi} makeData = {makeData} headCells= {headCells}></PoiTable>
        </div>
    );

}


export default Poi;
