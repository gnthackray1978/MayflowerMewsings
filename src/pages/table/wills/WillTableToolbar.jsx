
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
//import WillTableHead from './WillTableHead.jsx';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import {useToolbarStyles} from '../styleFuncs.jsx';
import TableBox from '../tableBox.jsx';

const WillTableToolbar = (props) => {
//  console.log('rendered: WillTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;


  const [yearStart, setYearStart] = React.useState(filterParams.yearStart);
const [yearEnd, setYearEnd] = React.useState(filterParams.yearEnd);
const [ref, setRef] = React.useState(filterParams.ref);
const [desc, setDesc] = React.useState(filterParams.desc);
const [place, setPlace] = React.useState(filterParams.place);
const [surname, setSurname] = React.useState(filterParams.surname);

const boxClick = ()=>{
  filterFieldChanged({
    yearStart : yearStart,
    yearEnd : yearEnd,
    ref : ref,
    desc : desc,
    place : place,
    surname : surname
  });
};

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >

    <TextField className={classes.smallFilter}
      id="yearStart" label="Year From"
      value={yearStart}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setYearStart(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter}
      id="yearEnd" label="Year To"
      value={yearEnd}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setYearEnd(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter}
      id="ref" label="Ref"
      value={ref}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setRef(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter}
      id="desc" label="Desc"
      value={desc}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setDesc(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter}
      id="place" label="Place"
      value={place}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setPlace(e.currentTarget.value);
      }}/>

    <TextField className={classes.smallFilter}
      id="surname" label="Surname"
      value={surname}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setSurname(e.currentTarget.value);
      }}/>


      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};

WillTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default WillTableToolbar;
