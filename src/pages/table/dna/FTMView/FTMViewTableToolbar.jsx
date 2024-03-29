
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';
import {getParams, setParams} from '../../../../features/Table/qryStringFuncs';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import {treeSelectorDialogOpen,treeSelectorDialogClose} from "../../../../features/uxActions.jsx";


const FTMViewTableToolbar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const {selectedTreeData,treeSelectorDialogClose ,showTreeSelectorDialog , treeSelectorDialogOpen} = props;
  const { numSelected, title, filterFieldChanged, filterParams } = props.state; 
  const [surname, setSurname] = React.useState(filterParams.surname);
  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));
  const [location, setLocation] = React.useState(filterParams.location);

  // always use the query string value is the ultimate source of truth.
  // todo remove the tree selection from redux entirely.

  
  const searchClick = ()=>{

    let params = {
      yearStart : Number(yearStart),
      yearEnd : Number(yearEnd),
      location : location,
      surname : surname,
      origin: getParams().origin ?? ''
    };

    filterFieldChanged(params);

    setParams(params);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick= {()=>
         {
           console.log('onclick');
           if(showTreeSelectorDialog)
             treeSelectorDialogClose();
           else
             treeSelectorDialogOpen();
         }}
        size="large">
        <div className={classes.topLabel}>Tree Name(s)</div>
        <SearchIcon className ={classes.buttonContent}/>
        <hr className ={classes.treeSearchLine}/>
      </IconButton>
      <div  className = {classes.originOuter}>
        <div className = {classes.originMiddle}>
          <div className = {classes.originInner}>{getParams()?.originDescription ?? ''}</div>
        </div>
      </div>
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

      <TextField className={classes.filter} id="surname" label="Surname"
        value={surname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setSurname(e.currentTarget.value);
        }}/>

      <TableBox boxClick ={searchClick}/>

    </Toolbar>
  );
};

FTMViewTableToolbar.propTypes = {
  state: PropTypes.object.isRequired
};



 
const mapStateToProps = state => {
  return { 
    selectedTreeData : state.ux.selectedTreeData,
    showTreeSelectorDialog : state.ux.showTreeSelectorDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    treeSelectorDialogOpen: () => dispatch(treeSelectorDialogOpen()),
    treeSelectorDialogClose: () => dispatch(treeSelectorDialogClose()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FTMViewTableToolbar);