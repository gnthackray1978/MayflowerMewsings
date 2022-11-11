import React, { Component } from 'react';
import PoiTable from './PoiTable.jsx'
import PoiTableToolbar from './PoiTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function Poi() {
    const GET_Poi = gql`
    query Dna(
       $limit: Int!,
       $offset : Int!,
       $sortColumn: String!,
       $sortOrder : String!,
       $surname : String!,
        $country : String!,
        $mincm : Int!,
        $location : String!,
        $yearStart : Int!,
        $yearEnd : Int!,
        $name: String!
     ){
      dna{
        poisearch(limit : $limit,
               offset : $offset,
               sortColumn: $sortColumn,
               sortOrder : $sortOrder,
               surname : $surname,
                country : $country,
                mincm : $mincm,
                location : $location,
                yearStart : $yearStart,
                yearEnd : $yearEnd,
                name : $name
             ) {
         page
         totalResults
         results {
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

    var defaultValues = {
      sortColumn : 'yearStart',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
       yearStart :1700,
       yearEnd :1840,
       mincm :9,
       surname :'',
       location :'',
       country : 'England',
       name :'GNT GRT ATH'
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_Poi,params,'dna','poisearch');

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
