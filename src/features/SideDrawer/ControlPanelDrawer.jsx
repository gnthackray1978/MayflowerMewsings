import React, { Component } from 'react'; 
import Drawer from '@mui/material/Drawer'; 
import GEDSelector from "../GEDSelector/GEDSelector.jsx";
import { connect } from "react-redux";

 
function ControlPanelDrawer(props){

  const {ShowControlPanelDialog} = props;
    
  return (
    <div>
      <Drawer open = {ShowControlPanelDialog} >
        <GEDSelector/>
      </Drawer>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
    ShowControlPanelDialog: state.ux.showControlPanelDialog
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(ControlPanelDrawer);
