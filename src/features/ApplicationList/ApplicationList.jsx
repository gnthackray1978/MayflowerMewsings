import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

import SelectionToolBar from "./SelectionToolBar.jsx";
import {applicationListLoaded} from "../uxActions.jsx";
import {useAuthProvider} from "../../shared/IDSConnect/AuthProvider.jsx";

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

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;
// function Dogs({ onDogSelected }) {
//   const { loading, error, data } = useQuery(GET_DOGS);
//
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;
//
//   return (
//     <select name="dog" onChange={onDogSelected}>
//       {data.dogs.map(dog => (
//         <option key={dog.id} value={dog.breed}>
//           {dog.breed}
//         </option>
//       ))}
//     </select>
//   );
// }

function ApplicationList(props) {


  const { loading, error, data } = useQuery(GET_DOGS);
  
  console.log('ApplicationList ' + data);

  const { classes, closeDrawer, applicationListLoadedInternal} = props;

  return (
      <div className = "inner">
         <AppBar position="static">
           <Toolbar>
               <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={closeDrawer} >
                 <MenuIcon/>
               </IconButton>

               <Button color="inherit" className ={classes.tolowerBtn}>
                 <Typography variant="h6" color="inherit" >
                   Select Item
                 </Typography>
               </Button>

           </Toolbar>
         </AppBar>
         <List>

         </List>
         <SelectionToolBar/>
      </div>
  );

}


ApplicationList.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer : PropTypes.func
};

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationListLoadedInternal: () => dispatch(applicationListLoaded()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ApplicationList));
