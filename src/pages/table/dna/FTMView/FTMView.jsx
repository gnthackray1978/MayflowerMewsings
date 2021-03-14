import React, { Component } from 'react';
import FTMViewTable from './FTMViewTable.jsx'
import { gql} from '@apollo/client';

function FTMView() {


	// 				new QueryArgument<StringGraphType> { Name = "location" },


  const GET_FTMView = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $surname : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $location : String!
   ){
    dna{
      ftmviewsearch(limit : $limit,
                 offset : $offset,
                 sortColumn: $sortColumn,
                 sortOrder : $sortOrder,
                 surname : $surname,
                 yearStart : $yearStart,
                 yearEnd : $yearEnd,
                 location : $location
           ) {
       page
       totalResults
       results {
           id
           firstName
           surname
           location
           yearFrom
           yearTo
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

      while(idx < data.dna.ftmviewsearch.results.length){
        let tp = data.dna.ftmviewsearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.dna)
       totalRecordCount =  data.dna.ftmviewsearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <FTMViewTable ReturnData = {GET_FTMView} makeData = {makeData}></FTMViewTable>
        </div>
    );

}


export default FTMView;
