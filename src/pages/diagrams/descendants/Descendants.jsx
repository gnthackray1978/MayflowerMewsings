import  React, { useState, useEffect }  from 'react';

import DescendantsBody from './DescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'

import {transformData, populateDescendantObjects} from '../diagFuncs.jsx';

import {gql} from '@apollo/client';
import { connect } from "react-redux";
import {useMapState} from '../useMap';


 

function Descendants(props) {
 
    const {selectedTreeData,selectedTreePersonData} = props;



    const GET_FTMView = gql`
    query Diagram(      
      $personId : Int!,
      $origin : String!
    ){
      diagram{
        descendantsearch(
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
     
      title : 'Map View'
    };

    let data = transformData(state.data,'diagram','descendantsearch', populateDescendantObjects);

    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <DiagramToolbar state ={state}/>
            <DescendantsBody rows ={data.newRows} />
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
