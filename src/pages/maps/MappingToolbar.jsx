
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { useTheme } from '@material-ui/core/styles';
import {useToolbarStyles} from './styleFuncs.jsx';
import TableBox from './tableBox.jsx';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// treeSelectorDialogClose
import {treeSelectorDialogOpen,treeSelectorDialogClose} from "../../features/uxActions.jsx";

const MappingToolbar = (props) => {
//  console.log('rendered: FTMViewTableToolbar' );

  
  const {selectedTreeData,treeSelectorDialogClose ,showTreeSelectorDialog , treeSelectorDialogOpen} = props;

  const { numSelected, title, filterFieldChanged, filterParams} = props.state;
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);
  
  //console.log('MapPersonToolbar: '+selectedTreeData);
  // numSelected={state.selected.length}
  //   filterParams ={state.filterParams} title = {state.title}
  //   filterFieldChanged = {state.filterFieldChanged}


  const [surname, setSurname] = React.useState(filterParams.surname);
  const [yearStart, setyearStart] = React.useState(String(filterParams.yearStart));
  const [yearEnd, setyearEnd] = React.useState(String(filterParams.yearEnd));
  const [location, setLocation] = React.useState(filterParams.location);
 
  const boxClick = ()=>{
    filterFieldChanged({
      yearStart : Number(yearStart),
      yearEnd : Number(yearEnd),
      location : location,
      surname : surname ,
      origin: selectedTreeData.origin
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
       onClick= {()=>
        {
          console.log('onclick');
          if(showTreeSelectorDialog)
            treeSelectorDialogClose();
          else
            treeSelectorDialogOpen();
        }}>
        <SearchIcon />
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

      <div  className = {classes.originOuter}>
        <div className = {classes.originMiddle}>
          <div className = {classes.originInner}>{selectedTreeData.originDescription}</div>
        </div>
      </div>

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