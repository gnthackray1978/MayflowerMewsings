import React, { Component } from 'react';
import DupeTable from './DupeTable.jsx'
import DupeTableToolbar from './DupeTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import {pobj} from '../../../../shared/common.js'

function Dupes() {

  
  const GET_DUPES = gql`
  query Query(${pobj.params}){    
      dupesearch(${pobj.pobj}) {
       page
       totalRows
       error
       rows {
           id
           firstName
           surname
           yearStart
           yearEnd
           location
           origin
       }
     }
    
  }
  `;


    const headCells = [
      { id: 'yearStart', numeric: false, disablePadding: true, label: 'Year From' },
      { id: 'yearEnd', numeric: false, disablePadding: true, label: 'Year To' },
      { id: 'parentage', numeric: false, disablePadding: true, label: 'Parentage' },
      { id: 'Location', numeric: false, disablePadding: true, label: 'Location' },
      
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' }
    ];

    
    var params = getParams(pobj.defaults);

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
