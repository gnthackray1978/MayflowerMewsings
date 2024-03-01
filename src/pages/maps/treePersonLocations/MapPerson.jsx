import  React, { useState, useEffect }  from 'react';

import MapPersonBody from './MapPersonBody.jsx';
import MappingToolbar from '../MappingToolbar.jsx';
import {getParams} from '../../../features/Table/qryStringFuncs';
import MapWrapper from '../MapWrapper'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';
import {pobj} from '../../../shared/common.js'

 
const parseLocations = (rawLocations) => {

  return rawLocations ? rawLocations.map(r => ({
    id: r.id,
    birthLat: r.birthLat,
    birthLong: r.birthLong,
    show: r.show,
    locationData: { trees: r.trees, ftmPersonSummary: r.ftmPersonSummary }
  })) : [];

} 

function MapPerson() {

    // var defaultValues = {
    //   yearStart : 1700,
    //   yearEnd : 1900,
    //   location : '',
    //   surname : '',
    //   origin : ''
    // };

    var params = getParams(pobj.defaults);

  
    const [filterParams, setFilterParams] = React.useState(params);

    const GET_FTMView = gql`
    query Query( ${pobj.params} ){      
         ftmlocsearch(${pobj.pobj}) {
         page
         totalRows
         error
         rows {
          ftmPersonSummary {
            firstName
            surname
            treeName
            yearStart
            yearEnd
          }
        	birthLat
        	birthLong
          locationName
          id
         }
       }
      
    }
    `;

    const headCells = [

      { id: 'yearStart', numeric: false, disablePadding: true, label: 'yearStart' },
      { id: 'yearEnd', numeric: false, disablePadding: true, label: 'yearEnd' },
      { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
      { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
      { id: 'BirthLocation', numeric: false, disablePadding: true, label: 'BirthLocation' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    
    var state = {
      rows: [],
      treeColours: [],
      filterParams: filterParams,
      headCells: headCells,
      title: 'Map View',
      errors: [],
      loading: true
    };

    useMapState(GET_FTMView,'ftmlocsearch', state);
      
    let tp = parseLocations(state.rows);
       
    console.log('MapPerson' );
    return (
        //rows treeColours
        <div>
       <MapWrapper>  

          <MappingToolbar state={{...state}}></MappingToolbar>
          <MapPersonBody locations={tp} treeColours={[...state.treeColours]}></MapPersonBody>
        </MapWrapper>
        </div>
    );

}


export default MapPerson;
