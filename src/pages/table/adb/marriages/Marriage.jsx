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

    const headCells = [
      { id: 'maleCname', numeric: false, disablePadding: true, label: 'Groom Name' },
      { id: 'maleSname', numeric: false, disablePadding: true, label: 'Groom Surname' },
      { id: 'femaleCname', numeric: false, disablePadding: true, label: 'Bride Name' },
      { id: 'femaleSname', numeric: false, disablePadding: true, label: 'Bride Surname' },
      { id: 'marriageLocation', numeric: false, disablePadding: true, label: 'Loc.' },
      { id: 'yearIntVal', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'marriageCounty', numeric: false, disablePadding: true, label: 'County' },
      { id: 'source', numeric: false, disablePadding: true, label: 'Src' },
      { id: 'witness1', numeric: false, disablePadding: true, label: 'Wit' },
      { id: 'femaleIsKnownWidow', numeric: false, disablePadding: true, label: 'Wid' },
      { id: 'maleIsKnownWidower', numeric: false, disablePadding: true, label: 'Widower' },
      { id: 'isLicence', numeric: false, disablePadding: true, label: 'Lic.' },
      { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Dupes' }
    ];

    return (
        <div>
          <MarriageTable ReturnData = {GET_MARRIAGES} makeData = {makeData} headCells= {headCells}></MarriageTable>
        </div>
    );

}


export default Marriages;
