import React, { Component } from 'react';
import PersonTable from './PersonTable.jsx'
import { gql} from '@apollo/client';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import PersonTableToolbar from './PersonTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useTableState} from '../../../../features/Table/useTable';

function Persons() {


  const GET_PersonS = gql`
  query Query(
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
      personsearch( pobj : {
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
                          }
                    ) {
       page
       totalRows
       rows {
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
  `;

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

    var defaultValues = {
      sortColumn : 'birthint',
      sortOrder : 'asc',
      limit : 0,
      offset :25,
      yearStart : 1500,
      yearEnd: 1800,
      firstName : '',
      surname : '',
      birthLocation : '',
      fatherChristianName :'',
      fatherSurname : '',
      motherChristianName : ''
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_PersonS,params,'personsearch');

    state.headCells = headCells;
    state.title = 'Person Search';

    return (
      <div>
        <TableWrapper state = {state} >
          <PersonTableToolbar state ={state}/>
          <PersonTable state ={state}/>
        </TableWrapper>
      </div>
    );

}


export default Persons;
