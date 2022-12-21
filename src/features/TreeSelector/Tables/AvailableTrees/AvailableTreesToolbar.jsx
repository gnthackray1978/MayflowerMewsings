
import React, { Component,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableBox from '../../../Table/tableBox.jsx';
import { useTheme } from '@mui/material/styles';

const AvailableTreesToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  
  const { numSelected, title, filterFieldChanged, filterParams , setSelected} = props.state;
  
  const theme = useTheme();

  const classes = useToolbarStyles(theme);

  const [treeName, setTreeName] = React.useState(filterParams.treeName);

  const searchAvailableTreesClicked = ()=>{      
    setSelected([]);
   
    filterFieldChanged({
      treeName : treeName
    });

    // var newurl = window.location.protocol + "//" 
    //                 + window.location.host + window.location.pathname + '?treeName='+treeName;
    //                 window.history.pushState({path:newurl},'',newurl);
  };


  return (
    <Toolbar className={clsx(classes.root, {
                          [classes.highlight]: numSelected > 0,
                       })}>

         <TextField className={classes.filter} id="origin" label="Tree Name"
                     value={treeName}
                     variant="standard"  size="small"
                     onChange = {(e)=>{
                       if(e.currentTarget.value!=treeName)
                        setTreeName(e.currentTarget.value);
                     }}/>

        <TableBox boxClick ={searchAvailableTreesClicked}/>
    </Toolbar>
  );
};

AvailableTreesToolbar.propTypes = {
  state: PropTypes.object.isRequired
};

export default AvailableTreesToolbar;
