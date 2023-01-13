import  React, { useState, useEffect }  from 'react';
 
import GroupToolBar from './groupToolBar.jsx';
import MapWrapper from '../MapWrapper.jsx'
import GroupPlotterBody from './GroupPlotterBody.jsx';
 


function GroupPlotter() {
    const [locations, setLocations] = React.useState([]);

    const headCells = [
      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var state = {    
      headCells : headCells,
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
