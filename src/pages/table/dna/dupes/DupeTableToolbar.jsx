
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'; 
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx'; 


const DupeTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [surname, setSurname] = React.useState(filterParams.surname);

  const boxClick = ()=>{
    filterFieldChanged({
      surname : surname
    });
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


    <TableBox boxClick ={boxClick}/>


    </Toolbar>
  );
};

DupeTableToolbar.propTypes = {
  state: PropTypes.object.isRequired 
};

export default DupeTableToolbar;
