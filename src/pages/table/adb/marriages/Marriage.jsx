import React, { Component } from 'react';
import MarriageTable from './MarriageTable.jsx'
import { gql} from '@apollo/client';

function Marriages() {


  const GET_MARRIAGES = gql`
  query Adb(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $maleSurname : String!,
     $femaleSurname : String!,
     $location : String!
   ){
    adb{
      marriagesearch(
                     limit : $limit,
                     offset : $offset,
                     sortColumn: $sortColumn,
                     sortOrder : $sortOrder,
                     yearStart : $yearStart,
                     yearEnd: $yearEnd,
                     maleSurname : $maleSurname,
                     femaleSurname: $femaleSurname,
                     location : $location
           ) {
       page
       totalResults
       results {
                  id
                  maleCname
                  maleSname
                  femaleCname
                  femaleSname
                  marriageLocation
                  yearIntVal
                  marriageCounty
                  source
                  witness1
                  femaleIsKnownWidow
                  maleIsKnownWidower
                  isLicence
                  totalEvents
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

      while(idx < data.adb.marriagesearch.results.length){
        let tp = data.adb.marriagesearch.results[idx];

        rows.push(tp);

        idx++;
      }



      if(data && data.adb)
       totalRecordCount =  data.adb.marriagesearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <MarriageTable ReturnData = {GET_MARRIAGES} makeData = {makeData}></MarriageTable>
        </div>
    );

}


export default Marriages;
