import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import {funcSelected, funcDialogOpen , funcDialogClose} from "../uxActions.jsx";
import { BrowserRouter as Router,  useHistory } from "react-router-dom";
import {applicationListStyles} from '../styleFuncs.jsx';


import { connect } from "react-redux";
 

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

  const {funcSelected, funcDialogClose, appName} = props;

  const theme = useTheme();
  const classes = applicationListStyles(theme);


  let funcList = props.stateObj.funcs;
  

  let history = useHistory();

  var items = GetFunctionList(appName,funcList,funcSelected,funcDialogClose,history);

  return (
      <div  className={classes.inner}>
         <AppBar position="static">
           <Toolbar>
               <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>{
                    funcDialogClose(); //hopefully this is open when it's being cliucked on
                 }} >
                 <MenuIcon/>
               </IconButton>

               <Button color="inherit" className ={classes.tolowerBtn}>
                 <Typography variant="h6" color="inherit" >
                   Select Tree
                 </Typography>
               </Button>

           </Toolbar>
         </AppBar>

         {items}

      </div>
  );

}





const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
 //   funcList: state.ux.funcList,
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


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);
