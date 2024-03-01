import React, { Component } from 'react';
import PoiTable from './PoiTable.jsx'
import PoiTableToolbar from './PoiTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
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
        { id: 'ChristianName', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
        { id: 'BirthYear', numeric: false, disablePadding: true, label: 'Birth Year' },
        { id: 'BirthPlace', numeric: false, disablePadding: true, label: 'Location' },
        { id: 'BirthCounty', numeric: false, disablePadding: true, label: 'County' },
        { id: 'TestDisplayName', numeric: false, disablePadding: true, label: 'Testee' },
        { id: 'TestAdminDisplayName', numeric: false, disablePadding: true, label: 'Admin Name' },
        { id: 'SharedCentimorgans', numeric: false, disablePadding: true, label: 'cMs' }
    ];

    pobj.defaults.name = 'GNT GRT ATH';
    pobj.defaults.yearStart = 1750;
    pobj.defaults.yearEnd = 1775; 

    var params = getParams(pobj.defaults);

    var state = useTableState(GET_Poi,params,'poisearch');

    state.headCells = headCells;
    state.title = 'POI';

    return (
        <TableWrapper state = {state} >
          <PoiTableToolbar state ={state}/>
          <PoiTable state ={state}/>
        </TableWrapper>
    );

}


export default Poi;
