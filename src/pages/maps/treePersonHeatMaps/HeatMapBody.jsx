import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapStyles} from '../styleFuncs.jsx';
import { useTheme } from '@mui/material/styles';


const defaultMapOptions = {
  styles: [
    {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      
      "stylers": [{ "visibility": "off" }]
    }
  ]
};

const defaultProps = {
  center: {
    lat: 52.1270660000,
    lng: -0.2151950000
  },
  zoom: 5
};

function HeatMapBody(props) {

    const [rows, setRows] = React.useState(props.rows);
    
    const theme = useTheme();
    const classes = mapStyles(theme);


    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
    };


    //console.log('HeatMapBody: '+rows);
    if(!rows)
    {
      return (<div className={classes.noData}>No Data</div>);
    }
    else{
      return (
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyC4xE7VpfxqbdKcH19lze4LDxHX4e5nqLU' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            options={defaultMapOptions}
            heatmapLibrary={true}          
            heatmap={rows}
          >         
          </GoogleMapReact>
        </div>  
      );
    }
  

}
 
export default HeatMapBody;
