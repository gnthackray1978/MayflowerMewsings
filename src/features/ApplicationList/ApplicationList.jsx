import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

import SelectionToolBar from "./SelectionToolBar.jsx";
import {funcSelected, funcDialogOpen , funcDialogClose} from "../uxActions.jsx";
import {useAuthProvider} from "../../shared/IDSConnect/AuthProvider.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import './ApplicationList.css';

import { connect } from "react-redux";

const styles = theme => ({

  root: {
    paddingRight: theme.spacing.unit,
    minHeight : window.innerHeight -10
  },

  list: {
    width: 420,
  },

  fullList: {
    width: 'auto',
  },
  mygrid:{
    margin:'0px'
  },
  input:{
    width: '100px'
  },
  label: {

    textAlign: 'center',

  },
  toolBar: {
    paddingLeft :'12px',
    minHeight: '0px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
     top: 'auto',
     bottom: 0,
   },
});





function GetFunctionList(appName, functions, funcSelected, closeFuncListDialog,history, funcName){


  if(functions){

    var retVal = functions.filter(f => f.applicationId == appName).map(site => {
           return(<ListItem key={site.id}
                            data-id={site.id}
                            data-name={site.name}
                            data-page = {site.pageName}
                            button
                            onClick ={(ev)=>{

                                funcSelected(ev.currentTarget.dataset.id);
                                closeFuncListDialog();
                                history.push('/'+ev.currentTarget.dataset.page);
                            }}>
             <ListItemText primary={site.name} />
           </ListItem>);
         });

    return <List>{retVal}</List>;
  }
  else{
    return <List></List>;
  }
}

function ApplicationList(props) {
console.log('ApplicationList loaded ');
  const { classes, closeDrawer, funcListLoad, funcSelected,
    ShowFuncListDialog, funcDialogOpen, funcDialogClose, funcList, appName} = props;


  let history = useHistory();

  var items = GetFunctionList(appName,funcList,funcSelected,funcDialogClose,history);

  return (
      <div className = "inner">
         <AppBar position="static">
           <Toolbar>
               <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>{
                  //if(ShowFuncListDialog)
                    funcDialogClose(); //hopefully this is open when it's being cliucked on
                  // else
                  //   funcDialogOpen();
                 }} >
                 <MenuIcon/>
               </IconButton>

               <Button color="inherit" className ={classes.tolowerBtn}>
                 <Typography variant="h6" color="inherit" >
                   Select Item
                 </Typography>
               </Button>

           </Toolbar>
         </AppBar>
           {items}

      </div>
  );

}


ApplicationList.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer : PropTypes.func
};

const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
    funcList: state.ux.funcList,
    ShowFuncListDialog: state.ux.showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    funcSelected: (selectedApp) => dispatch(funcSelected(selectedApp)),
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ApplicationList));
