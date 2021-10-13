
import React, { Component,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import {useToolbarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableBox from '../../../../pages/table/tableBox.jsx';

const AvailableTreesToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams , setSelected} = props.state;

  const [origin, setorigin] = React.useState(filterParams.origin);
  const [groupNumber, setGroupNumber] = React.useState(filterParams.groupNumber);

  const boxClick = ()=>{
   
   
    setSelected([]);
   

    filterFieldChanged({
      origin : origin,
      groupNumber : Number(groupNumber)
    });
  };


  return (
    <Toolbar className={clsx(classes.root, {
                          [classes.highlight]: numSelected > 0,
                       })}>

         <TextField className={classes.filter} id="origin" label="Origin"
                     value={origin}
                     variant="standard"  size="small"
                     onChange = {(e)=>{
                       if(e.currentTarget.value!=origin)
                        setorigin(e.currentTarget.value);
                     }}/>

        <TextField className={classes.filter} id="groupNumber" label="GroupNumber"
                     value={groupNumber}
                     variant="standard"  size="small"
                     onChange = {(e)=>{
                       
                      if(groupNumber!=e.currentTarget.value)
                        setGroupNumber(e.currentTarget.value);
                     }}/>


        <TableBox boxClick ={boxClick}/>
    </Toolbar>
  );
};

AvailableTreesToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default AvailableTreesToolbar;
