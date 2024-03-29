
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';
import {setParams} from '../../../../features/Table/qryStringFuncs';

const MarriageTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [yearStart, setyearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setyearEnd] = React.useState(filterParams.yearEnd);
  const [maleSurname, setMaleSurname] = React.useState(filterParams.maleSurname);
  const [femaleSurname, setFemaleSurname] = React.useState(filterParams.femaleSurname);
  const [location, setLocation] = React.useState(filterParams.location);

  const searchClick = ()=>{
  
    let params = {
      yearStart : yearStart,
      yearEnd : yearEnd,
      maleSurname : maleSurname,
      femaleSurname : femaleSurname,
      location : location
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
    <TextField className={classes.filter} id="yearStart" label="Year From"
      value={yearStart}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setyearStart(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="yearEnd" label="Year To"
      value={yearEnd}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setyearEnd(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="location" label="Location"
      value={location}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setLocation(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="maleSurname" label="Groom Surname"
      value={maleSurname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setMaleSurname(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="femaleSurname" label="Bride Surname"
        value={femaleSurname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setFemaleSurname(e.currentTarget.value);
        }}/>

    <TableBox boxClick ={searchClick}/>
    </Toolbar>
  );
};



export default MarriageTableToolbar;
