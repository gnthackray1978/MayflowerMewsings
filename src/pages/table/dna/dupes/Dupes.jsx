import React from 'react';
import GenericToolbar from "../../../../features/Table/GenericToolbar.jsx";
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
    
    const filterConfig = [
      { id: 'surname', label: 'Surname', initialValue: '' },
      { id: 'name', label: 'First Name', initialValue: '' },
      { id: 'location', label: 'Location', initialValue: '' },
      { id: 'yearStart', label: 'Year Start', initialValue: 1500 },
      { id: 'yearEnd', label: 'Year End', initialValue: 2000 },
      { id: 'origin', label: 'Origin', initialValue: '' }
  ];

    var params = getParams(pobj.defaults);

    var state = useTableState(GET_DUPES,params,'dupesearch');

    state.headCells = headCells;
    state.title = 'Dupes';
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


export default Dupes;
