
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
import MarriageTableHeader from './MarriageTableHeader.jsx';
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

const MarriageTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );

  const classes = useToolbarStyles();
  const { numSelected, title, filterFieldChanged, filterParams } = props;

  const [yearStart, setyearStart] = React.useState(filterParams.yearStart);
  const [yearEnd, setyearEnd] = React.useState(filterParams.yearEnd);
  const [maleSurname, setMaleSurname] = React.useState(filterParams.maleSurname);
  const [femaleSurname, setFemaleSurname] = React.useState(filterParams.femaleSurname);
  const [location, setLocation] = React.useState(filterParams.location);

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
    <TextField className={classes.filter} id="maleSurname" label="Groom Surname"
      value={maleSurname}
      variant="standard"  size="small"
      onChange = {(e)=>{
        setMaleSurname(e.currentTarget.value);
      }}/>

    <TextField className={classes.filter} id="femaleSurname" label="Bride Surname"
        value={femaleSurname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setFemaleSurname(e.currentTarget.value);
        }}/>

    <Box
               boxShadow={3}
               bgcolor="background.paper"
               m={1}
               p={1}
               style={{ width: '6rem', height: '2rem' }}
             >
       
                 <Button style={{ lineHeight: '0.5'}} onClick = {()=>{
                     var returnObj = {
                       yearStart : yearStart,
                        yearEnd : yearEnd,
                         maleSurname : maleSurname,
                          femaleSurname : femaleSurname,
                           location : location
                     };
                     filterFieldChanged(returnObj);
                   } }>Search</Button>
             </Box>

    </Toolbar>
  );
};


MarriageTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default MarriageTableToolbar;
