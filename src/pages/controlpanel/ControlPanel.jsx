import React, { Component, useState,useEffect } from 'react'; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GEDTable from './GEDTable';
import { useTheme } from '@mui/material/styles';
import {useStyles} from './styleFuncs.jsx';
import {getPlaceInfo,getPeopleInfo, selectGEDFile, deleteGEDFile} from './data.jsx';
import GedOperations from './GedOperations.jsx';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageContainer from './signalr/MessageContainer.jsx';

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
        getPlaceInfo((data)=>{
            if(data && data.status === 'success')
                setPlaceStats(data.data);
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
        getPeopleInfo((data)=>{
            if(data && data.status === 'success')
                setPeopleStats(data.data);        
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
    //const [timeStamp,setTimeStamp] = React.useState(Date.now());
    const [file, setFile] = React.useState(null);
    const [connection, setConnection] = useState();

    const initSettingsState = {
        timeStamp : Date.now(),
        messages: [{ msgType: 'announce', message: 'starting up'}]
    };

    const [settingsState, setSettingsState] = useState(initSettingsState);

    const handleResponse = (comment, response) => {
        setSettingsState(prevState => ({
            timeStamp: response.status === 'success' ? Date.now() : prevState.timeStamp,
            messages: [
                ...prevState.messages,
                {
                    msgType: response.status === 'success' ? 'success' : 'error',
                    message:  comment + `${response.status !== 'success' ? ': ' + response.data : ''}`,
                }
            ]
        }));

    };



    const handleChange = (newFile) => {
      setFile(newFile);
    };


    const start = () => {
        try {
          const connection = new HubConnectionBuilder()
                              //.withUrl("https://msgapiinput01.azurewebsites.net/hub/msgnotificationhub",
                              .withUrl("http://localhost:5001/hub/msgnotificationhub",
                                  { withCredentials: false })
                              .configureLogging(LogLevel.Information)
                              .build();
        
          connection.on("announce", function (message1, message2) {                            
            //  console.log("Notify" + user + ' ' + message);     
              let t = message1 + ' ' + message2;
             
             // setMessages( messages => [...messages, { msgType:'announce' , message: t }]);                 
                setSettingsState(prevState => ({
                    timeStamp: prevState.timeStamp,
                    messages: [...prevState.messages, { msgType: 'announce', message: t }],
                    locations: prevState.locations,
                    location: prevState.location
                }));
          });
          
          connection.on("crud", function (message1, message2) {                            
              //console.log("crud" + message1 + ' ' + message2 + ' ' + messages[0].message);     
             //let t = [...messages, { msgType:'crud' , message: message1 }] ;
             
           //   setMessages(messages =>[...messages, { msgType:'crud' , message: message1 }] );                 
                setSettingsState(prevState => ({
                    timeStamp: prevState.timeStamp,
                    messages: [...prevState.messages, { msgType: 'crud', message: message1 }],
                    locations: prevState.locations,
                    location: prevState.location
                }));
          });
  
          connection.on("refresh", function (message1, message2) {                            
            //  console.log("Notify" + user + ' ' + message);     
           //   let t = 'refresh: ' + message1;
             
         //     setMessages( messages => [...messages, { msgType:'refresh' , message: message1 }]);                 
                setSettingsState(prevState => ({
                    timeStamp: prevState.timeStamp,
                    messages: [...prevState.messages, { msgType: 'refresh', message: message1 }],
                    locations: prevState.locations,
                    location: prevState.location
                }));
          });
  
          connection.onclose(e => {
        //    setConnection();        
          });
    
          try {
              connection.start();
              console.log("SignalR Connected."); 
   
          } catch (err) {
              console.log(err);
            //  setTimeout(start, 5000);
          }
  
          setConnection(connection);
  
  
        } catch (e) {
          console.log(e);
        }
    }
     
    const clearClicked = (event) => {
        console.log('clearClicked ');
        
       // setMessages([{ msgType: 'announce', message: 'cleared'}]);
    
        setSettingsState(prevState => ({
            timeStamp: prevState.timeStamp,
            messages: [{ msgType: 'announce', message: 'cleared'}]
        }));
        event.preventDefault() ;
    };
    

    const selectGEDClick = (event, id) => {
        // console.log('select clicked: ' + id);
         
         selectGEDFile(id, ()=>{
             console.log('complete');
             setSettingsState(prevState => ({
                timeStamp: new Date(),// yes we need to refresh all the info screens
                messages: [...prevState.messages, { msgType: 'crud', message: 'GED Selected' }]
             }));
         });
     
         event.preventDefault() ;
    };
     
    const deleteGEDClick = (event, id) => {            
        deleteGEDFile(id, (result)=>{
            console.log('delete GED complete');
        
            if(result.status == 'success'){
                setSettingsState(prevState => ({
                    timeStamp: new Date(),// yes we need to refresh all the info screens
                    messages: [...prevState.messages, { msgType: 'crud', message: 'GED deleted'}]
                }));
            }
            else{
                setSettingsState(prevState => ({
                    timeStamp: prevState.timeStamp,
                    messages: [...prevState.messages, { msgType: 'error', message: result.data}]
                }));
            }
        
        });
    
        event.preventDefault() ;
    };
     


    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        
        if(!connection && settingsState?.messages.length === 1) {
            console.log('connect to hub');
            start();
        }        
    }, [settingsState?.messages]);

        return (
            <Box sx={{ flexGrow: 1 }} style={{width: '98%', margin: 'auto', height : '450px'}}>
                           
              <Grid container spacing={2}>
                <Grid xs={6}>                   
                    <div className={classes.sectionHeader}>Uploaded GED  Files</div>
                    <GEDTable timeStamp = {settingsState?.timeStamp} 
                        selectGEDClick ={selectGEDClick} deleteGEDClick={deleteGEDClick} ></GEDTable>   
                </Grid> 

                <Grid xs={3}>
                   <PersonStats timeStamp = {settingsState?.timeStamp}></PersonStats>
                </Grid>
                <Grid xs={3}>                   
                   <PlaceStats timeStamp = {settingsState?.timeStamp}></PlaceStats>
                </Grid>

                <Grid xs={6}>
                    <GedOperations timeStamp = {settingsState?.timeStamp} file ={file} 
                        handleChange = {handleChange} 
                        handleResponse = {handleResponse} ></GedOperations>
                </Grid>
               
                <Grid xs={6}>
                    <div className={classes.sectionHeader}>Feedback</div>
                    <MessageContainer messages = {settingsState?.messages} clearClicked = {clearClicked}></MessageContainer>              
                </Grid>
              </Grid>
            </Box>
          );
    
}


export default ControlPanel;
