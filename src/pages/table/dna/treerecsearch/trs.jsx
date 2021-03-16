import React, { Component } from 'react';
import TrsTable from './TrsTable.jsx'
import { gql} from '@apollo/client';

function Trs() {


  const GET_Trs = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $origin : String!
   ){
    dna{
      treerecsearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             origin : $origin
           ) {
       page
       totalResults
       results {
           id
           cM
           located
           origin
           personCount
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

      while(idx < data.dna.treerecsearch.results.length){
        let tp = data.dna.treerecsearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.dna)
       totalRecordCount =  data.dna.treerecsearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <TrsTable ReturnData = {GET_Trs} makeData = {makeData}></TrsTable>
        </div>
    );

}


export default Trs ;
