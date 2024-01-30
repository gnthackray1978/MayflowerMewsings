import React, { Component , useEffect} from 'react';
import AvailableTreesTable from './AvailableTreesTable.jsx'
import AvailableTreesToolbar from './AvailableTreesToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {getParams} from '../../../../features/Table/qryStringFuncs.jsx';
import {useAvTreesState} from './useAvTreesState';
import {gql} from '@apollo/client';
import {setTree} from "../../../uxActions.jsx";
import { connect } from "react-redux";
import {useSearchParamsState} from '../../../../shared/useSearchParamsState.jsx';

function AvailableTrees(props) {
  
  const [greeting, setGreeting] = useSearchParamsState("greeting", "hello");

  const {setTree,selectedTreeData} = props;

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
        { id: 'PersonCount', numeric: false, disablePadding: true, label: 'Person Count' },
        { id: 'CM', numeric: false, disablePadding: true, label: 'CM' }
    ];

    let queryString = getParams({
         sortColumn : 'cm',
         sortOrder : 'desc',
         limit : 0,
         offset :0,
         origin :selectedTreeData?.originDescription ?? '',
        // originDescription :selectedTreeData?.originDescription ?? '',
         treeName : '',
         yearStart : 1500,
         yearEnd : 2000,
         location : '',
         surname : '',
         minCM : 0
    });

    

    var state = useAvTreesState(get_availableTrees,queryString,'treerecsearch');

    state.headCells = headCells;
    state.title = 'Available Trees';
    state.setSelection();

    setGreeting('hello2');
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