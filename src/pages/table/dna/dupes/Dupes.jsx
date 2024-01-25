import React, { Component } from 'react';
import DupeTable from './DupeTable.jsx'
import DupeTableToolbar from './DupeTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function Dupes() {


  const GET_DUPES = gql`
  query Query(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $surname : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $location : String!,
     $origin : String!,
     $minCM : Int!
   ){    
      dupesearch(pobj :{  
                  limit : $limit,
                  offset : $offset,
                  sortColumn: $sortColumn,
                  sortOrder : $sortOrder,
                  surname : $surname,
                  yearFrom : $yearStart,
                  yearTo : $yearEnd,
                  location : $location,
                  origin : $origin,
                  minCM : $minCM

                       }
           ) {
       page
       totalRows
       error
       rows {
           id
           firstName
           surname
           yearFrom
           yearTo
           location
           origin
       }
     }
    
  }
  `;


    const headCells = [
      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'Year From' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'Year To' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' },
      { id: 'Location', numeric: false, disablePadding: true, label: 'Location' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' }
    ];

    var defaultValues = {
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 50,
      offset :0,
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : '',
      minCM : 0
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_DUPES,params,'dupesearch');

    state.headCells = headCells;
    state.title = 'Dupes';




    return (
        <div>
          <TableWrapper state = {state} >
            <DupeTableToolbar state ={state}/>
            <DupeTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Dupes;
