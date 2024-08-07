import React, { Component } from 'react';
import WillTable from './WillTable.jsx'
import { gql} from '@apollo/client';
import WillTableToolbar from './WillTableToolbar.jsx'
import TableWrapper from '../../../features/Table/TableWrapper.jsx';
import {getParams} from '../../../features/Table/qryStringFuncs';
import {useTableState} from '../../../features/Table/useTable';



function LincsWills() {


    const GET_WILLS = gql`
    query Query(
       $limit: Int!,
       $offset : Int!,
       $sortColumn: String!,
       $sortOrder : String!,
       $yearStart: Int!,
       $yearEnd : Int!,
       $ref: String!,
       $desc : String!,
       $place: String!,
       $surname : String!
     ){      
        lincssearch(pobj: {
                            limit : $limit,
                            offset : $offset,
                            sortColumn: $sortColumn,
                            sortOrder : $sortOrder,
                            yearStart: $yearStart,
                            yearEnd : $yearEnd,
                            refArg: $ref,
                            desc : $desc,
                            place: $place,
                            surname : $surname
                         }
                    ) {
         page
         totalRows
         rows {
              id
             description
             collection
             reference
             place
             year
             typ
             firstName
             surname
             occupation
             aliases
         }
       }      
    }
    `;

    const headCells = [
      { id: 'Year', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'Reference', numeric: false, disablePadding: true, label: 'Reference' },
      { id: 'Description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'Place', numeric: false, disablePadding: true, label: 'Place' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'Typ', numeric: false, disablePadding: true, label: 'Type' }
    ];


    var defaultValues = {
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 25,
      offset :0,
      yearStart : 1700,
      yearEnd : 1800,
      ref : '',
      desc : '',
      place : '',
      surname : ''
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_WILLS,params,'lincssearch');

    state.headCells = headCells;
    state.title = 'Lincolnshire will search';

    return (
        <div>
          <TableWrapper state = {state} >
            <WillTableToolbar state ={state}/>
            <WillTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default LincsWills;
