import React, { Component, useState,useEffect } from 'react'; 
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GEDTable from './GEDTable';
import { useTheme } from '@mui/material/styles';

import {useStyles} from './styleFuncs.jsx';
import {getPlaceInfo,getPeopleInfo, addGed} from './data.jsx';
import { MuiFileInput } from 'mui-file-input';
import {Button} from '@mui/material';

function PlaceStats(props){    
    const theme = useTheme();
    const classes = useStyles(theme);
    let {timeStamp} = props;
    
    const [placeStats,setPlaceStats] = React.useState({
        placesCount: 60,
        badLocationsCount: 70,
        unsearched: 80,
        notFound: 90
    });

    useEffect(() => {
        getPlaceInfo().then((data) => {
            if(data)
                setPlaceStats(data);
        });
    }, [timeStamp]);


    return (
        <div>
            <div className={classes.sectionHeader}>Place Stats</div>
            <div id="placesCount">Places: {placeStats.placesCount}</div>
            <div id="incompleteCount">Bad Names: {placeStats.badLocationsCount}</div>
            <div id="unsearchedCount">Unsearched: {placeStats.unsearched}</div>
            <div id="notfoundCount">Not Found: {placeStats.notFound}</div>
        </div>
    );

}
  

function PersonStats(props){    
    const theme = useTheme();
    const classes = useStyles(theme);
    let {timeStamp} = props;

    const [peopleStats,setPeopleStats] = React.useState({
        dupeEntryCount: 10,
        originMappingCount: 20,
        personViewCount: 30,
        marriagesCount: 40,
        treeRecordCount: 50
    });

    useEffect(() => {
        console.log('use effect person stats')
        getPeopleInfo().then((data) => {
            if(data)
                setPeopleStats(data);
        });
    }, [timeStamp]);


    return (
        <div>
            <div className={classes.sectionHeader}>People Stats</div>
            <div id="dupeCount">Dupes: {peopleStats.dupeEntryCount }</div> 
            <div id="originCount">Origin Mappings: {peopleStats.originMappingCount}</div>
            <div id="personCount">Persons: {peopleStats.personViewCount}</div>
            <div id="marriagecount">Marriages: {peopleStats.marriagesCount}</div>
            <div id="treerecordcount">Match Trees: {peopleStats.treeRecordCount}</div>
        </div>
    );

}



function ControlPanel(props) {  
    
    const theme = useTheme();
    const classes = useStyles(theme);
    const [timeStamp,setTimeStamp] = React.useState(Date.now());
    const [file, setFile] = React.useState(null);

    const importGEDClicked = (event,id) => {
        console.log('import GED clicked');
        addGed(()=>{
            setTimeStamp(Date.now());
            console.log('import GED clicked callback');
        }, file);
        //setTimeStamp(Date.now());
        event.preventDefault() ;
    };

    const importPeopleClicked = (event,id) => {
        console.log('import people clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;
    };
    const createDupeListClicked = (event,id) => {
        console.log('create dupe list clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;
    };
    const addMissingLocationsClicked = (event,id) => {
        console.log('add missing locations clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;

    };
    const geoCodeLocationsClicked = (event,id) => {
        console.log('geocode locations clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;
    }   ;
    const updatePlaceCacheClicked = (event,id) => {
        console.log('update place cache clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;
    };
    const updateCountyCountryClicked = (event,id) => {
        console.log('update county country clicked');
        setTimeStamp(Date.now());
        event.preventDefault() ;
    };
    
    

    const handleChange = (newFile) => {
      setFile(newFile);
    };



        return (
            <Box sx={{ flexGrow: 1 }} style={{width: '98%', margin: 'auto', height : '450px'}}>
              <Grid container spacing={2}>
                <Grid xs={5}>                   
                    <div className={classes.sectionHeader}>Uploaded GED  Files</div>
                    <GEDTable timeStamp = {timeStamp}></GEDTable>                    
                </Grid>                
                <Grid xs={3}>
                    <div className={classes.sectionHeader}>GED Files</div>
                    <MuiFileInput value={file} className= {classes.test}  placeholder="Upload image here..."  onChange={handleChange}>  </MuiFileInput>
                    <div>spacer</div>
                    {file &&  
                        <div> <Link id ="test" href="#" onClick = {(event,id)=>{importGEDClicked(event,file)} } >1.Import</Link></div>
                
                    }   
                
                    <div className={classes.sectionHeader}>People and Events</div>
                    <div><Link href="#" onClick = {(event,id)=>{importPeopleClicked(event,1)} } >1. Import Persons</Link></div>
                    <div><Link href="#" onClick = {(event,id)=>{createDupeListClicked(event,1)} }>2. Create Dupe List</Link></div>
                </Grid>
                <Grid xs={4}>
                    <div className={classes.sectionHeader}>Location Processing</div>
                    <div><Link href="#"onClick = {(event,id)=>{addMissingLocationsClicked(event,1)} }>1. Adding missing locations</Link></div>
                    <div><Link href="#"onClick = {(event,id)=>{geoCodeLocationsClicked(event,1)} }>2. GeoCode Location entries</Link></div>
                    <div><Link href="#"onClick = {(event,id)=>{updatePlaceCacheClicked(event,1)} }>3. Update Place Cache county and lat long fields</Link></div>
                    <div><Link href="#"onClick = {(event,id)=>{updateCountyCountryClicked(event,1)}}>4. Update County and Country fields of FTMPerson table</Link></div>
                </Grid>

                <Grid xs={2}>
                   <PersonStats timeStamp = {timeStamp}></PersonStats>
                </Grid>
                <Grid xs={3}>                   
                   <PlaceStats timeStamp = {timeStamp}></PlaceStats>
                </Grid>
                <Grid xs={7}>
                    <div className={classes.sectionHeader}>Feedback</div>

                </Grid>
              </Grid>
            </Box>
          );
    
}


export default ControlPanel;
