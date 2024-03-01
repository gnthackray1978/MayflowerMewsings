import React, { Component } from 'react';
import TrsTable from './TrsTable.jsx'
import TrsTableToolbar from './TrsTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
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
        { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'PersonCount', numeric: false, disablePadding: true, label: 'Persons' },
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' },
        { id: 'Located', numeric: false, disablePadding: true, label: 'Located' },
        { id: 'Counties', numeric: false, disablePadding: true, label: 'Counties' }
    ];

    // var defaultValues = {
    //   sortColumn : 'cM',
    //   sortOrder : 'desc',
    //   limit : 25,
    //   offset :0,
    //   treeName : '',
    //   yearStart : 0,
    //   yearEnd : 2000,
    //   minCM : 0
    // };

    var params = getParams(pobj.defaults);

    var state = useTableState(GET_Trs,params,'treerecsearch');

    state.headCells = headCells;
    state.title = 'Trees Over View';

    return (
        <div>
          <TableWrapper state = {state} >
            <TrsTableToolbar state ={state}/>
            <TrsTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Trs ;
