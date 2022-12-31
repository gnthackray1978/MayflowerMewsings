import  React, { useState, useEffect }  from 'react';
 
import GroupToolBar from './groupToolBar.jsx';
import MapWrapper from '../MapWrapper.jsx'
import GroupPlotterBody from './GroupPlotterBody.jsx';
 

const parseLocations = (rawLocations) => {
  let locations = [];

  if (rawLocations) {
    for (let r of rawLocations) {
      locations.push({
        id: r.id,
        birthLat: r.birthLat,
        birthLong: r.birthLong,
        show: r.show,
        locationData: { trees: r.trees, ftmPersonSummary: r.ftmPersonSummary }
      });
    }
  }

  return locations;
} 

function GroupPlotter() {
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

    let tp = parseLocations();

    return (
        <div>
          <MapWrapper state = {state} >
            <GroupToolBar state ={state}/>
            <GroupPlotterBody locations ={tp} treeColours = {state.treeColours}/>
          </MapWrapper>
        </div>
    );

}


export default GroupPlotter;
