import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function TableBox(props) {

    const {className, theme, classes, boxClick, label} = props;
    
    let boxLabel = label ?? 'Search';
    


    return (
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} style={{ width: '6rem', height: '2rem' }} >
        <Button style={{ lineHeight: '0.5'}} onClick = {boxClick}>{boxLabel}</Button>
      </Box>
    );

}


export default TableBox;
