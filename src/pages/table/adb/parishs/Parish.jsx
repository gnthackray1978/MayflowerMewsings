import React, { Component } from 'react';
import ParishTable from './ParishTable.jsx'
import { gql} from '@apollo/client';


import ParishTableToolbar from './ParishTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useTableState} from '../../../../features/Table/useTable';




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

    var state = useTableState(GET_Parishs,{
      sortColumn : 'parishName',
      sortOrder : 'asc',
      limit : 25,
      offset :0,
      parishName : '',
      county : ''
    },'adb','parishsearch');

    state.headCells = headCells;
    state.title = 'Parish Search';

    return (
      <div>
        <TableWrapper state = {state} >
          <ParishTableToolbar state ={state}/>
          <ParishTable state ={state}/>
        </TableWrapper>
      </div>
    );

}


export default Parishs;
