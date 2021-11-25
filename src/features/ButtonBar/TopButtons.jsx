import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import IDSConnect   from "../../shared/IDSConnect/Components/IDSConnect.jsx";
import {siteDialogOpen, siteDialogClose,funcDialogOpen,funcDialogClose} from "../uxActions.jsx";
import AppsIcon from '@material-ui/icons/Apps';
import {topButtonStyles} from '../styleFuncs.jsx';

/*
Buttons that go accross the top of the screen
funcdialogclose() is calling redux action and change state to open 
side bar

title in the centre is a button thats clickable
though no action has been assigned to it

siteDialogClose and open are actions that close and open 
list of site applications . 

the DATA from the server for applications and functions is loaded in main.jsx 
and stored in redux

*/ 

function getPageName(pagePath, funcList){

  console.log('get page name ');

  var path = pagePath.replace('/','');

  let idx =0;

  let appId =1;
  let pageId =0;
  let title = 'Default';

  while(idx < funcList.length){
    if(funcList[idx].pageName == path){
      appId = funcList[idx].applicationId;
      pageId = funcList[idx].id;
      title = funcList[idx].pageTitle;
    }
    idx++;
  }



  return {
    pageId,
    appId,
    title
  };
}

function TopButtons(props) {
  
    const classes = topButtonStyles();
  
    const {siteDialogOpen, siteDialogClose,
       showAppListDialog, ShowFuncListDialog, funcDialogOpen , 
       funcDialogClose, metaSubset} = props;
 
    //console.log('top buttons ' + SelectedFunc + ' ' + SelectedApp);
    var selection = getPageName(location.pathname, metaSubset.sites);

    return (
         <Toolbar>
             <IconButton className={classes.menuButton} color="inherit"
                aria-label="Menu" onClick= { ()=>
                    {
                      if(ShowFuncListDialog)
                        funcDialogClose();
                      else
                        funcDialogOpen();
                    }
                  }>
                 <MenuIcon />
             </IconButton>

             <Button color="inherit"  className={classes.grow}>
                 <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                     {selection.title}
                 </Typography>
             </Button>
             <IconButton className={classes.menuButton} color="inherit"
               aria-label="Menu"  onClick={()=>{
                  if(showAppListDialog)
                    siteDialogClose();
                  else
                    siteDialogOpen();
                  }}>
                 <AppsIcon />
             </IconButton>
             <IDSConnect mode = "login"  metaSubset = {metaSubset}/>

         </Toolbar>
     )
   

}

 

const mapStateToProps = state => {
 
  let showAppListDialog =  state.ux.showAppListDialog;
  let showFuncListDialog = state.ux.showFuncListDialog;
 
  return {
 
    ShowAppListDialog :showAppListDialog,
    ShowFuncListDialog :showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
    siteDialogOpen: () => dispatch(siteDialogOpen()),
    siteDialogClose: () => dispatch(siteDialogClose())
    //
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
