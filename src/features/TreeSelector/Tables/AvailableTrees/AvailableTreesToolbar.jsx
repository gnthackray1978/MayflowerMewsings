
import React, { Component,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../tableBox.jsx';

import { useTheme } from '@mui/material/styles';

const AvailableTreesToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  
  const { numSelected, treeNameFilterChanged,filterParams } = props.state;
  
  const theme = useTheme();

  const classes = useToolbarStyles(theme);

  const [treeName, setTreeName] = React.useState(filterParams.treeName);

  return (
    <Toolbar className={clsx(classes.root, {
                          [classes.highlight]: numSelected > 0,
                       })}>

         <TextField className={classes.treeNameFilter} id="origin" label="Tree Name"
                     value={treeName}
                     variant="standard"  size="small"
                     onChange = {(e)=>{
                       if(e.currentTarget.value!=treeName)
                        setTreeName(e.currentTarget.value);
                     }}/>

        <TableBox endButton ={classes.avTreeEndButton} boxClick ={()=>{
          treeNameFilterChanged(treeName)
          }}/>
    </Toolbar>
  );
};

AvailableTreesToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default AvailableTreesToolbar;
