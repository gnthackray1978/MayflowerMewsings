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
      $yearEnd : Int!
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
              yearEnd : $yearEnd
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

    return (
        <div>
          <PoiTable GET_Poi = {GET_Poi} makeData = {makeData}></PoiTable>
        </div>
    );

}


export default Poi;
