import React, { Component } from 'react';
import SourceTable from './SourceTable.jsx'
import { gql} from '@apollo/client';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import SourceTableToolbar from './SourceTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useTableState} from '../../../../features/Table/useTable';

function Sources() {


  const GET_SOURCES = gql`
  query Adb(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $location: String!,
     $sourceRef : String!,
     $yearStart : Int!,
     $yearEnd : Int!

   ){
    adb{
      sourcesearch(
                     limit : $limit,
                     offset : $offset,
                     sortColumn: $sortColumn,
                     sortOrder : $sortOrder,
                     location: $location,
                     sourceRef : $sourceRef,
                     yearStart : $yearStart,
                     yearEnd: $yearEnd

           ) {
       page
       totalResults
       results {
                  id
                  sourceRef
                  sourceDate
                  sourceDateTo
                  sourceDescription
                  originalLocation
                  isCopyHeld
                  isViewed
                  isThackrayFound
       }
     }
    }
  }
  `;


    const headCells = [
      { id: 'sourceRef', numeric: false, disablePadding: true, label: 'Ref' },
      { id: 'sourceDate', numeric: false, disablePadding: true, label: 'Year From' },
      { id: 'sourceDateTo', numeric: false, disablePadding: true, label: 'Date To' },
      { id: 'originalLocation', numeric: false, disablePadding: true, label: 'OriginalLocation' },
      { id: 'isCopyHeld', numeric: false, disablePadding: true, label: 'CopyHeld' },
      { id: 'isViewed', numeric: false, disablePadding: true, label: 'Viewed' },
      { id: 'isThackrayFound', numeric: false, disablePadding: true, label: 'Thackray' }

    ];

    var state = useTableState(GET_SOURCES,{
      sortColumn : 'sourceRef',
      sortOrder : 'asc',
      limit : 0,
      offset :25,
      yearStart : 1500,
      yearEnd: 1800,
      location :'',
      sourceRef : ''
    },'adb','sourcesearch');

    state.headCells = headCells;
    state.title = 'Source Search';

    return (
      <div>
        <TableWrapper state = {state} >
          <SourceTableToolbar state ={state}/>
          <SourceTable state ={state}/>
        </TableWrapper>
      </div>
    );

}


export default Sources;
