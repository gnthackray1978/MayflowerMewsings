import  React, { useState, useEffect }  from 'react';
 
import GroupToolBar from './groupToolBar.jsx';
import MapWrapper from '../MapWrapper.jsx'
import GroupPlotterBody from './GroupPlotterBody.jsx';
 


function GroupPlotter() {
    const [locations, setLocations] = React.useState([]);
   
    var state = {    
      title : 'Map View'
    };
   
    return (
        <div>
          <MapWrapper state = {state} >
            <GroupToolBar state ={state}/>
            <GroupPlotterBody locations ={locations} treeColours = {state.treeColours}/>
          </MapWrapper>
        </div>
    );

}


export default GroupPlotter;
