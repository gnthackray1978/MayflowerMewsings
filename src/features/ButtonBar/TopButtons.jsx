import React, { Component } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GamepadIcon from '@mui/icons-material/Gamepad';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import GoogleIDSConnect   from "../../shared/GoogleIDS/GoogleIDX.jsx";

import {siteDialogOpen, siteDialogClose,funcDialogOpen,funcDialogClose,
          treeSelectorDialogOpen,treeSelectorDialogClose, toggleDiagramControls} from "../uxActions.jsx";
import AppsIcon from '@mui/icons-material/Apps';
import {topButtonStyles} from '../styleFuncs.jsx';
import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

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

 // console.log('get page name ');

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
  
    
    const theme = useTheme();

    const {siteDialogOpen, siteDialogClose,
       showAppListDialog, ShowFuncListDialog, funcDialogOpen , 
       funcDialogClose, metaSubset,showTreeSelectorDialog, 
       treeSelectorDialogOpen,treeSelectorDialogClose, toggleDiagramControls, title} = props;

    const classes =  topButtonStyles(theme);
 
    //console.log(props);
    var selection = getPageName(location.pathname, metaSubset.sites);

    let showDiagramControls =false;

    if(selection.appId ==2)
      showDiagramControls =true;
  
    
    if (selection.title == 'Descendants') {        
        selection.title = 'Descendant Diagram for ' + title;
    }
    
    if (selection.title == 'Ancestors') {        
        selection.title = 'Ancestor Diagram for ' + title;
    }
    
    if (selection.title == 'FDDescendants') {
        selection.title = 'Force Directed Diagram for ' + title;
    }


    return (
      <Toolbar>
          {selection.appId != 1 && <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick= { ()=>
                   {
                     if(ShowFuncListDialog)
                       funcDialogClose();
                     else
                       funcDialogOpen();
                   }
                 }
            size="large">
              <MenuIcon />
          </IconButton>}

          {showDiagramControls && <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick= {()=>
              {
            //    console.log('onclick');
                if(showTreeSelectorDialog)
                  treeSelectorDialogClose();
                else
                  treeSelectorDialogOpen();
              }}
            size="large">
           <SearchIcon />
         </IconButton>}

          <Button color="inherit"  className={classes.grow}>
              <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                  {selection.title}
              </Typography>
          </Button>
          
          {showDiagramControls && 
           <IconButton
             className={classes.menuButton}
             color="inherit"
             aria-label="Menu"
             onClick= {()=>
               {
                 toggleDiagramControls();
               }}
             size="large">
             <GamepadIcon />
           </IconButton>
          }

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={()=>{
                 if(showAppListDialog)
                   siteDialogClose();
                 else
                   siteDialogOpen();
                 }}
            size="large">
              <AppsIcon />
          </IconButton>
          
          <GoogleIDSConnect/>

      </Toolbar>
    );
   

}

 

const mapStateToProps = state => {
 
  let showAppListDialog =  state.ux.showAppListDialog;
  let showFuncListDialog = state.ux.showFuncListDialog;
 
  return {
    title : state.ux.title,
    showTreeSelectorDialog : state.ux.showTreeSelectorDialog,
    ShowAppListDialog :showAppListDialog,
    ShowFuncListDialog :showFuncListDialog,
   // selectedPersonCache: state.ux.selectedPersonCache,
 //   selectedTreePerson: state.ux.selectedTreePerson
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
    siteDialogOpen: () => dispatch(siteDialogOpen()),
    siteDialogClose: () => dispatch(siteDialogClose()),
    treeSelectorDialogOpen: () => dispatch(treeSelectorDialogOpen()),
    treeSelectorDialogClose: () => dispatch(treeSelectorDialogClose()),
    toggleDiagramControls: ()=> dispatch(toggleDiagramControls())
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
