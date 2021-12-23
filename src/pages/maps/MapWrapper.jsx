import React, { Component } from 'react'; 
import { MuiThemeProvider } from "@material-ui/core/styles";
 
import {theme,useStyles} from './styleFuncs.jsx';
 

export default function MapWrapper(props) {


  const {state, children, theme} = props;

  const classes = useStyles(theme);

  if(!state.loading && state.error && state.error.graphQLErrors && state.error.graphQLErrors.length >0){
    return (
      <div>
        <pre>Bad: {state.error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
        </pre>
      </div>
    );
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
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
          {children.length > 1 && children[0]}

          {tp(state.loading)}
 
      </div>
    </MuiThemeProvider>
  );
}
