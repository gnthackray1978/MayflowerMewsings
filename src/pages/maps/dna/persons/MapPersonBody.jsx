import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapStyles} from '../../styleFuncs.jsx';
import { useTheme } from '@material-ui/core/styles';


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



const InfoWindowTreeSection = (props) =>{

  const { ftmPersonSummary ,treeName} = props;

  return(<div>
    { ftmPersonSummary.length >0 && ftmPersonSummary
        .filter((f)=>f.treeName == treeName).map((person) => (

        <div  style= {{'color': 'black', 'fontWeight': 400, 'fontSize': '14px', 'marginLeft' : '2px'}}>
    
          <span>{person.yearFrom + ' ' + person.yearTo + ' ' }</span>  
          <span>{person.firstName + ' ' + person.surname}</span>
        
        </div>
      
    )
    
    )}
  </div>
  );
};

const InfoWindow = (props) => {
  const { place } = props;

  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '50px',
    width: 300,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
      
        <div style= {{'color': 'black', 'fontWeight': 800, 'fontSize': '16px', 'marginBottom' : '3px'}}>{place.locationName}</div>
       

        { place.trees.length >0 && place.trees.map((tree) => (
          <div>
            <div style= {{'color': 'black', 'fontWeight': 600, 'fontSize': '14px', 'marginBottom' : '2px', 'marginLeft' : '2px'}}>{tree}</div>
            <InfoWindowTreeSection ftmPersonSummary ={ place.ftmPersonSummary} treeName = {tree}></InfoWindowTreeSection>
          </div>
        ))

        }


      </div>
    
    </div>
  );
};

// Marker component
const Marker = ({show, place, treeColours }) => {

  let markerColour = 'black';


  const diamondMarker = {
   
    height: 10,
    width: 10,
    backgroundColor: show ? 'red' : markerColour,
    transform: 'rotate(45deg)',
    cursor: 'pointer',
    zIndex: 10,
  };


  if(place.trees.length >0){

   // console.log('tree count: ' + place.trees.length + ' ' + place.locationName + ' '+treeColours.length);

    if(place.trees.length ==1){
      let colours = treeColours.filter(f => f.treeName === place.trees[0]);

      if(colours.length >0){
        markerColour = colours[0].colour;
      }

      const circleMarker = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: show ? 'red' : markerColour,
       
        cursor: 'pointer',
        zIndex: 10,
      };

      return (
        <>
          <div style={circleMarker} />
          {show && <InfoWindow place={place} />}
        </>
      );

    }

    return (
      <>
        <div style={diamondMarker} />
        {show && <InfoWindow place={place} />}
      </>
    );

  }
 
};
 
   
function MapPersonBody(props) {

    const [rows, setRows] = React.useState(props.rows);
    const [treeColours, setTreeColours] = React.useState(props.treeColours);

    const theme = useTheme();
    const classes = mapStyles(theme);


    const handleApiLoaded = (map, maps) => {
      // use map and maps objects
    };

    var onChildClickCallback = (key) => {
     
        let tpRows = rows;
        
        const index = tpRows.findIndex((e) => e.id === Number(key));
        
        if(index >= 0){
          tpRows[index].show = !tpRows[index].show; // eslint-disable-line no-param-reassign
        
          setRows([...tpRows]);
        }
        else{
          setRows([...tpRows]);
        }
    };

   
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
            onChildClick={onChildClickCallback}
          >
            {rows && rows.length >0 && rows.map((place) => (
              

              <Marker
                  key={place.id}
                  lat={place.birthLat}
                  lng={place.birthLong} 
                  show ={place.show}
                  place={place}
                  treeColours ={treeColours}
                />

            ))}
          </GoogleMapReact>
        </div>  
      );
    }
  

}
 
export default MapPersonBody;
