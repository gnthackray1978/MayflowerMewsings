
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
//import PersonTableHeader from './PersonTableHeader.jsx';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import {useToolbarStyles} from '../../styleFuncs.jsx';

const PersonTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );


  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props;

  const [yearStart, setyearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setyearEnd] = React.useState(filterParams.yearEnd);

  const [firstName, setFirstName] = React.useState(filterParams.maleSurname);
  const [surname, setSurname] = React.useState(filterParams.femaleSurname);
  const [fatherChristianName, setFatherChristianName] = React.useState(filterParams.location);
  const [fatherSurname, setFatherSurname] = React.useState(filterParams.location);
  const [motherChristianName, setMotherChristianName] = React.useState(filterParams.location);
//

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

    <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}
       style={{ width: '6rem', height: '2rem' }}>
         <Button style={{ lineHeight: '0.5'}} onClick = {()=>{
             var returnObj = {
                yearStart : yearStart,
                yearEnd : yearEnd,
                firstName: firstName,
                surname : surname,
                fatherChristianName: fatherChristianName,
                fatherSurname: fatherSurname,
                motherChristianName: motherChristianName
             };
             filterFieldChanged(returnObj);
           } }>Search</Button>
     </Box>

    </Toolbar>
  );
};


PersonTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default PersonTableToolbar;
