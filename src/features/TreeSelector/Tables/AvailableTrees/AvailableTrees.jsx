import React, { Component , useEffect} from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {getParams} from '../../../../features/Table/qryStringFuncs.jsx';
import {useAvTreesState} from './useAvTreesState';
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
     $treeName : String!
   ){
    dna{
      treerecsearch(limit : $limit,
             offset : $offset,
             sortColumn: $sortColumn,
             sortOrder : $sortOrder,
             treeName : $treeName
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

    let queryString = getParams({
         sortColumn : 'cM',
         sortOrder : 'desc',
         limit : 0,
         offset :0,
         origin :selectedTreeData?.origin ?? '',
         originDescription :selectedTreeData?.originDescription ?? '',
         treeName : ''
    });

    

    var state = useAvTreesState(get_availableTrees,queryString,'dna','treerecsearch');

    state.headCells = headCells;
    state.title = 'Available Trees';
    state.setSelection();

    //console.log('updated available trees ' + state.treeSelectionState);



    useEffect(() => {      
      //console.log('updated available trees useffect');
      setTree({origin : state.origin, 
        originDescription: state.originDescription});
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

const mapStateToProps = state => {
  return { 
    selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTree: (selectedTrees) => dispatch(setTree(selectedTrees)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AvailableTrees);