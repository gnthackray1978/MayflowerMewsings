import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { withStyles } from '@material-ui/core/styles';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';


import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {useMapState} from './useMap';
import {theme,useStyles} from './styleFuncs.jsx';
import TableHeaderFromState  from './TableHeaderFromState.jsx';


export default function MapWrapper(props) {


  const {state, children} = props;

  const classes = useStyles();

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
