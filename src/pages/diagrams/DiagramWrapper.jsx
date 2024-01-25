//todo clone off maps mapwrapper !! merge them together 

import React, { Component } from 'react'; 
import { MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import {useStyles} from './styleFuncs.jsx';
 

function displayErrors(errors){
  console.log('displayErrors called');

  if(errors && errors.length >0){
    return (<div>
      <h5><span style={{color: "red", padding: "20px"} } >Errors</span></h5>
      <ul>  
      {
       errors.map((row, index) => {return(<li>{row}</li>);})        
      }
      </ul>  
    </div>);
  }
  else{
    return (<div></div>);
  }
}

export default function DiagramWrapper(props) {


  const {state, children} = props;

  const theme = useTheme();
  const classes = useStyles(theme);


  if(state.errors.length >0){
    return(displayErrors(state.errors));
  }


  let tp = (loading) => {

    var child;

    if(children.length > 1){
      child = children[1];
    }
    else{
      child = children;
    }

    if(loading){
      return (
        <div  >
          <h5 className = {classes.loadingscreenh5} ><span style={{color: "blue", padding: "20px"} } >loading...</span></h5>
          {child}
        </div>
      );
    }
    else{
      return(<div>
        
        {child}
      </div>);
    }

  };

  return (
    <div className={classes.root}>
        {children.length > 1 && children[0]}

        {tp(state.loading)}

    </div>
  );
}
