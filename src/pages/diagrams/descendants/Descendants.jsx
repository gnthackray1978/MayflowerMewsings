import  React, { useState, useEffect }  from 'react';

import DescendantsBody from './DescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';
import DiagramWrapper from '../DiagramWrapper.jsx'
import {transformData, populateDescendantObjects} from '../drawinglib/graphDataFuncs.jsx';
import {gql} from '@apollo/client';
import { connect } from "react-redux";
import {getParams} from '../queryParams';
import {useMapState} from '../useMap';
import {DescTree} from './DescTree';


function Descendants(props) {
 
    console.log('Descendants');
    const {selectedTreeData,selectedTreePersonData} = props;

    const GET_FTMView = gql`
    query Diagram(      
      $personId : Int!,
      $origin : String!
    ){      
        descendantsearch(
                  personId : $personId,
                  origin : $origin
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
          childIdxLst
          childLst
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

    
    var params = getParams();

    console.log(params.origin + ' ' + params.personId);

    var state = useMapState(GET_FTMView,'descendantsearch',{
      personId : selectedTreePersonData,     
      origin : selectedTreeData
    });

    state = {
      ... state,
     
      title : 'Map View'
    };

    let data = transformData(state.data,populateDescendantObjects);

    const graph = new DescTree();
  
    graph.CreateWithDefaultValues(1,data.newRows);

    return ( 
        <div>
          <DiagramWrapper state = {state} >
              <DiagramToolbar  graph ={graph} state ={state}/>
              <DescendantsBody  graph ={graph} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Descendants);
