
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField'; 
import Checkbox from "@mui/material/Checkbox";
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx'; 
import {setParams} from '../../../../features/Table/qryStringFuncs';

const DupeTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [surname, setSurname] = React.useState(filterParams.surname);
  const [location, setLocation] = React.useState(filterParams.location);
  const [yearStart, setyearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setyearEnd] = React.useState(filterParams.yearEnd);
  const [parentage, setParentage] = React.useState(filterParams.parentage);


  const boxClick = ()=>{

    let params = {
      surname : surname,
      location : location,
      yearStart : yearStart,
      yearEnd : yearEnd,
      isMaternal : parentage.includes('mat'),
      isPaternal : parentage.includes('pat')
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

    <TextField className={classes.filter} id="surname" label="Surname"
      value={surname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setSurname(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="location" label="location"
      value={location}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setLocation(e.currentTarget.value);
      }}
    />

    <TextField className={classes.filter} id="yearStart" label="Year Start"
      value={yearStart}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setyearStart(e.currentTarget.value);
      }}
    />

    <TextField className={classes.filter} id="yearEnd" label="Year End"
      value={yearEnd}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setyearEnd(e.currentTarget.value);
      }}
    />

    <TextField className={classes.filter} id="parentage" label="Parentage"
      value={parentage}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setParentage(e.currentTarget.value);
      }}
    />

    <TableBox boxClick ={boxClick}/>


    </Toolbar>
  );
};

DupeTableToolbar.propTypes = {
  state: PropTypes.object.isRequired 
};

export default DupeTableToolbar;
