
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../tableBox.jsx';
import {setParams} from './qryStringFuncs';

const FTMViewTableToolbar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props.state; 
  const [surname, setSurname] = React.useState(filterParams.surname);
  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));
  const [location, setLocation] = React.useState(filterParams.location);
  const [origin, setOrigin] = React.useState(filterParams.origin);

  const boxClick = ()=>{

    let params = {
      yearStart : Number(yearStart),
      yearEnd : Number(yearEnd),
      location : location,
      surname : surname,
      origin: origin
    };

    filterFieldChanged(params);

    setParams(params);
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
      <TextField className={classes.filter} id="origin" label="Origin"
          value={origin}
          variant="standard"  size="small"
          onChange = {(e)=>{
            setOrigin(e.currentTarget.value);
          }}/>
      <TextField className={classes.filter} id="surname" label="Surname"
        value={surname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setSurname(e.currentTarget.value);
        }}/>

      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};

FTMViewTableToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default FTMViewTableToolbar;
