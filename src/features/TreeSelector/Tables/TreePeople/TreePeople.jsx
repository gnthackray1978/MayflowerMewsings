import React, { Component ,useEffect} from 'react';

import TreePeopleTable from './TreePeopleTable.jsx';
import TreePeopleTableToolbar from './TreePeopleTableToolbar.jsx';
import { connect } from "react-redux";
import TableWrapper from '../../../Table/TableWrapper.jsx';
import {useAvTreesState} from '../../../TreeSelector/Tables/AvailableTrees/useAvTreesState';
import {addTreePersonToCache} from "../../../uxActions.jsx";
import {gql} from '@apollo/client';
import { pobj } from '../../../../shared/common.js';

function TreePeople(props) {

   const {addTreePersonToCache} = props;

   // let origin = {origin : 0, originDescription : ''};

   // if(selectedTreeData)
   //   origin  = selectedTreeData;

    const GET_FTMView = gql`
    query Dna(${pobj.params}  ){
        ftmviewsearch(${pobj.pobj}) {
         page
         error
         totalRows
         rows {
             id
             firstName
             surname
             location
             yearStart
             yearEnd
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

    var state = useAvTreesState(GET_FTMView,pobj.defaults,'ftmviewsearch');

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
