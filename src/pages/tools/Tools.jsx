
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper'; 
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from './styleFuncs.jsx';
import TableBox from '../../features/Table/tableBox.jsx';


function Tools(props) {  

  const classes = useToolbarStyles(props.theme);
 
  const [year, setYear] = React.useState(1700);
  const [dataType, setDataType] = React.useState(0);

  const marriageClick = ()=>{
    setDataType(1);   
  };

  const birthClick = ()=>{
    setDataType(0);      
  };

  const groClick = ()=>{
    setDataType(2);    
  };


  const getCopy = ()=>{
    let copy = '';
    switch(dataType){
      case 0:
        copy = 'If someone was born in the year ' + year 
        + ' and assuming they were married no later than their 45th birthday then would have been married between '
        + (year + 18) + ' and ' + (year + 45);
        break;
      case 1:
        copy = 'If someone was married in the year ' + year 
        + ' and assuming the were married no later than their 45th birthday then would have been born between '+
        (year - 45) + ' and ' + (year - 18);        
        break;
      case 2:
        copy = String(year-5) + ' , ' + String(year) + ' , ' + String(year + 5);
        break;
    }
    return copy;
  };

    return (
      <div>
        <Toolbar className={classes.root} >
          <TextField className={classes.filter} id="year" label="Year"
            value={year}
            variant="standard"  size="small"
            onChange = {(e)=>{
              let year = Number(e.currentTarget.value);
              setYear(year);
            }}/>
          <div style={{ flex: 1 }}></div>  
          
          <TableBox boxClick ={marriageClick} label = "Marriage"/>
          <TableBox boxClick ={birthClick} label = "Birth"/>
          <TableBox boxClick ={groClick} label = "GRO"/>
        </Toolbar>

        <Paper className={classes.paper}  elevation={1} >
          <div className={classes.documentHeader}>Statistics</div>
          
          <div className={classes.documentBody}>{getCopy()}</div>


        </Paper>
      </div>
    );
}


export default Tools;