import  React, { useState, useEffect }  from 'react';

import AncestorsBody from './AncestorsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';
import {AncTree} from './AncTree';
import DiagramWrapper from '../DiagramWrapper.jsx'
import {transformData, populateAncestryObjects} from '../drawinglib/graphDataFuncs.jsx'
import {gql} from '@apollo/client';

import { connect } from "react-redux";
import {useMapState} from '../useMap';



function Ancestors(props) {

  const {selectedTreeData,selectedTreePersonData} = props;

  
  const GET_FTMView = gql`
  query Diagram(      
    $personId : Int!,
    $origin : String!
  ){    
      ancestorsearch( pobj : {
                personId : $personId,
                origin : $origin
              }
          ) {
              generationsCount
              maxGenerationLength
              totalRows
              rows {        
                        id
                        generationIdx
                        index
                        christianName
                        surname
                        childCount
                        childIdx,
                        childIdxLst
                        childLst
                        children
                        descendantCount
                        fatherId
                        fatherIdx        
                        isDisplayed
                        isFamilyEnd
                        isFamilyStart
                        isHtmlLink
                        isParentalLink
                        motherId
                        motherIdx
                        personId
                        relationType
                        spouseIdxLst
                        spouseIdLst
                        birthLocation
                        christianName
                        surname
                        dob  
                      }
           }
      
  }
  `;
  console.log('setup query');

  var state = useMapState(GET_FTMView,'ancestorsearch',{
    personId : selectedTreePersonData,     
    origin : selectedTreeData.originDescription // originally this was written to use tree id, changed to use origindescription because we now can have multiple trees.
  });

  state = {
    ... state,   
    title : 'Ancestor View'
  };

  console.log('api returned: ' + state.errors);

  let data = transformData(state.data, populateAncestryObjects);
 
  const graph = new AncTree();

  graph.CreateWithDefaultValues(1,data.newRows);

  return ( 
      <div>
        <DiagramWrapper state = {state} >
          <DiagramToolbar graph ={graph} state ={state}/>
          <AncestorsBody graph ={graph} />
        </DiagramWrapper>
      </div>
  );

}


const mapStateToProps = state => {
  return { 

    selectedTreePersonData : state.ux.selectedTreePersonData.personId != 0 ? state.ux.selectedTreePersonData.personId :3217,
    selectedTreeData : state.ux.selectedTreeData != '' ? state.ux.selectedTreeData : '_34_Kennington'
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Ancestors);