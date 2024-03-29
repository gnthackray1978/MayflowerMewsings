
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';
import {setParams} from '../../../../features/Table/qryStringFuncs';

const ParishTableToolbar = (props) => {


  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [county, setcounty] = React.useState(filterParams.county);
  const [parishName, setparishName] = React.useState(filterParams.parishName);

  const boxClick = ()=>{   
    let params = {
      county : county,
      parishName : parishName
    };

    setParams(params);

    filterFieldChanged(params);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
    <TextField className={classes.filter} id="county" label="County"
      value={county}
      variant="standard"  size="small"
      onChange = {(e)=>{
          setcounty(e.currentTarget.value);
      }}/>
    <TextField className={classes.filter} id="parishName" label="Parish Name"
      value={parishName}
      variant="standard"  size="small"
      onChange = {(e)=>{
         setparishName(e.currentTarget.value);
      }}/>

      <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};


ParishTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default ParishTableToolbar;
