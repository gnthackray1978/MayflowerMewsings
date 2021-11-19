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

function TopButtons(props) {
  
    const classes = topButtonStyles();
  
    const {siteDialogOpen, siteDialogClose,
       showAppListDialog, ShowFuncListDialog, funcDialogOpen , funcDialogClose, Title} = props;
 
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
                     {Title}
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
             <IDSConnect mode = "login"/>

         </Toolbar>
     )
   

}

 

const mapStateToProps = state => {
// console.log('top buttons ' );
  let appName =  state.ux.appName;
  let appList =  state.ux.appList;

  let funcName =  state.ux.funcName;
  let funcList =  state.ux.funcList;

  let showAppListDialog =  state.ux.showAppListDialog;
  let showFuncListDialog = state.ux.showFuncListDialog;

  let selectedApp ='Unknown';
  let selectedFunc = 'Unknown';
  let title ='';
  let idx=0;

  if(appList && appList.length >0){
    idx=0;

    while(idx < appList.length){
      if(appList[idx].id == appName){
        selectedApp = appList[idx].defaultPageTitle;
        title =  appList[idx].defaultPageTitle;
      }

      idx++;
    }
  }

  if(funcList && funcList.length >0){
    idx=0;

    while(idx < funcList.length){
      if(funcList[idx].id == funcName){
        selectedFunc = funcList[idx].pageTitle;
        title =  funcList[idx].pageTitle;
      }

      idx++;
    }
  }


  return {
    Title : title,
    SelectedFunc : selectedFunc,
    SelectedApp: selectedApp,
    ShowAppListDialog :showAppListDialog,
    ShowFuncListDialog :showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationListLoad: (list) => dispatch(applicationListLoad(list)),
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
    siteDialogOpen: () => dispatch(siteDialogOpen()),
    siteDialogClose: () => dispatch(siteDialogClose())
    //
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
