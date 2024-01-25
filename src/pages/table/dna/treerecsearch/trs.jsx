import React, { Component } from 'react';
import TrsTable from './TrsTable.jsx'
import TrsTableToolbar from './TrsTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function Trs() {


  const GET_Trs = gql`
  query Query(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $treeName : String!,
     $yearFrom :Int!,
     $yearTo : Int!,
     $minCM : Int!
   ){    
      treerecsearch(pobj: {
                            limit : $limit,
                            offset : $offset,
                            sortColumn: $sortColumn,
                            sortOrder : $sortOrder,
                            treeName : $treeName,
                            yearFrom : $yearFrom,
                            yearTo : $yearTo,
                            minCM : $minCM
                          }
                  ) {
       page
       totalRows
       rows {
           id
           cm
           located
           origin
           personCount
           name
       }
     }    
  }
  `;

    const headCells = [
        { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'PersonCount', numeric: false, disablePadding: true, label: 'Persons' },
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' },
        { id: 'Located', numeric: false, disablePadding: true, label: 'Located' },
        { id: 'Counties', numeric: false, disablePadding: true, label: 'Counties' }
    ];

    var defaultValues = {
      sortColumn : 'cM',
      sortOrder : 'desc',
      limit : 0,
      offset :0,
      treeName : '',
      yearFrom : 0,
      yearTo : 2000,
      minCM : 0
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_Trs,params,'treerecsearch');

    state.headCells = headCells;
    state.title = 'Trees Over View';

    return (
        <div>
          <TableWrapper state = {state} >
            <TrsTableToolbar state ={state}/>
            <TrsTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Trs ;
