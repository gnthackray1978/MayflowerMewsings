import React from 'react';
import FTMViewTableToolbar from './FTMViewTableToolbar.jsx';
import TableWrapper from '../../../../features/Table/TableWrapper.jsx';
import GenericTable from '../../../../features/Table/GenericTable.jsx';
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
      { id: 'surname', numeric: false, disablePadding: true, label: 'Surname', isRowHeader: true },
      { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
      { id: 'location', numeric: false, disablePadding: true, label: 'Birth Location' },
      { id: 'yearStart', numeric: false, disablePadding: true, label: 'Year Start' },
      { id: 'yearEnd', numeric: false, disablePadding: true, label: 'Year End' },
      { id: 'origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var params = getParams({...pobj.defaults,...{surname:'thackray'}});

    var state = useTableState(GET_FTMView,params,'ftmviewsearch');

    state.headCells = headCells;
    state.title = 'FTM View';

    return (
        <div>
          <TableWrapper state = {state} >
            <FTMViewTableToolbar state ={state}/>
            <GenericTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default FTMView;
