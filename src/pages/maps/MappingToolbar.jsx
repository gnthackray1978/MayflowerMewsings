
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import {useToolbarStyles} from './styleFuncs.jsx';
import TableBox from './tableBox.jsx';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {treeSelectorDialogOpen,treeSelectorDialogClose} from "../../features/uxActions.jsx";
import {getParams, setParams} from '../../features/Table/qryStringFuncs';
 
// const MappingToolbar = (props) => {
//   console.log('MappingToolbar' );
//   const { numSelected, title, filterFieldChanged, filterParams} = props.state;

//   return (
//     <div>Hello toolbar</div>
//   );
// };

const MappingToolbar = (props) => {
//  

  
  const {selectedTreeData,treeSelectorDialogClose ,showTreeSelectorDialog , treeSelectorDialogOpen} = props;

  const { numSelected, title, filterFieldChanged, filterParams} = props.state;
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);
  
  const [surname, setSurname] = React.useState(filterParams.surname);
  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));
  const [location, setLocation] = React.useState(filterParams.location);
 
 

  const boxClick = ()=>{
    console.log('boxClick');

    let params = {
      yearFrom : Number(yearStart),
      yearTo : Number(yearEnd),
      location : location,
      surname : surname ,
      origin: getParams().origin,
      limit: 25,
      offset: 0,
      minCM: 0
    };

    setParams(params);

    filterFieldChanged(params);
  };
// console.log('mapping toolbar');
  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
      
      <IconButton
        variant="text"
        className={classes.menuButton}
        aria-label="Menu"
        label="Year From"
        onClick= {()=>
         {
       //    console.log('onclick');
           if(showTreeSelectorDialog)
             treeSelectorDialogClose();
           else
             treeSelectorDialogOpen();
         }}
        size="large">
       
        <div className={classes.topLabel}>Tree Name(s)</div>
        <SearchIcon className ={classes.buttonContent}  />
        <div className={classes.treeName}>{getParams()?.originDescription ?? ''}</div>
      
      </IconButton>


     
 

      <TextField className={classes.yearBox} id="yearStart" label="Year From"
        value={yearStart}
        variant="standard"  size="small"
        onChange = {(e)=>{
            setyearStart(e.currentTarget.value);
        }}/>

      <TextField className={classes.yearBox} id="yearEnd" label="Year To"
        value={yearEnd}
        variant="standard"  size="small"
        onChange = {(e)=>{
           setyearEnd(e.currentTarget.value);
        }}/>
      <TextField className={classes.location} id="location" label="Location"
        value={location}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setLocation(e.currentTarget.value);
        }}/>
    
      <TextField className={classes.surname} id="surname" label="Surname"
        value={surname}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setSurname(e.currentTarget.value);
        }}/>


      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
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


export default connect(mapStateToProps, mapDispatchToProps)(MappingToolbar);