import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {funcSelected, funcDialogOpen , funcDialogClose} from "../uxActions.jsx";
import { useNavigate  } from "react-router-dom";
import {applicationListStyles} from '../styleFuncs.jsx';


import { connect } from "react-redux";
 

function GetFunctionList(appName, functions, funcSelected, closeFuncListDialog,navigate, funcName){


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
                                navigate('/'+ev.currentTarget.dataset.page);
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
  

  let navigate = useNavigate();

  var items = GetFunctionList(appName,funcList,funcSelected,funcDialogClose,navigate);

  return (
    <div  className={classes.inner}>
       <AppBar position="static">
         <Toolbar>
             <IconButton
               className={classes.menuButton}
               color="inherit"
               aria-label="Menu"
               onClick={()=>{
                    funcDialogClose(); //hopefully this is open when it's being cliucked on
                 }}
               size="large">
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
