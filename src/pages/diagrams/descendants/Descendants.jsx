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
      diagram{
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
          dOB  
        }
      }
      }
    }
    `;

    
    var params = getParams();

    console.log(params.origin + ' ' + params.personId);

    var state = useMapState(GET_FTMView,{
      personId : selectedTreePersonData,     
      origin : selectedTreeData
    });

    state = {
      ... state,
     
      title : 'Map View'
    };

    let data = transformData(state.data,'diagram','descendantsearch', populateDescendantObjects);


    
    const graph = new DescTree();
  
    let Body = ()=>{return(<div>loading</div>)};

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
        graph.UpdateGenerationState();
        graph.SetCentrePoint(0, 0);
      
        graph.RelocateToSelectedPerson();
      
        graph.bt_refreshData = false;

        
          Body = ()=>{ return(<div>
            <DiagramToolbar  graph ={graph} state ={state}/>
            <DescendantsBody  graph ={graph} />
        </div>)};
    }


    return ( 
        <div>
          <DiagramWrapper state = {state} >
            <Body/>
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
