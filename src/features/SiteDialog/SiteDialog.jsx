
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component , useEffect} from 'react';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import {PropTypes,func} from 'prop-types';
import {applicationSelected, siteDialogOpen, siteDialogClose} from "../uxActions.jsx";
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

    
    const {className, theme,classes,ShowAppListDialog, 
      applicationSelected, siteDialogClose} = props;


    let AppList = props.stateObj.sites;
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
  //  AppList: state.ux.appList
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
