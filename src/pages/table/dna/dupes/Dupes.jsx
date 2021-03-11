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
           ident
           location
           origin
       }
     }
    }
  }
  `;
    const makeData = function(data){

      let rows = [];

      if(!data) return rows;

      let idx =0;

      while(idx < data.dna.dupesearch.results.length){
        let tp = data.dna.dupesearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.dna)
       totalRecordCount =  data.dna.dupesearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <DupeTable GET_DUPES = {GET_DUPES} makeData = {makeData}></DupeTable>
        </div>
    );

}


export default Dupes;
