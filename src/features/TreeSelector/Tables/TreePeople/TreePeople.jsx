import React, { Component } from 'react';

import TreePeopleTable from './TreePeopleTable.jsx';
import TreePeopleTableToolbar from './TreePeopleTableToolbar.jsx';
import { connect } from "react-redux";
import TableWrapper from '../../../../pages/table/TableWrapper.jsx'
import {useTableState} from '../../../../pages/table//useTable';

import {gql} from '@apollo/client';

function TreePeople(props) {

    const {selectedTreeData} = props;

    let origin ='';

    if(selectedTreeData)
      origin  = selectedTreeData;

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
         }
       }
      }
    }
    `;

    const headCells = [

      { id: 'Year', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' }
    ];

    var state = useTableState(GET_FTMView,{
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : origin
    },'dna','ftmviewsearch');

    state.headCells = headCells;
    state.title = 'Tree People';

    return (
        <div>
          <TableWrapper state = {state} >
            <TreePeopleTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


const mapStateToProps = state => {
  return {
    selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreePeople);
