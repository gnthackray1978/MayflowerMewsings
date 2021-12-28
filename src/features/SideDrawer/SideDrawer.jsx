import React, { Component } from 'react'; 
import Drawer from '@material-ui/core/Drawer';
import ApplicationList from "../ApplicationList/ApplicationList.jsx";
import { connect } from "react-redux";

 
function SideDrawer(props){

  const {ShowFuncListDialog, appName, stateObj} = props;
   
 

  return (
    <div>
      <Drawer open = {ShowFuncListDialog} >
        <ApplicationList stateObj ={stateObj}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
