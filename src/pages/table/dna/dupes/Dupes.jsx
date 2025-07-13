import React from 'react';
import DupeTableToolbar from './DupeTableToolbar.jsx';
import TableWrapper from '../../../../features/Table/TableWrapper.jsx';
import GenericTable from '../../../../features/Table/GenericTable.jsx';
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
      { id: 'surname', numeric: false, disablePadding: true, label: 'Surname', isRowHeader: true },
      { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
      { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
      { id: 'yearStart', numeric: false, disablePadding: true, label: 'Year From' },
      { id: 'yearEnd', numeric: false, disablePadding: true, label: 'Year To' },
      { id: 'origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];
    
    var params = getParams(pobj.defaults);

    var state = useTableState(GET_DUPES,params,'dupesearch');

    state.headCells = headCells;
    state.title = 'Dupes';

    return (
        <div>
          <TableWrapper state = {state} >
            <DupeTableToolbar state ={state}/>
            <GenericTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Dupes;
