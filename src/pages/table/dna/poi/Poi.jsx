import React from 'react';
import GenericToolbar from "../../../../features/Table/GenericToolbar.jsx";
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

    const filterConfig = [
      { id: 'surname', label: 'Surname', initialValue: '' },
      { id: 'name', label: 'Name', initialValue: 'GNT GRT ATH' },
      { id: 'location', label: 'Location', initialValue: '' },
      { id: 'yearStart', label: 'Year Start', initialValue: 1750 },
      { id: 'yearEnd', label: 'Year End', initialValue: 1775 },
      { id: 'origin', label: 'Origin', initialValue: '' },
      { id: 'minCM', label: 'Min cM', initialValue: 0 }
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
    state.filterConfig = filterConfig;

    return (
        <TableWrapper state = {state} >
          <GenericToolbar state ={state}/>
          <GenericTable state ={state}/>
        </TableWrapper>
    );

}


export default Poi;
