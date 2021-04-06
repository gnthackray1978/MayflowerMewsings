import React, { Component } from 'react';
import ParishTable from './ParishTable.jsx'
import { gql} from '@apollo/client';

function Parishs() {


  const GET_Parishs = gql`
  query Adb(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $county: String!,
     $parishName : String!
   ){
    adb{
      parishsearch(
                     limit : $limit,
                     offset : $offset,
                     sortColumn: $sortColumn,
                     sortOrder : $sortOrder,
                     county: $county,
                     parishName : $parishName
           ) {
                 page
                 totalResults
                 results {
                            id
                            parishName
                            parishRegistersDeposited
                            parishNotes
                            parentParish
                            parishStartYear
                            parishEndYear
                            parishCounty
                            parishX
                            parishY
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

      while(idx < data.adb.parishsearch.results.length){
        let tp = data.adb.parishsearch.results[idx];

        rows.push(tp);

        idx++;
      }



      if(data && data.adb)
       totalRecordCount =  data.adb.parishsearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }
    const headCells = [
      { id: 'parishName', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'parishRegistersDeposited', numeric: false, disablePadding: true, label: 'Deposited' },
      { id: 'parishNotes', numeric: false, disablePadding: true, label: 'Notes' },
      { id: 'parentParish', numeric: false, disablePadding: true, label: 'Parent' },
      { id: 'parishStartYear', numeric: false, disablePadding: true, label: 'Starts' },
      { id: 'parishEndYear', numeric: false, disablePadding: true, label: 'Ends' },
      { id: 'parishCounty', numeric: false, disablePadding: true, label: 'County' },
      { id: 'parishX', numeric: false, disablePadding: true, label: 'Long' },
      { id: 'parishY', numeric: false, disablePadding: true, label: 'Lat' }
    ];


    return (
        <div>
          <ParishTable ReturnData = {GET_Parishs} makeData = {makeData} headCells = {headCells}></ParishTable>
        </div>
    );

}


export default Parishs;
