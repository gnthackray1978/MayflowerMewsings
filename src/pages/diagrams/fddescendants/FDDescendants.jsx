import  React, { useEffect, useMemo }  from 'react';

import FDDescendantsBody from './FDDescendantsBody.jsx';
import GraphControlsDialog from '../GraphControlsDialog.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';
import {getParams,csvToFirstNumber} from '../../../features/Table/qryStringFuncs.jsx';

import {transformData, populateDescendantObjects} from '../drawinglib/graphDataFuncs.jsx';
import {DataSource} from "./libs/DataSource.js";
import { connect } from "react-redux";
import {LayoutSettings} from "../fddescendants/libs/LayoutSettings.js";
import {Graph} from "../fddescendants/libs/Graph.js";
import {Drawing} from "../fddescendants/libs/Drawing.js";
import {RenderLib } from '../fddescendants/libs/RenderLib.js';
import {setTitle} from "../../../features/uxActions.jsx";

import mitt from 'mitt';

function makeData(data, schema, subSchema){

  console.log('make data desc' );

  let rows = [];

  if(!data) return rows;

  let idx =0;

  if(!data[schema][subSchema]){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return rows;
  }

  if(data[schema][subSchema].rows == null){
    console.log('usemap makedata: ' + schema + ' ' + subSchema + ' results were null');
    return rows;
  }

  while(idx < data[schema][subSchema].rows.length){
    let tp = data[schema][subSchema].rows[idx];

    rows.push( {
                   ...tp
               });

    idx++;
  }


  return {
    rows
  };

}


function FDDescendants(props) {
 

  const {selectedTreePerson, setTitle} = props;

  let params2 = getParams({persons : selectedTreePerson});
 
  let persons = csvToFirstNumber(params2.persons);

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
         error
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
  
  //var params = getParams();

  //console.log(params.origin + ' ' + params.personId);

  var state = useMapState(GET_FTMView,'descendantsearch',{
    personId : persons,     
    origin : ''
    // originally this was written to use tree id, changed to use
    // origindescription because we now can have multiple trees.
  });

  useEffect(() => {
    setTitle(state.data?.title ?? 'Descendant View');
  }, [state.loading]);

  const drawing = useMemo(() => {
    const data = transformData(state.data, populateDescendantObjects);
    if (!data.newRows?.some(gen => gen.length)) return null;
    const channel = mitt();
    const settings = new LayoutSettings();
    const dataSource = new DataSource(data.newRows);
    const graph = new Graph(channel);
    const renderer = new RenderLib(graph, settings);
    const result = new Drawing(channel, graph, renderer, settings, dataSource);
    result.selectedPersonId = persons;
    result.Init();
    return result;
  }, [state.data, persons]);


  return ( 
      <div>
        <DiagramWrapper state = {state} >
          {drawing ? <>
            <GraphControlsDialog graph={drawing} state={state} id="draggable" />
            <FDDescendantsBody drawingContainer={drawing} />
          </> : <div>loading</div>}
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


export default connect(mapStateToProps, mapDispatchToProps)(FDDescendants);


