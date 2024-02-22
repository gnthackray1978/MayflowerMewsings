import React, { Component , useEffect} from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useAvTreesState} from './useAvTreesState';
import {gql} from '@apollo/client';
import {addTreeToCache} from "../../../uxActions.jsx";
import { connect } from "react-redux";


function AvailableTrees(props) {

  const {addTreeToCache} = props;

  const get_availableTrees = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $treeName : String!
     $surname : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $location : String!,
     $origin : String!,
     $minCM : Int!
   ){
    
      treerecsearch(pobj : {
                            limit : $limit,
                            offset : $offset,
                            sortColumn: $sortColumn,
                            sortOrder : $sortOrder,
                            treeName : $treeName,
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
           cm
           personCount
           name
       }
     }
    
  }
  `;

    const headCells = [
        { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'PersonCount', numeric: false, disablePadding: true, label: 'Persons' },
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' }
    ];

    let defaults = {
                      page: 0,
                      limit : 25, 
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
                   };
  
    var state = useAvTreesState(get_availableTrees,defaults,'treerecsearch');
    
    state.headCells = headCells;
    state.title = 'Available Trees';
                  
    useEffect(() => {
      if(!state.loading && state.errors.length ==0){
          addTreeToCache(state.rows);      
      }
    }, [state.loading]);  

    return (
        <div>
          <TableWrapper state ={state} >
            <AvailableTreesToolbar state ={state}/>
            <AvailableTreesTable state ={state}/>
          </TableWrapper>
        </div>
    );

}

const mapStateToProps = state => {
  return { 
 //   selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTreeToCache: (rows) => dispatch(addTreeToCache(rows)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AvailableTrees);