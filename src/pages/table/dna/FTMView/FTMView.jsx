import React, { Component } from 'react';

import FTMViewTable from './FTMViewTable.jsx';
import FTMViewTableToolbar from './FTMViewTableToolbar.jsx';

import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';

import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import {pobj} from '../../../../shared/common.js'


function FTMView() {

    const GET_FTMView = gql`
    query Query(${pobj.params} ){      
        ftmviewsearch(${pobj.pobj}) {
         page
         totalRows
         error
         rows {
             id
             firstName
             surname
             location
             yearStart
             yearEnd
             origin
             birthLat
             birthLong                   
         }
       }
      
    }
    `;

    const headCells = [

      { id: 'yearStart', numeric: false, disablePadding: true, label: 'yearStart' },
      { id: 'yearEnd', numeric: false, disablePadding: true, label: 'yearEnd' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var params = getParams(pobj.defaults);

    var state = useTableState(GET_FTMView,params,'ftmviewsearch');

    state.headCells = headCells;
    state.title = 'FTM View';

    return (
        <div>
          <TableWrapper state = {state} >
            <FTMViewTableToolbar state ={state}/>
            <FTMViewTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default FTMView;
