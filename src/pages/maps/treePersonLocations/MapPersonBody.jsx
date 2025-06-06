import  React, { useState, useEffect }  from 'react';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import GoogleMapReact from 'google-map-react';
import {mapStyles} from '../styleFuncs.jsx';
import { useTheme } from '@mui/material/styles';


const defaultMapOptions = {
  styles: [
    {
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
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

// Base style common to all markers
const baseMarkerStyle = {
  height: 10,
  width: 10,
  cursor: 'pointer',
  zIndex: 10,
};

// Specific styles for diamond marker
const diamondSpecificStyle = {
  transform: 'rotate(45deg)',
};

// Specific styles for circle marker
const circleSpecificStyle = {
  border: '1px solid white',
  borderRadius: '50%',
};

  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '50px',
    width: 300,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    //padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  const locationNameStyle = {
    backgroundColor : 'aliceblue',
    width:'100%', 
    height:'35px' ,
    paddingLeft:'5px',
    paddingTop:'7px',
    color: 'black',
    fontWeight: 800,
    fontSize: '16px',
    marginBottom: '3px',
  };

  const treeTitleStyle = {
    color: 'black',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '2px',
    marginLeft: '2px',
  };




const InfoWindowTreeSection = (props) =>{
  const { ftmPersonSummary ,treeName} = props;

  const personEntryStyle = {
    color: 'black',
    fontWeight: 400,
    fontSize: '14px',
    marginLeft: '2px',
  };

  return(<div>
    { ftmPersonSummary && ftmPersonSummary.length > 0 && 
      ftmPersonSummary
        .filter((f) => f.treeName === treeName)
        .map((person, index) => (
        // Assuming person has a unique 'id' property. If not, a combination or index can be a fallback.
        <div key={person.id || `${treeName}-person-${index}`} style={personEntryStyle}>
          <span>{`${person.yearStart || ''} ${person.yearEnd || ''} `}</span>
          <span>{`${person.firstName || ''} ${person.surname || ''}`}</span>
        </div>
      ))
    }
  </div>
  );
};

const InfoWindow = (props) => {
  const { place
, onChildClick
   } = props;


  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        <div style={locationNameStyle}>{place.locationName}
          <IconButton
            style={{ position: 'absolute', right: 0, top: -2 }}
            onClick={() => onChildClick(place.id) }
          >
            <Close />
          </IconButton>
        </div>
        {place.trees && place.trees.length > 0 && place.trees.map((tree, index) => (
          <div key={`${place.locationName}-tree-${tree}-${index}`} style={{ paddingBottom: '10px' , marginLeft: '4px'}}>
            <div style={treeTitleStyle}>{tree}</div>
            <InfoWindowTreeSection ftmPersonSummary={place.ftmPersonSummary} treeName={tree} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Marker component
const Marker = ({show, place, treeColours, onChildClick }) => {
  if (!place.trees || place.trees.length === 0) {
    return null; // Explicitly return null if no trees
  }

  let actualMarkerColour = 'black';

  if (place.trees.length === 1 && treeColours) {
    const colourEntry = treeColours.find(f => f.treeName === place.trees[0]);
    if (colourEntry) {
      actualMarkerColour = colourEntry.colour;
    }
  }

  const specificStyle = place.trees.length === 1 ? circleSpecificStyle : diamondSpecificStyle;

  const markerStyle = {
    ...baseMarkerStyle,
    ...specificStyle,
    backgroundColor: show ? 'red' : actualMarkerColour,
  };

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindow place={place} onChildClick={onChildClick} />}
    </>
  );
};
 
  

function MapPersonBody(props) {

 
    const [locations, setLocations] = React.useState(props.locations);
    const [treeColours, setTreeColours] = React.useState(props.treeColours);

    useEffect(() => {
      setLocations(props.locations);
      setTreeColours(props.treeColours);  
    },[props.locations, props.treeColours]);

    //const {locations, treeColours} = props;

    const theme = useTheme();
    const classes = mapStyles(theme);


    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
    };

    var onChildClickCallback = (key) => {
     
        //console.log('onChildClickCallback: ', key);
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

   
    if(!locations)
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
            onChildClick={onChildClickCallback}
          >
            {locations && locations.length >0 && locations.map((location) => (
              

              <Marker
                  key={location.id}
                  lat={location.birthLat}
                  lng={location.birthLong} 
                  show ={location.show}
                  place={location.locationData}
                  treeColours ={treeColours}
                  onChildClick={onChildClickCallback}
                />

            ))}
          </GoogleMapReact>
        </div>  
      );
    }
  



}
 
export default MapPersonBody;
