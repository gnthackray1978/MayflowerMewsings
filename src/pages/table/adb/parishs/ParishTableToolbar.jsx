
import React, { Component } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
//import ParishTableHeader from './ParishTableHeader.jsx';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../tableBox.jsx';

const ParishTableToolbar = (props) => {


  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [county, setcounty] = React.useState(filterParams.county);
  const [parishName, setparishName] = React.useState(filterParams.parishName);

  const boxClick = ()=>{
    filterFieldChanged({
      county : county,
      parishName : parishName
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
    <TextField className={classes.filter} id="county" label="County"
      value={county}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setcounty(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="parishName" label="Parish Name"
      value={parishName}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setparishName(e.currentTarget.value);
      }}/>

      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};


ParishTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default ParishTableToolbar;
