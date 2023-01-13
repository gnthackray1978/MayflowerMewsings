
import React, { Component } from 'react';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import {setLocations} from "../../../features/uxActions.jsx";
import {useToolbarStyles} from '../styleFuncs.jsx';
import TableBox from '../tableBox.jsx';

var outputCollection = function (maxNum,searchComplete) {
	this.maxNum = maxNum;   
	this.results = [];
  this.searchComplete = searchComplete;
};

outputCollection.prototype.addEntry = function (entry) { 
    
    this.results.push(entry);
    
    if(this.results.length == this.maxNum){
    	this.searchComplete(this.results);
    }
};



const GroupToolBar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  
  const {setLocations} = props;
  const { numSelected} = props.state;
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);
  
  const [county, setCounty] = React.useState('');
  const [rawLocations, setRawLocations] = React.useState('');
  // var results =[];
  // var idx = 0;

  var searchAddress = (geocoder, idx, lRawLocations, output) => {

    

    let d = lRawLocations[idx];

    if (!d)
        return;
 

    geocoder.geocode({
        address: d
    }, (results, status) => {

       
        var result = {
            placeformatted: d,
            success : false,
        };

        switch (status) {
            case "OVER_QUERY_LIMIT":
               
                setTimeout(function () {
                    console.log('re-search');
                    searchAddress(geocoder, idx, lRawLocations, output);
                }, 15000);

                break;
            case "INVALID_REQUEST":
                // code block
                
                setTimeout(function () {
                    console.log('skip');
                   
                    output.addEntry(result);
                    idx++; 
                    if (lRawLocations.length > idx)
                        searchAddress(geocoder, idx, lRawLocations, output);
                }, 3000);
                break;

            default:
                console.log('saving');
                result.results = JSON.stringify(results);
                result.success = true;
                output.addEntry(result);
               
                setTimeout(function () {
                    idx++;
                    searchAddress(geocoder, idx, lRawLocations, output);
                }, 500);
        }
         
    });

};



  const boxClick = ()=>{
  
    var idx =0;
    
    if(rawLocations.length == 0)
      return;

    if(county.length == 0)
      return;


    var locations = rawLocations.split('.').map((r) => {
      return r + ',' + county;
    });

    var output = new outputCollection(locations.length, (r) =>{       
      //console.log('output:' + r.length);
      setLocations(r);
    });

    var geocoder = new google.maps.Geocoder();

    searchAddress(geocoder, idx, locations, output);

  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
      
      <TextField className={classes.location} id="county" label="County"
        value={county}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setCounty(e.currentTarget.value);
        }}/>
    
      <TextField className={classes.surname} id="locations" label="Location"
        value={rawLocations}
        variant="standard"  size="small"
        onChange = {(e)=>{

          setRawLocations(e.currentTarget.value);
        }}/>


      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};

//export default ;
const mapStateToProps = state => {
  return { 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocations: (p) => dispatch(setLocations(p))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GroupToolBar);