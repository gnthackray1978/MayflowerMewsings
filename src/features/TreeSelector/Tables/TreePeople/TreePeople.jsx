import React, { Component ,useEffect} from 'react';

import TreePeopleTable from './TreePeopleTable.jsx';
import TreePeopleTableToolbar from './TreePeopleTableToolbar.jsx';
import { connect } from "react-redux";
import TableWrapper from '../../../Table/TableWrapper.jsx';
import {useAvTreesState} from '../../../TreeSelector/Tables/AvailableTrees/useAvTreesState';
import {addTreePersonToCache} from "../../../uxActions.jsx";
import {gql} from '@apollo/client';

function TreePeople(props) {

   const {addTreePersonToCache} = props;

   // let origin = {origin : 0, originDescription : ''};

   // if(selectedTreeData)
   //   origin  = selectedTreeData;

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

    console.log('TreePeople');

    var state = useAvTreesState(GET_FTMView,{
                        page: 0,
                        limit : 15, 
                        sortColumn : 'cm',
                        sortOrder : 'desc',
                        offset :0,
                        origin :'', 
                        treeName : '',
                        yearStart : 1500,
                        yearEnd : 2000,
                        location : '',
                        surname : '',
                        minCM : 0
    },'ftmviewsearch');

    state.headCells = headCells;
    state.title = 'Tree People';
   
    useEffect(() => {
      if(!state.loading && state.errors.length ==0){
        addTreePersonToCache(state.rows);      
      }
    }, [state.loading]);  

    return (
        <div>
          <TableWrapper state = {state} >
            <TreePeopleTableToolbar state ={state}/>
            <TreePeopleTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


const mapStateToProps = state => {
  return {
   // selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    addTreePersonToCache: (rows) => dispatch(addTreePersonToCache(rows)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreePeople);
