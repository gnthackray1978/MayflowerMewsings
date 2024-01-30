import React, { Component } from 'react';

import TreePeopleTable from './TreePeopleTable.jsx';
import TreePeopleTableToolbar from './TreePeopleTableToolbar.jsx';
import { connect } from "react-redux";
import TableWrapper from '../../../Table/TableWrapper.jsx';
import {useAvTreesState} from '../../../TreeSelector/Tables/AvailableTrees/useAvTreesState';

import {gql} from '@apollo/client';

function TreePeople(props) {

    const {selectedTreeData} = props;

    let origin = {origin : 0, originDescription : ''};

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
       $origin : String!,
       $minCM : Int!
     ){      
        ftmviewsearch(pobj : {
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
         error
         totalRows
         rows {
             id
             firstName
             surname
             location
             yearFrom
             yearTo
             personId
         }
       }
      
    }
    `;

    const headCells = [

      { id: 'Year', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' }
    ];

    var state = useAvTreesState(GET_FTMView,{
      sortColumn : 'surname',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      origin : origin.originDescription,
     // originDescription : origin.originDescription,
      minCM : 0
    },'ftmviewsearch');

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
