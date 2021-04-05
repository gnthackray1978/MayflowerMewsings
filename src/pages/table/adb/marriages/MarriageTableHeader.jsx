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


 export default function MarriageTableHeader(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const headCells = [
    { id: 'maleCname', numeric: false, disablePadding: true, label: 'Groom Name' },
    { id: 'maleSname', numeric: false, disablePadding: true, label: 'Groom Surname' },
    { id: 'femaleCname', numeric: false, disablePadding: true, label: 'Bride Name' },
    { id: 'femaleSname', numeric: false, disablePadding: true, label: 'Bride Surname' },
    { id: 'marriageLocation', numeric: false, disablePadding: true, label: 'Loc.' },
    { id: 'yearIntVal', numeric: false, disablePadding: true, label: 'Year' },
    { id: 'marriageCounty', numeric: false, disablePadding: true, label: 'County' },
    { id: 'source', numeric: false, disablePadding: true, label: 'Src' },
    { id: 'witness1', numeric: false, disablePadding: true, label: 'Wit' },
    { id: 'femaleIsKnownWidow', numeric: false, disablePadding: true, label: 'Wid' },
    { id: 'maleIsKnownWidower', numeric: false, disablePadding: true, label: 'Widower' },
    { id: 'isLicence', numeric: false, disablePadding: true, label: 'Lic.' },
    { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Dupes' }
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

MarriageTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
