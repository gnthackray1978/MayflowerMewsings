
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';

const PersonTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );


  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [yearStart, setyearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setyearEnd] = React.useState(filterParams.yearEnd);

  const [firstName, setFirstName] = React.useState(filterParams.maleSurname);
  const [surname, setSurname] = React.useState(filterParams.femaleSurname);
  const [fatherChristianName, setFatherChristianName] = React.useState(filterParams.location);
  const [fatherSurname, setFatherSurname] = React.useState(filterParams.location);
  const [motherChristianName, setMotherChristianName] = React.useState(filterParams.location);
//
  const boxClick = ()=>{
    filterFieldChanged({
      yearStart : yearStart,
      yearEnd : yearEnd,
      firstName: firstName,
      surname : surname,
      fatherChristianName: fatherChristianName,
      fatherSurname: fatherSurname,
      motherChristianName: motherChristianName
    });
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
    <TextField className={classes.filter} id="firstName" label="First Name"
      value={firstName}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setLocation(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="surname" label="Surname"
      value={surname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setMaleSurname(e.currentTarget.value);
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

    <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};


PersonTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default PersonTableToolbar;
