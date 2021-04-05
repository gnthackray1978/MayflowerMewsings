import React, { Component } from 'react';
import SourceTable from './SourceTable.jsx'
import { gql} from '@apollo/client';

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
    const makeData = function(data){

      let rows = [];
      let totalRecordCount =0;

      if(!data) return {
          rows,
          totalRecordCount
        };

      let idx =0;

      while(idx < data.adb.sourcesearch.results.length){
        let tp = data.adb.sourcesearch.results[idx];

        rows.push(tp);

        idx++;
      }



      if(data && data.adb)
       totalRecordCount =  data.adb.sourcesearch.totalResults;

      return {
        rows,
        totalRecordCount
      };

    }

    return (
        <div>
          <SourceTable ReturnData = {GET_SOURCES} makeData = {makeData}></SourceTable>
        </div>
    );

}


export default Sources;
