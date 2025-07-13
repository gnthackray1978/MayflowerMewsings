import React from 'react';
import TrsTableToolbar from './trsTableToolbar.jsx';
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
        { id: 'name', numeric: false, disablePadding: true, label: 'Name', isRowHeader: true },
        { id: 'personCount', numeric: false, disablePadding: true, label: 'Persons' },
        { id: 'cm', numeric: false, disablePadding: true, label: 'cM' },
        { id: 'located', numeric: false, disablePadding: true, label: 'Located' },
        { id: 'origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    const params = getParams(pobj.defaults);

    const state = useTableState(GET_Trs,params,'treerecsearch');

    state.headCells = headCells;
    state.title = 'Trees Over View';

    return (
        <div>
          <TableWrapper state = {state} >
            <TrsTableToolbar state ={state}/>
            <GenericTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Trs ;
