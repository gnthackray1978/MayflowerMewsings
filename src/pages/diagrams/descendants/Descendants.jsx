import  React, { useState, useEffect }  from 'react';

import DescendantsBody from './DescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';
import DiagramWrapper from '../DiagramWrapper.jsx'
import {transformData, populateDescendantObjects} from '../drawinglib/graphDataFuncs.jsx';
import {gql} from '@apollo/client';
import { connect } from "react-redux";
import {getParams,csvToFirstNumber} from '../../../features/Table/qryStringFuncs.jsx';
import {useMapState} from '../useMap';
import {DescTree} from './DescTree';
import {setTitle} from "../../../features/uxActions.jsx";

function Descendants(props) {
 
   // console.log('Descendants');
   const {selectedTreePerson, setTitle} = props;
  
   //use the query string if its been populated.
   let params = getParams({persons : selectedTreePerson});
 
   let persons = csvToFirstNumber(params.persons);

    const GET_FTMView = gql`
    query Diagram(      
      $personId : String!,
      $origin : String!
    ){      
        descendantsearch( pobj : {
                            personId : $personId,
                            origin : $origin
                          }
            ) {
        generationsCount
        maxGenerationLength
        totalRows
        title
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

    var state = useMapState(GET_FTMView,'descendantsearch',{
      personId : persons,     
      origin : ''
      // originally this was written to use tree id, changed to use
      // origindescription because we now can have multiple trees.
    });

    state = {
      ... state,
     
      title : 'Map View'
    };

    if(!state.loading)
      setTitle(state.data.title);

    let data = transformData(state.data,populateDescendantObjects);

    const graph = new DescTree();
  
    graph.CreateWithDefaultValues(Number(persons),data.newRows);

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
    selectedTreePerson : state.ux.selectedTreePerson
  };
};

const mapDispatchToProps = dispatch => {
  return {    
    setTitle: (title) => dispatch(setTitle(title))
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(Descendants);
