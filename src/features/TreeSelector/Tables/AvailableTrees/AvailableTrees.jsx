import React, { Component , useEffect} from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useAvTreesState} from './useAvTreesState';
import {gql} from '@apollo/client';
import {addTreeToCache} from "../../../uxActions.jsx";
import { connect } from "react-redux";
import { pobj } from "../../../../shared/common.js";

function AvailableTrees(props) {

  const {addTreeToCache} = props;
          
  const get_availableTrees = gql`
  query Dna(${pobj.params}
   ){    
      treerecsearch(${pobj.pobj}) {
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
    
    var state = useAvTreesState(get_availableTrees, pobj.defaults,'treerecsearch');
    
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