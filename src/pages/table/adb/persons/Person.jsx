import React, { Component } from 'react';
import PersonTable from './PersonTable.jsx'
import { gql} from '@apollo/client';

function Persons() {


  const GET_PersonS = gql`
  query Adb(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $firstName : String!,
     $surname : String!,
     $birthLocation : String!,
     $fatherChristianName : String!,
     $fatherSurname : String!,
     $motherChristianName : String!
   ){
    adb{
      personsearch(
                     limit : $limit,
                     offset : $offset,
                     sortColumn: $sortColumn,
                     sortOrder : $sortOrder,
                     yearStart : $yearStart,
                     yearEnd: $yearEnd,
                     firstName :$firstName,
                     surname : $surname,
                     birthLocation : $birthLocation,
                     fatherChristianName : $fatherChristianName,
                     fatherSurname :$fatherSurname,
                     motherChristianName : $motherChristianName
           ) {
       page
       totalResults
       results {
                  id
                  christianName
                  surname
                  birthLocation
                  deathLocation
                  fatherChristianName
                  motherChristianName
                  motherSurname
                  source
                  deathCounty
                  deathInt
                  birthCounty
                  occupation
                  spouseName
                  spouseSurname
                  fatherOccupation
                  totalEvents
                  estBirthYearInt
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

      while(idx < data.adb.personsearch.results.length){
        let tp = data.adb.personsearch.results[idx];

        rows.push(tp);

        idx++;
      }



      if(data && data.adb)
       totalRecordCount =  data.adb.personsearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }
    const headCells = [
          { id: 'estBirthYearInt', numeric: false, disablePadding: true, label: 'Birth Year' },
          { id: 'deathInt', numeric: false, disablePadding: true, label: 'Death Year' },
        { id: 'christianName', numeric: false, disablePadding: true, label: 'Name' },


      { id: 'surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'birthLocation', numeric: false, disablePadding: true, label: 'Birth Loc.' },
      { id: 'birthCounty', numeric: false, disablePadding: true, label: 'Birth County' },
      { id: 'deathLocation', numeric: false, disablePadding: true, label: 'Death Loc.' },
      { id: 'deathCounty', numeric: false, disablePadding: true, label: 'Death County' },
      { id: 'fatherChristianName', numeric: false, disablePadding: true, label: 'Father Name' },

      { id: 'motherChristianName', numeric: false, disablePadding: true, label: 'Mother Name' },
        { id: 'motherSurname', numeric: false, disablePadding: true, label: 'Mother Surname' },

      { id: 'occupation', numeric: false, disablePadding: true, label: 'Occ' },
      { id: 'spouseName', numeric: false, disablePadding: true, label: 'Spouse Name' },
      { id: 'spouseSurname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Events' }
    ];

    return (
        <div>
          <PersonTable ReturnData = {GET_PersonS} makeData = {makeData} headCells ={headCells}></PersonTable>
        </div>
    );

}


export default Persons;
