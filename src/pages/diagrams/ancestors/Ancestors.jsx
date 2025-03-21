import  React, { useState, useEffect }  from 'react';

import AncestorsBody from './AncestorsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';
import { AncestorDrawing } from './AncestorDrawing';
import DiagramWrapper from '../DiagramWrapper.jsx'
import {transformData, populateAncestryObjects} from '../drawinglib/graphDataFuncs.jsx'
import {gql} from '@apollo/client';
import {getParams,csvToFirstNumber} from '../../../features/Table/qryStringFuncs.jsx';
import { connect } from "react-redux";
import {useMapState} from '../useMap';
import {setTitle} from "../../../features/uxActions.jsx";


function Ancestors(props) {

  const {selectedTreePerson, setTitle} = props;
  
  //use the query string if its been populated.
  let params = getParams({persons : selectedTreePerson});

  let persons = csvToFirstNumber(params.persons);

  const GET_FTMView = gql`
  query Diagram(      
    $personId : String!,
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
              title
              error
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
    personId : persons,     
    origin : ''
  });

  state = {
    ... state,   
    title : 'Ancestor View'
  };

  console.log('api returned: ' + state.errors + ' ' + state.loading);

  //if(!state.loading)
  //  setTitle(state.data?.title ?? 'Ancestor View');

  useEffect(() => {
    setTitle(state.data?.title ?? 'Ancestor View');
  }, [state.loading]);


  let data = transformData(state.data, populateAncestryObjects);
 
  const graph = new AncestorDrawing();

  graph.CreateWithDefaultValues(Number(persons),data.newRows);

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

    selectedTreePerson : state.ux.selectedTreePerson 
   // selectedTreeData : state.ux.selectedTreeData != '' ? state.ux.selectedTreeData : '_34_Kennington'
  };
};

const mapDispatchToProps = dispatch => {
  return {    
    setTitle: (title) => dispatch(setTitle(title))
   };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Ancestors);