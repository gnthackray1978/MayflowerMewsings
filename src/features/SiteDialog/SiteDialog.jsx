import AddIcon from '@material-ui/icons/Add';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ControlIcon from '@material-ui/icons/OpenWith';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/FeedBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import NavigationIcon from '@material-ui/icons/Navigation';
import PersonIcon from '@material-ui/icons/Person';

import React, { Component , useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import {PropTypes,func} from 'prop-types';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {applicationListLoad, applicationSelected, siteDialogOpen, siteDialogClose} from "../uxActions.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";



import { connect } from "react-redux";

const styles = theme => ({
  // fab: {
  //   margin: theme.spacing(1),
  // },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
  flexGrow: 1,
  },
  grow: {
    marginLeft: 50,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tolowerBtn : {
    textTransform: 'none'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

});


// const GET_DOGS = gql`
// query {
//   site {
//     search(query: "Star Wars") {
//       page
//       results {
//         id,
//         name,
//         defaultPageName,
//         defaultPageTitle
//       }
//     }
//   }
// }
// `;


function GetSiteList(results, applicationSelected, siteDialogClose,history){
//site.search.results[0].name


  //console.log('SiteDialog');
  if(results){



    var retVal = results.map(site => {
           return(<ListItem key={site.id}
                            data-id={site.id}
                            data-name={site.name}
                            data-default={site.defaultPageName}
                            button
                            onClick ={(ev)=>{
                                applicationSelected(ev.currentTarget.dataset.id);
                                siteDialogClose();
                                history.push('/'+ev.currentTarget.dataset.default);
                             //   console.log(`Button ${ev.currentTarget.dataset.default} clicked`);
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


function SiteDialog(props) {

    const {className, theme,classes,ShowAppListDialog, applicationSelected, siteDialogClose, AppList} = props;


    let history = useHistory();


    var items = GetSiteList(AppList, applicationSelected, siteDialogClose,history);

    return (
      <Dialog onClose={siteDialogClose} aria-labelledby="simple-dialog-title" open = {ShowAppListDialog}>
        <div>
         {items}
        </div>
      </Dialog>
    );

}

SiteDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};


const mapStateToProps = state => {


  return {
    ShowAppListDialog: state.ux.showAppListDialog,
    AppList: state.ux.appList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationSelected: (selectedApp) => dispatch(applicationSelected(selectedApp)),
    siteDialogOpen: () => dispatch(siteDialogOpen()),
    siteDialogClose: () => dispatch(siteDialogClose()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteDialog));
