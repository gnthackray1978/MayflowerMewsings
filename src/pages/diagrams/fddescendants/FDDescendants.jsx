import  React, { useState, useEffect }  from 'react';

import FDDescendantsBody from './FDDescendantsBody.jsx';
import DiagramToolbar from '../DiagramToolbar.jsx';

import DiagramWrapper from '../DiagramWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';
import {getParams,csvToFirstNumber} from '../../../features/Table/qryStringFuncs.jsx';

import {transformData, populateDescendantObjects} from '../drawinglib/graphDataFuncs.jsx';
import {VisControlsUI} from "../fddescendants/libs/VisControlsUI.js";
import {DataSource} from "./libs/DataSource.js";
import { connect } from "react-redux";
import {LayoutSettings} from "../fddescendants/libs/LayoutSettings.js";
import {ForceDirect} from "../fddescendants/libs/ForceDirect.js";
import {Graph} from "../fddescendants/libs/Graph.js";
import {Drawing} from "../fddescendants/libs/Drawing.js";
import {RenderLib } from '../fddescendants/libs/RenderLib.js';

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
 
  console.log('FDDescendants');
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

  state = {
    ... state,
   
    title : 'Map View'
  };

  let data = transformData(state.data,populateDescendantObjects);
 

  let Body = ()=>{return(<div>loading</div>)};

  if(data.newRows && data.newRows.length >0){
   
      var channel = mitt();
      var settings = new LayoutSettings();
  
      var diagUI = new VisControlsUI(channel, settings);
     
      var dataSource = new DataSource(data.newRows);
      
      let forceDirect = new ForceDirect(channel, settings, dataSource);

     // let _channel = forceDirect.channel;
      //but ForceDirect
      //force direct originally contained the rendering handler.
      //It was initialized like this.
      //new RenderingHandler(that.channel, layoutList, new RenderLib(graph, ctx));
  
  
      let graph = new Graph(channel);
  
      let renderer = new RenderLib(graph);
  
      var drawing = new Drawing(channel, graph, settings, dataSource);
  
      drawing.Init();
      
      function DrawingContainer(graph, drawing, renderer, settings, dataSource){
        this.graph = graph;
        this.drawing = drawing;
        this.renderer = renderer;
        this.settings =settings;
        this.dataSource = dataSource;
        this.forceDirect = forceDirect;

        this.energyCount = -9999;
        this.timeActive = 0;
        this.timer=0;
        this.timeInSeconds = 0;
        this.currentYear = 1950;
        this.IsValid = ()=>{return true;}
        this.resetTimer = ()=>{this.timer = 0;}
        this.setTime = (timestamp)=>{

          if (this.timeActive === 0 && !isNaN(timestamp)) {
            this.timeActive = timestamp;        
          }
    
         // let timeInSeconds = 0;
          // drawingContainer.timer = Math.floor(((drawingContainer.timeActive - drawingContainer.timer)/1000));
          if(!isNaN(timestamp) && timestamp != this.timeActive){
    
              let step = timestamp - this.timeActive;
              this.timeActive = timestamp; 
              this.timer += Number(step);
              this.timeInSeconds = Math.floor(this.timer/1000);
          }
    
        }  
      }

      let drawingContainer = new DrawingContainer(graph, drawing, renderer, settings, dataSource);

      //movement not implemented in fd trees so diagram toolbar 
      //will not work.
      diagUI.InitEvents();

        Body = ()=>{ return(<div>
          <DiagramToolbar  graph ={drawingContainer} state ={state}/>
          <FDDescendantsBody  drawingContainer ={drawingContainer} />
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

    selectedTreePersonData : state.ux.selectedTreePersonData?.personId ?? 0 != 0 ? state.ux.selectedTreePersonData.personId :3217,
    selectedTreeData : state.ux.selectedTreeData != '' ? state.ux.selectedTreeData : '_34_Kennington'
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(FDDescendants);


