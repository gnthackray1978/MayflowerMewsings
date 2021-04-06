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

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    return (
        <div>
          <FTMViewTable ReturnData = {GET_FTMView} makeData = {makeData} headCells ={headCells}></FTMViewTable>
        </div>
    );

}


export default FTMView;
