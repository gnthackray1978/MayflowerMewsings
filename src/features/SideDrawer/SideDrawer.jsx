import React, { Component } from 'react'; 
import Drawer from '@material-ui/core/Drawer';
import ApplicationList from "../ApplicationList/ApplicationList.jsx";
import TreeSelector from "../TreeSelector/TreeSelector.jsx";
import { connect } from "react-redux";

 
function SideDrawer(props){

  const {ShowFuncListDialog, appName, stateObj} = props;
   

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


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
