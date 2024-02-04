
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

  
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;
  
  const theme = useTheme();

  const classes = useToolbarStyles(theme);

  const [treeName, setTreeName] = React.useState(filterParams.treeName);

  const searchAvailableTreesClicked = ()=>{      
   // setSelected([]);
   
    filterFieldChanged({
      treeName : treeName,
      sortColumn : 'cm',
      sortOrder : 'desc',
      limit : 0,
      offset :0,
      origin :'',     
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      minCM : 0
    });

    // var newurl = window.location.protocol + "//" 
    //                 + window.location.host + window.location.pathname + '?treeName='+treeName;
    //                 window.history.pushState({path:newurl},'',newurl);
  };


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

        <TableBox  endButton ={classes.avTreeEndButton} boxClick ={searchAvailableTreesClicked}/>
    </Toolbar>
  );
};

AvailableTreesToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default AvailableTreesToolbar;
