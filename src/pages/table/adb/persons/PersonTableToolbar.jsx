
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';
import {setParams} from '../../../../features/Table/qryStringFuncs';

const PersonTableToolbar = (props) => {


  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [yearStart, setYearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setYearEnd] = React.useState(filterParams.yearEnd);

  const [firstName, setFirstName] = React.useState(filterParams.firstName);
  const [surname, setSurname] = React.useState(filterParams.surname);
  const [fatherChristianName, setFatherChristianName] = React.useState(filterParams.fatherChristianName);
  const [fatherSurname, setFatherSurname] = React.useState(filterParams.fatherSurname);
  const [motherChristianName, setMotherChristianName] = React.useState(filterParams.motherChristianName);
//
  const searchClick = ()=>{
   
    let params = {
      sortColumn : 'yearStart',
      sortOrder : 'asc',
      limit : 50,
      offset :0,
      yearStart : yearStart,
      yearEnd : yearEnd,
      firstName: firstName,
      surname : surname,
      fatherChristianName: fatherChristianName,
      fatherSurname: fatherSurname,
      motherChristianName: motherChristianName
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
          setYearStart(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="yearEnd" label="Year To"
      value={yearEnd}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setYearEnd(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="firstName" label="First Name"
      value={firstName}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setFirstName(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="surname" label="Surname"
      value={surname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setSurname(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="fatherChristianName" label="Father Name"
        value={fatherChristianName}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setFatherChristianName(e.currentTarget.value);
    }}/>

    <TextField className={classes.filter} id="fatherSurname" label="Surname"
        value={fatherSurname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setFatherSurname(e.currentTarget.value);
    }}/>

    <TextField className={classes.filter} id="motherChristianName" label="Mother name"
        value={motherChristianName}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setMotherChristianName(e.currentTarget.value);
    }}/>

    <TableBox boxClick ={searchClick}/>

    </Toolbar>
  );
};


PersonTableToolbar.propTypes = {
  filterFieldChanged : PropTypes.func
};

export default PersonTableToolbar;
