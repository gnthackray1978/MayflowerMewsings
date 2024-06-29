import React, { Component , useEffect, useState} from 'react';
import { Grid, Link } from '@material-ui/core';
import { MuiFileInput } from 'mui-file-input';
import {useStyles} from './styleFuncs.jsx';
import { makeStyles } from '@material-ui/core/styles';
import {addGed, updatePlaceCacheLocations, updatePersonLocations,getGEDSelectionInfo,
    addPersonLocations,addPersons,addDupes} from './data.jsx';




const GedOperations = ({ file, handleChange,handleResponse,timeStamp }) => {

    const [gedinfo,setGedinfo] = React.useState({});

    

    const importGEDClicked = (event,id) => {
        addGed((response)=>{
            handleResponse('GED Imported', response);                       
        }, file);
        
        event.preventDefault() ;
    };

    const clearGEDClicked = (event,id) => {
            
        
        event.preventDefault() ;
    };
    
    const importPeopleClicked = (event,id) => {
        console.log('import people clicked');
        
        addPersons((response)=>{
            handleResponse('Imported People', response);                       
        });

        event.preventDefault() ;
    };
    
    const createDupeListClicked = (event,id) => {
        console.log('create dupe list clicked');
        
        addDupes((response)=>{
            handleResponse('Created Dupe List', response);
        });

        event.preventDefault() ;
    };
    const addMissingLocationsClicked = (event,id) => {
        console.log('add missing locations clicked');

        addPersonLocations((response)=>{
            handleResponse('Added Missing Locations to cache', response);
        });

        event.preventDefault() ;

    };
    
    const updatePlaceCacheClicked = (event,id) => {     
        updatePlaceCacheLocations((response)=>{
            handleResponse('Updated Place Cache', response);
        });

        event.preventDefault() ;
    };

    const updateCountyCountryClicked = (event,id) => {
        //geocoder controller
        console.log('update county country clicked');

        updatePersonLocations((response)=>{
            handleResponse('Updated place cache County and Country fields', response);
        });

        event.preventDefault() ;
    };
    

    useEffect(() => {
        getGEDSelectionInfo((data)=>{
          //  console.log('ged info');
            if(data && data.status == 'success'){
                setGedinfo(data.data);
                console.log('ged info: ' +data.data);
            }
          }
        );
    }, [timeStamp]);

    const classes = useStyles();

    return (
        <Grid container spacing={2} style = {{marginLeft : '5px'}}>
            <Grid xs={6}>
                <div className={classes.sectionHeader}>Upload GED files here</div>
                <MuiFileInput value={file} className={classes.test} placeholder="Upload image here..." onChange={handleChange} />
                <div></div>
                {file &&  
                    <div>
                        <span> <Link id="upload" href="#" onClick={(event) => importGEDClicked(event, file)}>Upload</Link></span>                        
                        <span> <Link id="clear-upload" href="#" onClick={(event) => clearGEDClicked(event, file)}>Clear</Link></span>                        
                    </div>
                }   
            </Grid>

            <Grid xs={6}>
                <div></div>
            </Grid>
            <Grid xs={12} >
                <div className={classes.sectionHeader} style ={{marginTop : '15px'}}>Operations</div>
                {(oktoprocess(gedinfo) || oktodupe(gedinfo)) && <div className={classes.sectionHeader}>People and Events</div>}                
                {oktoprocess(gedinfo) && <div><Link href="#" onClick={(event) => importPeopleClicked(event, 1)}>Import Persons</Link>
                    </div>}             
                {oktodupe(gedinfo) && <div><Link href="#" onClick={(event) => createDupeListClicked(event, 1)}>Create Dupe List</Link></div>}
                {(oktomissinglocs(gedinfo) || oktogeocode(gedinfo)|| oktoupdatecounties(gedinfo)) && <div className={classes.sectionHeader}>Location Processing</div>}
                {oktomissinglocs(gedinfo) && <div><Link href="#" onClick={(event) => addMissingLocationsClicked(event, 1)}>Adding missing locations</Link></div>}
                {oktogeocode(gedinfo) && <div><Link href="#" onClick={(event) => updatePlaceCacheClicked(event, 1)}>GeoCode Location entries</Link></div>}                            
                {oktoupdatecounties(gedinfo) && <div><Link href="#" onClick={(event) => updateCountyCountryClicked(event, 1)}>Update County and Country fields of FTMPerson table</Link></div>}
            </Grid>
        </Grid>
    );
};

export default GedOperations;

const oktoupdatecounties = (d)=>{
    if(!d) return false;

    if(!d.missingLocationsProcessed) return false;
   
    return true;
}

const oktogeocode = (d)=>{
    if(!d) return false;
 
    if(d.missingLocationsProcessed)
        return true;

    return false;
};

const oktomissinglocs =(d)=>{
    if(!d) return false;

    if(d.missingLocationsProcessed) return false;

    if(d.personsProcessed)
        return true;

    return false;
}



const oktoprocess =(d)=>{
    if(!d) return false;

    if(!d.personsProcessed)
        return true;

    return false;
};

const oktodupe =(d)=>{
    if(!d) return false;

    if(d.dupesProcessed) return false;

    if(d.personsProcessed && d.missingLocationsProcessed)
        return true;

    return false;
};

// if(d.personsProcessed)
// result += 'P';
// if(d.ccProcessed)
// result += 'C';
// if(d.geocodingProcessed)
// result += 'G';
// if(d.missingLocationsProcessed)
// result += 'M';
// if(d.dupesProcessed)
// result += 'D';