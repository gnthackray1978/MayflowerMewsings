import  React, { useState, useEffect }  from 'react';

import HeatMapBody from './HeatMapBody.jsx';
import MappingToolbar from '../MappingToolbar.jsx';

import {getParams} from '../../../features/Table/qryStringFuncs';
import MapWrapper from '../MapWrapper.jsx'
import {gql} from '@apollo/client';

import {useMapState} from '../useMap';

 





function HeatMap() {

  var defaultValues = {
    yearStart : 1700,
    yearEnd : 1900,
    location : '',
    surname : '',
    origin : '',
    minCM: 0
  };

  var params = getParams(defaultValues);
  //console.log('params',params);

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
      
        ftmlatlngsearch(pobj:{                 
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
        	id
        	lat
          long
          weight
         }
       }
      
    }
    `;

    const headCells = [

      { id: 'YearFrom', numeric: false, disablePadding: true, label: 'YearFrom' },
      { id: 'YearTo', numeric: false, disablePadding: true, label: 'YearTo' },
      { id: 'Origin', numeric: false, disablePadding: true, label: 'Origin' }
    ];

    var state = {
      rows: [],
      treeColours: [],
      filterParams: filterParams,
      headCells: headCells,
      title: 'HeatMap View',
      errors: [],
      loading: true, 
    };


  useMapState(GET_FTMView,'ftmlatlngsearch',state);

   var data =  {    
     positions: state.rows,
      options: {   
        radius: 20,   
        opacity: 0.6
      }
    };

    return ( 
        <div>
          <MapWrapper state = {state} >
            <MappingToolbar state ={state}/>
            <HeatMapBody rows = {data} />
          </MapWrapper>
        </div>
    );

}


export default HeatMap;
