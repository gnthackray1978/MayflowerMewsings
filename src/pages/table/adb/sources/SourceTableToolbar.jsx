
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {useToolbarStyles} from '../../styleFuncs.jsx';
import TableBox from '../../../../features/Table/tableBox.jsx';

const SourceTableToolbar = (props) => {
//  console.log('rendered: DupeTableToolbar' );

  const classes = useToolbarStyles(props.theme);
  const { numSelected, title, filterFieldChanged, filterParams } = props.state;

  const [location, setLocation] = React.useState(filterParams.yearStart);
  const [sourceRef, setSourceRef] = React.useState(filterParams.yearEnd);
  const [yearStart, setYearStart] = React.useState(filterParams.maleSurname);
  const [yearEnd, setYearEnd] = React.useState(filterParams.femaleSurname);

  const boxClick = ()=>{
    filterFieldChanged({
      yearStart : yearStart,
      yearEnd : yearEnd,
      location : location,
      sourceRef : sourceRef
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {

        [classes.highlight]: numSelected > 0,
      })}
    >
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


    <TextField className={classes.filter} id="sourceRef" label="Ref"
        value={sourceRef}
        variant="standard"  size="small"
        onChange = {(e)=>{
          setSourceRef(e.currentTarget.value);
        }}/>

    <TableBox boxClick ={boxClick}/>

    </Toolbar>
  );
};


SourceTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterFieldChanged : PropTypes.func
};

export default SourceTableToolbar;
