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
import {funcListLoad, funcSelected, funcDialogOpen , funcDialogClose} from "../uxActions.jsx";
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



const GET_FUNCTIONS = gql`
query Function($appName: Int!) {
  function
  {
    search(appid: $appName) {
      page
      results {
        id
        name
        pageName
        pageTitle
      }
    }
  }
}
`;



// function Dogs({ onDogSelected }) {
//   const { loading, error, data } = useQuery(GET_DOGS);
//
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;

function GetFunctionList(data, funcSelected, closeFuncListDialog){


  if(data){
    var results = data.function.search.results;

    var retVal = results.map(site => {
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
     appName, ShowFuncListDialog, funcDialogOpen, funcDialogClose} = props;

  const { loading, error, data } = useQuery(GET_FUNCTIONS, {
    variables: { appName: Number(appName) },
    fetchPolicy: "no-cache",
    onCompleted : (data)=>{
      console.log(data);
      funcListLoad(data.function.search.results);
    }
  });

  var items = GetFunctionList(data,funcSelected,funcDialogClose);

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
    appName: state.ux.appName,
    ShowFuncListDialog: state.ux.showFuncListDialog
  };
};

//applicationListLoad
//applicationSelected

const mapDispatchToProps = dispatch => {
  return {
    funcListLoad: (list) => dispatch(funcListLoad(list)),
    funcSelected: (selectedApp) => dispatch(funcSelected(selectedApp)),
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ApplicationList));
