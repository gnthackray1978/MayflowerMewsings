import React, { Component } from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../pages/table/TableWrapper.jsx'
import {useTableState} from '../../../../pages/table//useTable';
import {gql} from '@apollo/client';

function AvailableTrees() {


  const get_availableTrees = gql`
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
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' }
    ];

    var state = useTableState(get_availableTrees,{
         sortColumn : 'cM',
         sortOrder : 'desc',
         limit : 0,
         offset :0,
         origin : ''
    },'dna','treerecsearch');

    state.headCells = headCells;
    state.title = 'Available Trees';

    return (
        <div>
          <TableWrapper state = {state} >
            <AvailableTreesToolbar state ={state}/>
            <AvailableTreesTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default AvailableTrees ;
