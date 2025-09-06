import React, { Component } from 'react';
import GenericTable from '../../../features/Table/GenericTable.jsx';
import { gql} from '@apollo/client';
import GenericToolbar from '../../../features/Table/GenericToolbar.jsx';
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
      { id: 'year', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'reference', numeric: false, disablePadding: true, label: 'Reference' },
      { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'place', numeric: false, disablePadding: true, label: 'Place' },
      { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
      { id: 'surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'typ', numeric: false, disablePadding: true, label: 'Type' }
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

    const filterConfig = [
      { id: 'yearStart', label: 'Year From', initialValue: 1700, className: 'smallFilter' },
      { id: 'yearEnd', label: 'Year To', initialValue: 1800, className: 'smallFilter' },
      { id: 'ref', label: 'Ref', initialValue: '', className: 'smallFilter' },
      { id: 'desc', label: 'Desc', initialValue: '', className: 'smallFilter' },
      { id: 'place', label: 'Place', initialValue: '', className: 'smallFilter' },
      { id: 'surname', label: 'Surname', initialValue: '', className: 'smallFilter' }
    ];

    var params = getParams(defaultValues);

    var state = useTableState(GET_WILLS,params,'lincssearch');

    state.headCells = headCells;
    state.title = 'Lincolnshire will search';
    state.filterConfig = filterConfig;

    return (
        <div>
          <TableWrapper state = {state} >
            <GenericToolbar state ={state}/>
            <GenericTable state ={state} rowKeyField="id"/>
          </TableWrapper>
        </div>
    );

}


export default LincsWills;