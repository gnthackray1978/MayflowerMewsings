
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField'; 
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';
import {getParams, setParams} from '../../../../features/Table/qryStringFuncs';

const TrsTableToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [treeName, setTreeName] = React.useState(filterParams.treeName);


  const boxClick = ()=>{
    
    let params = {
      treeName: getParams().treeName ?? ''
    };

    setParams(params);

    filterFieldChanged(params);
  };


  return (
    <Toolbar className={clsx(classes.root, {
                          [classes.highlight]: numSelected > 0,
                       })}>

         <TextField className={classes.filter} id="treeName" label="Tree Name"
           value={treeName}
           variant="standard"  size="small"
           onChange = {(e)=>{
             setTreeName(e.currentTarget.value);
           }}/>

        <TableBox boxClick ={boxClick}/>
    </Toolbar>
  );
};

TrsTableToolbar.propTypes = {
  state: PropTypes.object.isRequired 
};

export default TrsTableToolbar;
