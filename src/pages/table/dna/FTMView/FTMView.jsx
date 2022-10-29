import React, { Component } from 'react';

import FTMViewTable from './FTMViewTable.jsx';
import FTMViewTableToolbar from './FTMViewTableToolbar.jsx';

import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';

import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function FTMView() {

    const GET_FTMView = gql`
    query Dna(
       $limit: Int!,
       $offset : Int!,
       $sortColumn: String!,
       $sortOrder : String!,
       $surname : String!,
       $yearStart : Int!,
       $yearEnd : Int!,
       $location : String!,
       $origin : String!
     ){
      dna{
        ftmviewsearch(limit : $limit,
                   offset : $offset,
                   sortColumn: $sortColumn,
                   sortOrder : $sortOrder,
                   surname : $surname,
                   yearStart : $yearStart,
                   yearEnd : $yearEnd,
                   location : $location,
                   origin : $origin
             ) {
         page
         totalResults
         results {
             id
             firstName
             surname
             location
             yearFrom
             yearTo
             origin
             birthLat
             birthLong
       
         }
       }
      }
    }
    `;

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var params = getParams();

    var state = useTableState(GET_FTMView,{
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
      yearStart : params.yearStart,
      yearEnd : params.yearEnd,
      location : params.location,
      surname : params.surname,
      origin : params.origin
    },'dna','ftmviewsearch');

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
