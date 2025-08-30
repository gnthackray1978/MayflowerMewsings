
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import {useToolbarStyles} from '../../pages/tools/styleFuncs';
import TableBox from './tableBox';
import {setParams} from './qryStringFuncs';

const GenericToolbar = (props) => {
  const { numSelected, title, filterFieldChanged, filterParams, filterConfig } = props.state;
  const classes = useToolbarStyles(props.theme);

  const [filterState, setFilterState] = React.useState(() => {
    const initialState = {};
    filterConfig.forEach(filter => {
      initialState[filter.id] = filterParams[filter.id] || filter.initialValue;
    });
    return initialState;
  });

  const handleFilterChange = (id, value) => {
    setFilterState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const searchClick = () => {
    setParams(filterState);
    filterFieldChanged(filterState);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {filterConfig.map(filter => (
        <TextField
          key={filter.id}
          className={classes[filter.className] || classes.filter}
          id={filter.id}
          label={filter.label}
          value={filterState[filter.id]}
          variant="standard"
          size="small"
          onChange={(e) => handleFilterChange(filter.id, e.currentTarget.value)}
        />
      ))}
      <TableBox boxClick={searchClick} />
    </Toolbar>
  );
};

GenericToolbar.propTypes = {
  state: PropTypes.shape({
    numSelected: PropTypes.number,
    title: PropTypes.string,
    filterFieldChanged: PropTypes.func.isRequired,
    filterParams: PropTypes.object.isRequired,
    filterConfig: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      initialValue: PropTypes.any,
      className: PropTypes.string
    })).isRequired
  }).isRequired,
  theme: PropTypes.object
};

export default GenericToolbar;
