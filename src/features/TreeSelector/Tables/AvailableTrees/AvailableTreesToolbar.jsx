
import React, { Component,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {useToolbarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableBox from '../../../../pages/table/tableBox.jsx';

const AvailableTreesToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  
  const { numSelected, title, filterFieldChanged, filterParams , setSelected, theme} = props.state;
  
  const classes = useToolbarStyles(theme);

  const [origin, setorigin] = React.useState(filterParams.origin);
  const [groupNumber, setGroupNumber] = React.useState(filterParams.groupNumber);

  const boxClick = ()=>{
   
   
    setSelected([]);
   

    filterFieldChanged({
      origin : origin,
      groupNumber : Number(groupNumber)
    });

    var newurl = window.location.protocol + "//" 
    + window.location.host + window.location.pathname + '?origin='+origin + '&groupNumber='+groupNumber;
    window.history.pushState({path:newurl},'',newurl);
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
