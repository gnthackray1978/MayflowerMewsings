import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useToolbarStyles} from './styleFuncs.jsx';

function TableBox(props) {

    const {theme,  boxClick, label, endButton} = props;
    
    let boxLabel = label ?? 'Search';
//style={{ width: '6rem', height: '2rem' }} 
    //const classes = useToolbarStyles(theme);

    return (
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} className = {endButton}>
        <Button style={{ lineHeight: '0.5'}} onClick = {boxClick}>{boxLabel}</Button>
      </Box>
    );

}


export default TableBox;
