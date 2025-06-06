
import React, { Component , useState} from 'react'; 
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import Close from '@mui/icons-material/Close';
import {hideDiagramControls} from "../../features/uxActions.jsx"; 
import { Rnd } from "react-rnd";

const GraphControlsDialog = (props) => {

    const {showDiagramControls,hideDiagramControls,graph} = props;

    const handleClose = () => {
      hideDiagramControls();
    };

    const theme = useTheme();

    return(  <Rnd id = "diagControls"
                    style={{display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "solid 1px #ddd",
                    background: "white",
                    zIndex:1000,
                    visibility: showDiagramControls ? 'visible' : 'hidden',
                  }}

    default={{
      x: 0,
      y: 0,
      width: 130,
      height: 140,
    }}

  >
    <div style={{ left: '0px', top: '0px', position: 'absolute',backgroundColor : 'aliceblue',width:'100%', height:'35px' ,paddingLeft:'10px',paddingTop:'5px'}}>Controls</div>

    {
    [
            { icon: <ArrowUpward />, action: () => graph.SetMovementY(-1), reset: () => graph.SetMovementY(0), style: { left: '32px', top: '35px' } },
            { icon: <ArrowBack />, action: () => graph.SetMovementX(-1), reset: () => graph.SetMovementX(0), style: { left: '0px', top: '65px' } },
            { icon: <ArrowForward />, action: () => graph.SetMovementX(1), reset: () => graph.SetMovementX(0), style: { left: '65px', top: '65px' } },
            { icon: <ArrowDownward />, action: () => graph.SetMovementY(1), reset: () => graph.SetMovementY(0), style: { left: '32px', top: '100px' } },

            { icon: <AddCircleOutline />, action: () => graph.ZoomIn(1), reset: () => graph.ZoomIn(0), style: { left: '95px', top: '65px' } },
            { icon: <RemoveCircleOutline />, action: () => graph.ZoomOut(-1), reset: () => graph.ZoomOut(0), style: { left: '95px', top: '99px' } },
            { icon: <Close />, action: handleClose, reset: () => {}, style: { left: '95px', top: '0px' } }
          ].map((button, index) => (
          <IconButton
            key={index}
            color="inherit"
            onMouseDown={
              e => {
                button.action();
                e.stopPropagation();
              }}
            onMouseUp={              
                e => {
                button.reset();
                e.stopPropagation();
              }}               
            style={{ position: 'absolute', ...button.style }}
            aria-label="Menu"
            size="small"
            >
            {button.icon}
          </IconButton>
          ))}
  </Rnd>); 
};
 
const mapStateToProps = state => {
  return { 
    selectedTreeData : state.ux.selectedTreeData,
    showDiagramControls :state.ux.showDiagramControls,
    movement : state.ux.movement
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDiagramControls : ()=> dispatch(hideDiagramControls())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GraphControlsDialog);