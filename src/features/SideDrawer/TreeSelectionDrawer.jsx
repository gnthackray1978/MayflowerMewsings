import React, { Component } from 'react'; 
import Drawer from '@mui/material/Drawer'; 
import TreeSelector from "../TreeSelector/TreeSelector.jsx";
import { connect } from "react-redux";

 
function TreeSelectionDrawer(props){

  const {ShowTreeSelectorDialog, appName, stateObj} = props;
    
  return (
    <div>
      <Drawer open = {ShowTreeSelectorDialog} >
        <TreeSelector/>
      </Drawer>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
    ShowTreeSelectorDialog: state.ux.showTreeSelectorDialog
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreeSelectionDrawer);
