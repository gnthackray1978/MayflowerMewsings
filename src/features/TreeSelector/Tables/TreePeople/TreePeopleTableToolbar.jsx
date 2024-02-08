
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField'; 
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../tableBox.jsx';

const TreePeopleTableToolbar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  
  const { numSelected, title, treePersonFilterChanged, filterParams } = props.state;
  const classes = useToolbarStyles(props.theme);
  
  const [surname, setSurname] = React.useState(filterParams.surname);
  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));

  const boxClick = ()=>{
    treePersonFilterChanged({
      yearStart : Number(yearStart),
      yearEnd : Number(yearEnd),
      surname : surname
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >

      <TextField 
     
        className={classes.filter} id="yearStart" label="From"
        value={yearStart}
        variant="standard"  size="small"
        onChange = {(e)=>{
            setyearStart(e.currentTarget.value);
        }}
         
        />

      <TextField className={classes.filter} id="yearEnd" label="To"
        value={yearEnd}
        variant="standard"  size="small"
        onChange = {(e)=>{
           setyearEnd(e.currentTarget.value);
        }}/>
     
      <TextField className={classes.filterName} id="surname" label="Surname"
        value={surname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setSurname(e.currentTarget.value);
        }}/>

      <TableBox endButton ={classes.endButton} boxClick ={boxClick} />

    </Toolbar>
  );
};

TreePeopleTableToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default TreePeopleTableToolbar;
