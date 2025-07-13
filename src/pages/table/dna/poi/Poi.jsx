import React from 'react';
import PoiTableToolbar from './PoiTableToolbar.jsx';
import TableWrapper from '../../../../features/Table/TableWrapper.jsx';
import {gql} from '@apollo/client';
import GenericTable from '../../../../features/Table/GenericTable.jsx';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import {pobj} from '../../../../shared/common.js'

function Poi() {
    const GET_Poi = gql`
    query Query(${pobj.params} ){      
        poisearch( ${pobj.pobj}  ) {
         page
         totalRows
         error
         rows {
             id
             christianName
             surname
             birthYear
             birthPlace
             birthCounty
             testDisplayName
             testAdminDisplayName
             treeUrl
             testAdminDisplayName
             sharedCentimorgans
             memory
             name
         }
       }
      
    }
    `;

    const headCells = [
        { id: 'surname', numeric: false, disablePadding: true, label: 'Surname', isRowHeader: true },
        { id: 'christianName', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'birthYear', numeric: false, disablePadding: true, label: 'Birth Year' },
        { id: 'birthPlace', numeric: false, disablePadding: true, label: 'Location' },
        { id: 'birthCounty', numeric: false, disablePadding: true, label: 'County' },
        { id: 'testDisplayName', numeric: false, disablePadding: true, label: 'Testee' },
        { id: 'testAdminDisplayName', numeric: false, disablePadding: true, label: 'Admin Name' },
        { id: 'sharedCentimorgans', numeric: false, disablePadding: true, label: 'cMs' }
    ];

    const defaultValues = {
        ...pobj.defaults,
        name: 'GNT GRT ATH',
        yearStart: 1750,
        yearEnd: 1775
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_Poi,params,'poisearch');

    state.headCells = headCells;
    state.title = 'POI';

    return (
        <TableWrapper state = {state} >
          <PoiTableToolbar state ={state}/>
          <GenericTable state ={state}/>
        </TableWrapper>
    );

}


export default Poi;
