import React, { Component } from 'react';
import WillTable from './WillTable.jsx'
import { gql} from '@apollo/client';

function LincsWills() {


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
      lincssearch(limit : $limit,
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

      while(idx < data.will.lincssearch.results.length){
        let tp = data.will.lincssearch.results[idx];

        rows.push(tp);

        idx++;
      }

      let totalRecordCount =0;

      if(data && data.will)
       totalRecordCount =  data.will.lincssearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    const headCells = [
    //  { id: 'Id', numeric: true, disablePadding: true, label: 'ID' },
      { id: 'Year', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'Reference', numeric: false, disablePadding: true, label: 'Reference' },
      { id: 'Description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'Place', numeric: false, disablePadding: true, label: 'Place' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'Typ', numeric: false, disablePadding: true, label: 'Type' },
    ];

    return (



        <div>
          <WillTable GET_WILLS = {GET_WILLS} makeData = {makeData} headCells ={headCells}></WillTable>
        </div>
    );

}


export default LincsWills;
