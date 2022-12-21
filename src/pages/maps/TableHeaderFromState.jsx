import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import TableCell from '@mui/material/TableCell'; 
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel'; 
import {useStyles} from './styleFuncs.jsx';



 export default function TableHeaderFromState(props) {

//  const { classes, onSelectAllClick, order,  orderBy, numSelected, rowCount, onRequestSort, headCells } = props;

  const { order,  orderBy, onRequestSort, headCells } = props.state;

  const classes = useStyles(props.theme);



  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeaderFromState.propTypes = {
  state: PropTypes.object.isRequired 
};
