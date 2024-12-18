import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react';
import {mapStyles} from '../styleFuncs.jsx';
import { useTheme } from '@mui/material/styles';
import { connect } from "react-redux";

const defaultMapOptions = {
  styles: [
    {
      "featureType": "administrative",
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
 
 
// Marker component
const Marker = ({place }) => {  
    const label = {      
      cursor: 'pointer',
      background: 'white',
      fontWeight: 400,
      zIndex: 10,
    };

    return (
      <>
        <div style={label} >{place}</div>
      </>
    );   
};
 
  

function GroupPlotterBody(props) {

 
    const [mapRef, setMapRef] = React.useState();
 
    const {locations} = props;
    const theme = useTheme();
    const classes = mapStyles(theme); 
    //console.log('locations:' + locations.length);
    const handleApiLoaded = (map, maps) => {      
      if(!mapRef)
        setMapRef(map);
    };

    var onChildClickCallback = (key) => {
     
        let tpRows = locations;
        
        const index = tpRows.findIndex((e) => e.id === Number(key));
        
        if(index >= 0){
          tpRows[index].show = !tpRows[index].show; // eslint-disable-line no-param-reassign
        
          setLocations([...tpRows]);
        }
        else{
          setLocations([...tpRows]);
        }
    };
      
      if(mapRef && locations.length > 0){
        var bounds = new google.maps.LatLngBounds();

        for(var i=0;i<locations.length;i++) {
          bounds.extend(new google.maps.LatLng(locations[i].lat, locations[i].lng));
        }

        //center the map to the geometric center of all locations
        mapRef.setCenter(bounds.getCenter());

        mapRef.fitBounds(bounds);
    
        mapRef.setZoom(mapRef.getZoom()-1); 

      }

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
            onChildClick={onChildClickCallback}
          >
            {locations && locations.length >0 && locations.map((m) =>                           
               <Marker key={m.place_id} lat={m.lat} lng={m.lng} place={m.label} />
            )}
          </GoogleMapReact>
        </div>  
      );
    
  



}
 
const mapStateToProps = state => {
  return { 
    locations : state.ux.locations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GroupPlotterBody);

