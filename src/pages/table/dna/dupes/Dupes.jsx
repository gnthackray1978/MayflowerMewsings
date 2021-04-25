import React, { Component } from 'react';
import DupeTable from './DupeTable.jsx'
import DupeTableToolbar from './DupeTableToolbar.jsx'
import TableWrapper from '../../TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../useTable';

function Dupes() {


  const GET_DUPES = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $surname : String!
   ){
    dna{
      dupesearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             surname : $surname
           ) {
       page
       totalResults
       results {
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

    var state = useTableState(GET_DUPES,{
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
      surname : ''
    },'dna','dupesearch');

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
