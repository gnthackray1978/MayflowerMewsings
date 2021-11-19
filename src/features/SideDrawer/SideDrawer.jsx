import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ApplicationList from "../ApplicationList/ApplicationList.jsx";
import TreeSelector from "../TreeSelector/TreeSelector.jsx";
import { connect } from "react-redux";

const styles = theme => ({

  root: {
    paddingRight: theme.spacing(1),
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


function SideDrawer(props){

  const { classes ,ShowFuncListDialog, appName, stateObj} = props;

  var getContent = () =>{
   // console.log(appName);
    if(appName == 2 || appName ==6)
      return <TreeSelector/>        
    else
      return <ApplicationList stateObj ={stateObj}/>

  };

  var content = getContent();

  return (
    <div>
      <Drawer open = {ShowFuncListDialog} >
          { content }
      </Drawer>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
    ShowFuncListDialog: state.ux.showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));
