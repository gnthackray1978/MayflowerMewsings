import React, { Component } from 'react';
import WillTable from './WillTable.jsx'
import { gql} from '@apollo/client';

function NorfolkWills() {


  const GET_WILLS = gql`
  query Will(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $yearStart: Int!,
     $yearEnd : Int!,
     $ref: String!,
     $desc : String!,
     $place: String!,
     $surname : String!
   ){
    will{
      norfolksearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             yearStart: $yearStart,
             yearEnd : $yearEnd,
             ref: $ref,
             desc : $desc,
             place: $place,
             surname : $surname
           ) {
       page
       totalResults
       results {
            id
           description
           collection
           reference
           place
           year
           typ
           firstName
           surname
           occupation
           aliases
       }
     }
    }
  }
  `;

    const makeData = function(data){

      let rows = [];

      if(!data) return rows;

      let idx =0;

      while(idx < data.will.norfolksearch.results.length){
        let tp = data.will.norfolksearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.will)
       totalRecordCount =  data.will.norfolksearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <WillTable GET_WILLS = {GET_WILLS}  makeData = {makeData}></WillTable>
        </div>
    );

}


export default NorfolkWills;
