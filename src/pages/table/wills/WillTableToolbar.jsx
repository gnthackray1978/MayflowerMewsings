
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
import WillTableHead from './WillTableHead.jsx';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    paddingTop: '11px'
  },

}));

const WillTableToolbar = (props) => {
//  console.log('rendered: WillTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props;



  let yearFrom =0;
  let yearTo = 0;
  let ref = '';
  let desc ='';
  let place ='';
  let surname ='';


  // yearStart : 1500,
  // yearEnd : 2000,
  // ref : '',
  // desc : '',
  // place : '',
  // surname : ''


  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >

    <TextField className={classes.filter} id="yearFrom" label="Year From"
      defaultValue={String(filterParams.yearStart)}
      variant="standard"  size="small"
      onChange = {(e)=>{  yearFrom = e.currentTarget.value; }}/>
    <TextField className={classes.filter} id="yearTo" label="Year To"
      defaultValue={String(filterParams.yearEnd)}
      variant="standard"  size="small"
      onChange = {(e)=>{  yearTo = e.currentTarget.value; }}/>
    <TextField className={classes.filter} id="reference" label="Ref."
      defaultValue={filterParams.ref}
      variant="standard"  size="small"
      onChange = {(e)=>{  ref = e.currentTarget.value; }}/>
    <TextField className={classes.filter} id="description" label="Desc."
      defaultValue={filterParams.desc}
      variant="standard"  size="small"
      onChange = {(e)=>{  desc = e.currentTarget.value; }}/>
    <TextField className={classes.filter} id="place" label="Place"
      defaultValue={filterParams.place}
      variant="standard"  size="small"
      onChange = {(e)=>{  place = e.currentTarget.value; }}/>
    <TextField className={classes.filter} id="surname" label="Surname"
      defaultValue={filterParams.surname}
       variant="standard"  size="small"
      onChange = {(e)=>{  surname = e.currentTarget.value; }}/>



        <Box
               boxShadow={3}
               bgcolor="background.paper"
               m={1}
               p={1}
               style={{ width: '6rem', height: '2rem' }}
             >
                 <Button style={{ lineHeight: '0.5'}} onClick = {()=>{
                     var returnObj ={
                 
                        yearStart : yearFrom,
                        yearEnd : yearTo,
                        ref : ref,
                        desc : desc,
                        place : place,
                        surname : surname
                     };
                     filterFieldChanged(returnObj);
                   } }>Search</Button>
             </Box>

    </Toolbar>
  );
};

WillTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default WillTableToolbar;
