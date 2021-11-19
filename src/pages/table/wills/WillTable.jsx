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
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
 
import {theme,useStyles} from '../styleFuncs.jsx';
import TableHeaderFromState  from '../TableHeaderFromState.jsx';

export default function WillTable(props) {


  const {state} = props;

  const classes = useStyles();

  console.log(state.loginInfo);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="will table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    
                    const isItemSelected = state.isSelected(row.reference);
                    const labelId = `will-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => state.handleClick(event, row.reference)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >


                        <TableCell  padding="none">{row.year}</TableCell>

                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.reference}
                        </TableCell>

                        <TableCell  padding="none">{row.description}</TableCell>
                        <TableCell  padding="none">{row.place}</TableCell>
                        <TableCell  padding="none">{row.firstName}</TableCell>
                        <TableCell  padding="none">{row.surname}</TableCell>
                        <TableCell  padding="none">{row.typ}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
    </TableContainer>
  );
}
