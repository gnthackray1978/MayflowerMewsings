import React, { Component } from 'react';
import { gql} from '@apollo/client';
import {getParams} from '../../features/Table/qryStringFuncs';
import GenericToolbar from "../../features/Table/GenericToolbar.jsx";
import TableWrapper from '../../features/Table/TableWrapper.jsx'
import {useTableState} from '../../features/Table/useTable';
import GenericTable from '../../features/Table/GenericTable.jsx';

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
     $motherChristianName : String!,
     $motherSurname : String!,
     $deathLocation : String!,
     $deathCounty : String!,
     $source : String!,
     $location : String!,
      $birthCounty : String!,
       $occupation : String!,
       $spouseName : String!,
       $spouseSurname : String!, 
       $fatherOccupation : String!,
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
                              motherChristianName : $motherChristianName,
                              motherSurname : $motherSurname,
                              deathLocation : $deathLocation,
                              deathCounty : $deathCounty,
                              source : $source,
                              location : $location,
                              birthCounty : $birthCounty,
                              occupation : $occupation,
                              spouseName : $spouseName,
                              spouseSurname : $spouseSurname,
                              fatherOccupation : $fatherOccupation
                              
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
      { id: 'christianName', numeric: false, disablePadding: true, label: 'Name', isRowHeader: true },
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

    const filterConfig = [
      { id: 'surname', label: 'Surname', initialValue: '' },
      { id: 'firstName', label: 'First Name', initialValue: '' },
      { id: 'birthLocation', label: 'Birth Location', initialValue: '' },
      { id: 'birthCounty', label: 'Birth County', initialValue: '' },
      { id: 'yearStart', label: 'Year Start', initialValue: 1500 },
      { id: 'yearEnd', label: 'Year End', initialValue: 1800 },
      { id: 'fatherChristianName', label: 'Father Name', initialValue: '' },
      { id: 'fatherSurname', label: 'Father Surname', initialValue: '' },
      { id: 'motherChristianName', label: 'Mother Name', initialValue: '' },
      { id: 'motherSurname', label: 'Mother Surname', initialValue: '' },
      { id: 'deathLocation', label: 'Death Location', initialValue: '' },
      { id: 'deathCounty', label: 'Death County', initialValue: '' },
      { id: 'spouseName', label: 'Spouse Name', initialValue: '' },
      { id: 'spouseSurname', label: 'Spouse Surname', initialValue: '' },
      { id: 'occupation', label: 'Occupation', initialValue: '' },
      { id: 'fatherOccupation', label: 'Father Occupation', initialValue: '' },
      { id: 'source', label: 'Source', initialValue: '' },
      { id: 'location', label: 'Location', initialValue: '' },
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
      motherChristianName : '',
      motherSurname : '',
      deathLocation : '',
      deathCounty : '',
      source : '',
      location : '',
      birthCounty : '',
      occupation : '',
      spouseName : '',
      spouseSurname : '', 
      fatherOccupation : '',

    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_PersonS,params,'personsearch');

    state.headCells = headCells;
    state.title = 'Person Search';
    state.filterConfig = filterConfig;

    return (
      <div>
        <TableWrapper state = {state} >
          <GenericToolbar state ={state}/>
          <GenericTable state ={state}/>
        </TableWrapper>
      </div>
    );

}


export default Persons;
