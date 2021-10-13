import React, { Component , useEffect} from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../pages/table/TableWrapper.jsx'
import {useTableState} from './useTable';
import {gql} from '@apollo/client';
import {setTree} from "../../../uxActions.jsx";
import { connect } from "react-redux";

function AvailableTrees(props) {
  
  const {setTree,selectedTreeData} = props;

  const get_availableTrees = gql`
  query Dna(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $origin : String!
     $groupNumber : Int!
   ){
    dna{
      treerecsearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             origin : $origin,
             groupNumber : $groupNumber
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
         treeString :selectedTreeData ?? '',
         origin : '',
         groupNumber : 0
    },'dna','treerecsearch');

    state.headCells = headCells;
    state.title = 'Available Trees';
    state.setSelection();

    //console.log('updated available trees ' + state.treeString);



    useEffect(() => {      
      //console.log('updated available trees useffect');
      setTree(state.treeString);
    }, [state, setTree]);

    return (
        <div>
          <TableWrapper state = {state} >
            <AvailableTreesToolbar state ={state}/>
            <AvailableTreesTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


//export default AvailableTrees ;


const mapStateToProps = state => {
  return { 
    selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTree: (treeId) => dispatch(setTree(treeId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AvailableTrees);