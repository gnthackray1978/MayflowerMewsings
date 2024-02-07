
import React, { Component } from 'react';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import {setLocations} from "../../../features/uxActions.jsx";
import {useToolbarStyles} from '../styleFuncs.jsx';
import TableBox from '../tableBox.jsx';
import {setParams} from '../../../features/Table/qryStringFuncs';
import {getParams} from '../../../features/Table/qryStringFuncs';


var outputCollection = function (maxNum,searchComplete) {
	this.maxNum = maxNum;   
  this.newResults =[];
  this.searchComplete = searchComplete;
};

outputCollection.prototype.addEntry = function (entry) { 
    
//  console.log('addEntry');
  
  var unparsed= JSON.parse(entry.rows)[0];
              
  var gLocat = unparsed.geometry.location;

  var label = unparsed.address_components[0].long_name + ' ' + unparsed.address_components[1].long_name;

  var place_id = unparsed.place_id;

  // return {lat: gLocat.lat, lng: gLocat.lng, label: label, place_id: place_id} 

  this.newResults.push({lat: gLocat.lat, lng: gLocat.lng, label: label, place_id: place_id, searchTerm : entry.placeformatted});

  let key = entry.placeformatted +  '|'+ Date.now();

 //   this.newResults.push(entry);
 // key should be combination of placeformatted and date
 //localStorage.setItem(key, value);   

    if(this.newResults.length == this.maxNum){
    	this.searchComplete(this.newResults);
    }
};

outputCollection.prototype.addLocalStorageEntry = function (entry) { 
    
//  console.log('addLocalStorageEntry');
  
  const myArr = JSON.parse(entry);
 
  this.newResults.push(myArr);

  let key = entry.placeformatted +  '|'+ Date.now();
 
    if(this.newResults.length == this.maxNum){
    	this.searchComplete(this.newResults);
    }
};

const GroupToolBar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  
  const {setLocations} = props;
  const { numSelected} = props.state;
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);
  

  // var results =[];
  // var idx = 0;

  var defaultValues = {
    county : 'lincolnshire',
    rawLocations : 'grantham.sleaford.bourne',
  };

  var params = getParams(defaultValues);

  const [county, setCounty] = React.useState(params.county);
  const [rawLocations, setRawLocations] = React.useState(params.rawLocations);


  var searchAddress = (geocoder, idx, lRawLocations, output) => {

    

    let d = lRawLocations[idx];

    if (!d)
        return;
 
    //look in local storage for this address here
   
    setTimeout(function () {
        idx++;
        searchAddress(geocoder, idx, lRawLocations, output);
    }, 500);


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
                 //  console.log('re-search');
                    searchAddress(geocoder, idx, lRawLocations, output);
                }, 15000);

                break;
            case "INVALID_REQUEST":
                // code block
                
                setTimeout(function () {
             //       console.log('skip');
                   
                    output.addEntry(result);
                    idx++; 
                    if (lRawLocations.length > idx)
                        searchAddress(geocoder, idx, lRawLocations, output);
                }, 3000);
                break;

            default:
           //     console.log('saving');
                result.rows = JSON.stringify(results);
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


      var defaultValues = {
        county : county,
        rawLocations : rawLocations,
      };
    
      setParams(defaultValues);

    //append county to each location
    var locationsToGeoCode = rawLocations.split('.').map((r) => {
      return r + ',' + county;
    });

    //initialise output collection
    var output = new outputCollection(locationsToGeoCode.length, (r) =>{       
      //console.log('output:' + r.length);
      setLocations(r);
    });

    var geocoder = new google.maps.Geocoder();

    searchAddress(geocoder, idx, locationsToGeoCode, output);

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