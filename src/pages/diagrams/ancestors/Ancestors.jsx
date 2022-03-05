import  React, { useState, useEffect }  from 'react';

import AncestorsBody from './AncestorsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';
import {AncTree} from '../../diagrams/drawinglib/static/AncTree';
import DiagramWrapper from '../DiagramWrapper.jsx'
import {transformData, populateAncestryObjects} from '../diagFuncs.jsx'
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
    diagram{
      ancestorsearch(
                personId : $personId,
                origin : $origin
          ) {
              generationsCount
              maxGenerationLength
              totalResults
              results {        
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
                        dOB  
                      }
           }
      }
  }
  `;

  var state = useMapState(GET_FTMView,{
    personId : selectedTreePersonData,     
    origin : selectedTreeData
  });

  state = {
    ... state,
   
    title : 'Ancestor View'
  };

  let data = transformData(state.data,'diagram','ancestorsearch', populateAncestryObjects);

 
  const graph = new AncTree();
 
  if(data.newRows && data.newRows.length >0){
       
      //console.log('Diagrams load with new anc tree ' + a );
 
      var _zoomLevel = 100;
      

      graph.selectedPersonId = 3217;
      graph.selectedPersonX = 0;
      graph.selectedPersonY = 0;

      graph.SetInitialValues(Number(_zoomLevel), 30.0, 170.0, 70.0, 
                      70.0, 100.0, 20.0, 40.0, 20.0, screen.width, screen.height);

      //    var _personId = '913501a6-1216-4764-be8c-ae11fd3a0a8b';
      //    var _zoomLevel = 100;
      //    var _xpos = 750.0;
      //    var _ypos = 100.0;
      

      graph.generations = data.newRows;
 
        graph.SetCentrePoint(0, 0);
      
        graph.RelocateToSelectedPerson();
      
        graph.bt_refreshData = false;

      
  }

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