import  React, { useState, useEffect }  from 'react';

import MapPersonBody from './MapPersonBody.jsx';
import MappingToolbar from '../MappingToolbar.jsx';
import {getParams} from '../../../features/Table/qryStringFuncs';
import MapWrapper from '../MapWrapper'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';

 
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

    var defaultValues = {
      yearStart : 1700,
      yearEnd : 1900,
      location : '',
      surname : '',
      origin : ''
    };

    var params = getParams(defaultValues);

  
    const [filterParams, setFilterParams] = React.useState(params);

    const GET_FTMView = gql`
    query Query(      
       $surname : String!,
       $yearFrom : Int!,
       $yearTo : Int!,
       $location : String!,
       $origin : String!,
       $limit: Int!,
       $offset: Int!,
        $minCM: Int!
     ){
      
        ftmlocsearch(pobj:{
                          surname : $surname,
                          yearFrom : $yearFrom,
                          yearTo : $yearTo,
                          location : $location,
                          origin : $origin,
                          limit: $limit,
                          offset: $offset,
                          minCM: $minCM
                  }
             ) {
         page
         totalRows
         error
         rows {
          ftmPersonSummary {
            firstName
            surname
            treeName
            yearFrom
            yearTo
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

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
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
