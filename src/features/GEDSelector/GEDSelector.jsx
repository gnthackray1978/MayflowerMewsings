import  React, { useState, useEffect }  from 'react';
import { useTheme } from '@mui/material/styles';
import {controlPanelDialogClose} from "../uxActions.jsx";
import { connect } from "react-redux";



function GEDSelector(props) {
    //
    //console.log('TreeSelector loaded ');
    const { controlPanelDialogClose} = props;
            
    const theme = useTheme();
   // const classes = treeSelector(theme); 
    

    return (
      <div >
        GED selector
      </div>
    );

}

 

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    controlPanelDialogClose : ()=>dispatch(controlPanelDialogClose())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(GEDSelector);
