
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import {getParams, setParams} from '../../../features/Table/qryStringFuncs'
import {useToolbarStyles} from '../styleFuncs.jsx';
import TableBox from '../tableBox.jsx';


const GroupToolBar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  
 
  const { numSelected, filterFieldChanged} = props.state;
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);
  
  const [county, setCounty] = React.useState('');
  const [locations, setLocations] = React.useState('');

 

  const boxClick = ()=>{
  
    let params = {    
      county : county,
      locations : locations 
    };

    setParams(params);

    filterFieldChanged(params);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
      
      <TextField className={classes.location} id="county" label="County"
        value={county}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setCounty(e.currentTarget.value);
        }}/>
    
      <TextField className={classes.surname} id="locations" label="Location"
        value={locations}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setLocations(e.currentTarget.value);
        }}/>


      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};

export default GroupToolBar;