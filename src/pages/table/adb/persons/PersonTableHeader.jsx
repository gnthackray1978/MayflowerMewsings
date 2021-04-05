import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";


 export default function PersonTableHeader(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;


  const headCells = [
        { id: 'estBirthYearInt', numeric: false, disablePadding: true, label: 'Birth Year' },
        { id: 'deathInt', numeric: false, disablePadding: true, label: 'Death Year' },
      { id: 'christianName', numeric: false, disablePadding: true, label: 'Name' },


    { id: 'surname', numeric: false, disablePadding: true, label: 'Surname' },
    { id: 'birthLocation', numeric: false, disablePadding: true, label: 'Birth Loc.' },
    { id: 'birthCounty', numeric: false, disablePadding: true, label: 'Birth County' },
    { id: 'deathLocation', numeric: false, disablePadding: true, label: 'Death Loc.' },
    { id: 'deathCounty', numeric: false, disablePadding: true, label: 'Death County' },
    { id: 'fatherChristianName', numeric: false, disablePadding: true, label: 'Father Name' },

    { id: 'motherChristianName', numeric: false, disablePadding: true, label: 'Mother Name' },
      { id: 'motherSurname', numeric: false, disablePadding: true, label: 'Mother Surname' },

    { id: 'occupation', numeric: false, disablePadding: true, label: 'Occ' },
    { id: 'spouseName', numeric: false, disablePadding: true, label: 'Spouse Name' },
    { id: 'spouseSurname', numeric: false, disablePadding: true, label: 'Surname' },
    { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Events' }
  ];

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

PersonTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
