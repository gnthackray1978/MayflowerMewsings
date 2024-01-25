import React, { Component } from 'react';

import FTMViewTable from './FTMViewTable.jsx';
import FTMViewTableToolbar from './FTMViewTableToolbar.jsx';

import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';

import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function FTMView() {

    const GET_FTMView = gql`
    query Query(
       $limit: Int!,
       $offset : Int!,
       $sortColumn: String!,
       $sortOrder : String!,
       $surname : String!,
       $yearStart : Int!,
       $yearEnd : Int!,
       $location : String!,
       $origin : String!,
       $minCM : Int!
     ){
      
        ftmviewsearch(pobj :{ 
                        limit : $limit,
                        offset : $offset,
                        sortColumn: $sortColumn,
                        sortOrder : $sortOrder,
                        surname : $surname,
                        yearFrom : $yearStart,
                        yearTo : $yearEnd,
                        location : $location,
                        origin : $origin,
                        minCM : $minCM
                    }
             ) {
         page
         totalRows
         error
         rows {
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
    `;

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var defaultValues = {
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 50,
      offset :0,
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : '',
      minCM : 0
    };

    var params = getParams(defaultValues);

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
