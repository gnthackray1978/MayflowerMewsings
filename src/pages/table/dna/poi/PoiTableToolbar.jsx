
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'; 
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../tableBox.jsx';

const PoiTableToolbar = (props) => {
//  console.log('rendered: PoiTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;



  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));
  const [mincm, setmincm] = React.useState(String(filterParams.mincm));

  const [surname, setSurname] = React.useState(filterParams.surname);
  const [location, setLocation] = React.useState(filterParams.location);
  const [country, setCountry] = React.useState(filterParams.country);

  const [name, setName] = React.useState(filterParams.name);

  const boxClick = ()=>{
    filterFieldChanged({
      surname : surname,
      location : location,
      mincm : Number(mincm),
      yearStart : Number(yearStart),
      yearEnd : Number(yearEnd),
      country :country,
      name : name
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >

    <TextField className={classes.smallFilter} id="yearStart" label="Year From"
      value={yearStart}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setyearStart(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter} id="yearEnd" label="Year To"
      value={yearEnd}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setyearEnd(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter} id="mincm" label="Min CM"
      value={mincm}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setmincm(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="location" label="Location"
      value={location}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setLocation(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="surname" label="Surname"
      value={surname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setSurname(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="name" label="Name"
        value={name}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setName(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="country" label="Country"
        value={country}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setCountry(e.currentTarget.value);
      }}/>

    <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};

PoiTableToolbar.propTypes = {
  state: PropTypes.object.isRequired 
};

export default PoiTableToolbar;
