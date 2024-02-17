import React, { Component } from 'react'; 
import { MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import {useStyles} from './styleFuncs.jsx';
import { displayLoadingScreen, displayErrors } from '../../shared/common';


export default function MapWrapper(props) {


 // console.log('TableWrapper called');

 const {state, children} = props;

 const theme = useTheme();

 const classes = useStyles(theme);

 var displayComponent = () => {    
   return(<div>{children}</div>);
 }

 if(state){
  if(state.loading ?? false)
    displayComponent = displayLoadingScreen;

  if(state.errors?.length >0 ?? false)
    displayComponent = () => {return (displayErrors(state.errors))}
 }
 

 return (
   <div >
    {displayComponent()}
   </div>
 );
}
