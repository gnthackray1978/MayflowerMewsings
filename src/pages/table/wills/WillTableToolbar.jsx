
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'; 
import {useToolbarStyles} from '../styleFuncs.jsx';
import TableBox from '../tableBox.jsx';

const WillTableToolbar = (props) => {
//  console.log('rendered: WillTableToolbar' );

  const classes = useToolbarStyles(props.theme);
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
