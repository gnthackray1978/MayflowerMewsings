import React, { Component } from 'react';
import TrsTable from './TrsTable.jsx'
import TrsTableToolbar from './TrsTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {gql} from '@apollo/client';
import {useTableState} from '../../../../features/Table/useTable';
import {getParams} from '../../../../features/Table/qryStringFuncs';

function Trs() {


  const GET_Trs = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $origin : String!
   ){
    dna{
      treerecsearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             origin : $origin
           ) {
       page
       totalResults
       results {
           id
           cM
           located
           origin
           personCount
           name
       }
     }
    }
  }
  `;

    const headCells = [
        { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'PersonCount', numeric: false, disablePadding: true, label: 'Person Count' },
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' },
        { id: 'Located', numeric: false, disablePadding: true, label: 'Located' },
        { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var defaultValues = {
      sortColumn : 'cM',
      sortOrder : 'desc',
      limit : 0,
      offset :0,
      origin : ''
    };

    var params = getParams(defaultValues);

    var state = useTableState(GET_Trs,params,'dna','treerecsearch');

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
