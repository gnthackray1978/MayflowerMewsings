import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { Component , useEffect} from 'react'; 
import { useTheme } from '@mui/material/styles';
import {siteDialog} from '../styleFuncs.jsx';
import {PropTypes,func} from 'prop-types';
import {applicationSelected, siteDialogOpen, siteDialogClose} from "../uxActions.jsx";
import {useNavigate} from "react-router-dom";

import { connect } from "react-redux";

function GetSiteList(results, applicationSelected, siteDialogClose,navigate){

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
                                navigate('/'+ev.currentTarget.dataset.default);
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

    
    const {ShowAppListDialog, applicationSelected, siteDialogClose} = props;

    //console.log('SiteDialog: ' + props);

    const theme = useTheme();

    const classes = siteDialog(theme);

    let AppList = props.stateObj.sites;
    let navigate = useNavigate();


    var items = GetSiteList(AppList, applicationSelected, siteDialogClose,navigate);

    return (
      <Dialog onClose={siteDialogClose} aria-labelledby="simple-dialog-title" open = {ShowAppListDialog}>
        <div>
         {items}
        </div>
      </Dialog>
    );

}




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


export default connect(mapStateToProps, mapDispatchToProps)(SiteDialog);
