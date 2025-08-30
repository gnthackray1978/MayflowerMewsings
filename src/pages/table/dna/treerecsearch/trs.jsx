import React from 'react';
import GenericToolbar from '../../../../features/Table/GenericToolbar.jsx';
import TableWrapper from '../../../../features/Table/TableWrapper.jsx';
import GenericTable from '../../../../features/Table/GenericTable.jsx';
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import {pobj} from '../../../../shared/common.js'

function Trs() {


  const GET_Trs = gql`
  query Query(${pobj.params} ){    
      treerecsearch(${pobj.pobj}) {
       page
       error
       totalRows
       rows {
           id
           cm
           located
           origin
           personCount
           name
       }
     }    
  }
  `;

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name', isRowHeader: true, width: '15%' },
        { id: 'personCount', numeric: false, disablePadding: true, label: 'Persons', width: '10%' },
        { id: 'cm', numeric: false, disablePadding: true, label: 'cM', width: '10%' },
        { id: 'located', numeric: false, disablePadding: true, label: 'Located', width: '0%' },
        { id: 'origin', numeric: false, disablePadding: true, label: 'Origin', width: '65%' }
    ];

    const filterConfig = [
      { id: 'treeName', label: 'Tree Name', initialValue: '', className: 'filter' }
    ];

    const params = getParams(pobj.defaults);

    const state = useTableState(GET_Trs,params,'treerecsearch');

    state.headCells = headCells;
    state.title = 'Trees Over View';
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


export default Trs ;