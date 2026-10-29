import React from 'react';
import {connect} from 'react-redux';
import {Box, IconButton, Typography} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import OpenWith from '@mui/icons-material/OpenWith';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Close from '@mui/icons-material/Close';
import {hideDiagramControls} from '../../features/uxActions.jsx';
import {Rnd} from 'react-rnd';

const GraphControlsDialog = ({showDiagramControls, hideDiagramControls, graph}) => {
    const controls = [
        {label: 'Pan up', icon: <ArrowUpward />, action: () => graph.SetMovementY(-1), reset: () => graph.SetMovementY(0), column: 2, row: 1},
        {label: 'Pan left', icon: <ArrowBack />, action: () => graph.SetMovementX(-1), reset: () => graph.SetMovementX(0), column: 1, row: 2},
        {label: 'Pan right', icon: <ArrowForward />, action: () => graph.SetMovementX(1), reset: () => graph.SetMovementX(0), column: 3, row: 2},
        {label: 'Pan down', icon: <ArrowDownward />, action: () => graph.SetMovementY(1), reset: () => graph.SetMovementY(0), column: 2, row: 3},
        {label: 'Zoom in', icon: <Add />, action: () => graph.ZoomIn(1), reset: () => graph.ZoomIn(0), zoom: true},
        {label: 'Zoom out', icon: <Remove />, action: () => graph.ZoomOut(-1), reset: () => graph.ZoomOut(0), zoom: true}
    ];
    const button = control => <IconButton key={control.label} aria-label={control.label} title={control.label}
        onPointerDown={event => {
            event.stopPropagation();
            event.currentTarget.setPointerCapture(event.pointerId);
            control.action();
        }}
        onPointerUp={control.reset} onPointerCancel={control.reset} onLostPointerCapture={control.reset}
        onKeyDown={event => {
            if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
                event.preventDefault(); control.action();
            }
        }}
        onKeyUp={control.reset} onBlur={control.reset}
        sx={{width: control.zoom ? 30 : 27, height: control.zoom ? 30 : 27,
            p: 0, gridColumn: control.column, gridRow: control.row, touchAction: 'none',
            color: '#27343e', border: '1px solid', borderColor: control.zoom ? '#92c1ee' : '#bdc9d4',
            borderRadius: control.zoom ? '50%' : '5px', bgcolor: control.zoom ? '#eaf5ff' : '#f7fafc',
            '&:hover': {bgcolor: '#dbeeff', borderColor: '#559bda'},
            '& .MuiSvgIcon-root': {fontSize: 22}}}>
        {control.icon}
    </IconButton>;

    return <Rnd id="diagControls" default={{x: 0, y: 0, width: 150, height: 140}}
        size={{width: 150, height: 140}} enableResizing={false} dragHandleClassName="diagram-controls-handle"
        role="dialog" aria-labelledby="diagram-controls-title"
        style={{visibility: showDiagramControls ? 'visible' : 'hidden', zIndex: 1000,
            background: 'white', border: '1px solid #d6dfe6', borderRadius: 7,
            overflow: 'hidden', boxShadow: '0 4px 14px rgba(26,48,70,0.12)'}}>
        <Box className="diagram-controls-handle" sx={{display: 'flex', alignItems: 'center',
            gap: 1, px: 1, height: 32, cursor: 'move', background: 'linear-gradient(120deg, #edf7ff, #dfedfb)'}}>
            <OpenWith sx={{fontSize: 19, color: '#34434e'}} />
            <Typography id="diagram-controls-title" sx={{flex: 1, fontSize: 14, fontWeight: 700, color: '#081225'}}>Controls</Typography>
            <IconButton size="small" aria-label="Close diagram controls" sx={{p: 0, color: '#52616e'}}
                onPointerDown={event => event.stopPropagation()} onClick={hideDiagramControls}>
                <Close sx={{fontSize: 20}} />
            </IconButton>
        </Box>
        <Box sx={{m: 1, p: '5px', display: 'flex', alignItems: 'center', gap: '4px',
            borderRadius: 2, bgcolor: '#f2f8fc'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 27px)', gridTemplateRows: 'repeat(3, 27px)'}}>
                {controls.filter(control => !control.zoom).map(button)}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, borderLeft: '1px solid #dce5ed', pl: '6px'}}>
                {controls.filter(control => control.zoom).map(button)}
            </Box>
        </Box>
    </Rnd>;
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
