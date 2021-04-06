import React, { Component } from 'react';
import DupeTable from './DupeTable.jsx'
import { gql} from '@apollo/client';

function Dupes() {


  const GET_DUPES = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $surname : String!
   ){
    dna{
      dupesearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             surname : $surname
           ) {
       page
       totalResults
       results {
           id
           firstName
           surname
           yearFrom
           yearTo
           location
           origin
       }
     }
    }
  }
  `;
    const makeData = function(data){

      let rows = [];
      let totalRecordCount =0;

      if(!data) return {
          rows,
          totalRecordCount
        };

      let idx =0;

      while(idx < data.dna.dupesearch.results.length){
        let tp = data.dna.dupesearch.results[idx];

        rows.push(tp);

        idx++;
      }



      if(data && data.dna)
       totalRecordCount =  data.dna.dupesearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }


    const headCells = [
      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'Year From' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'Year To' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' },
      { id: 'Location', numeric: false, disablePadding: true, label: 'Location' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' }
    ];


    return (
        <div>
          <DupeTable ReturnData = {GET_DUPES} makeData = {makeData} headCells = {headCells}></DupeTable>
        </div>
    );

}


export default Dupes;
