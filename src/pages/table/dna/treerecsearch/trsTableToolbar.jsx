
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField'; 
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';

const TrsTableToolbar = (props) => {
//  console.log('rendered: TrsTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [origin, setorigin] = React.useState(filterParams.origin);


  const boxClick = ()=>{
    filterFieldChanged({
      origin : origin
    });
  };


  return (
    <Toolbar className={clsx(classes.root, {
                          [classes.highlight]: numSelected > 0,
                       })}>

         <TextField className={classes.filter} id="origin" label="Origin"
           value={origin}
           variant="standard"  size="small"
           onChange = {(e)=>{
             setorigin(e.currentTarget.value);
           }}/>

        <TableBox boxClick ={boxClick}/>
    </Toolbar>
  );
};

TrsTableToolbar.propTypes = {
  state: PropTypes.object.isRequired 
};

export default TrsTableToolbar;
