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
import Link from '@material-ui/core/Link';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withStyles } from '@material-ui/core/styles';
import PoiTableToolbar from './PoiTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {theme,useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../TableHeaderFromState.jsx';

export default function PoiTable(props) {

  const {state} = props;

  const classes = useStyles();

  return (
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="poi table"
          >
            <TableHeaderFromState state= {state}/>

            <TableBody>
              {

                state.rows.map((row, index) => {
                  //console.log(row.reference);
                  const isItemSelected = state.isSelected(row.id);
                  const labelId = `poi-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => state.handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >

                       <TableCell  padding="none">{row.christianName}</TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.surname}
                    </TableCell>

                    <TableCell  padding="none">{row.birthYear}</TableCell>
                    <TableCell  padding="none">{row.birthPlace}</TableCell>

                      <TableCell  padding="none">{row.birthCounty}</TableCell>

                      <TableCell  padding="none">
                        <Link href={row.treeUrl} onClick={(event) => event.preventDefault()} color="inherit">
                          {row.testDisplayName}
                        </Link>


                      </TableCell>
                      <TableCell  padding="none">{row.testAdminDisplayName}</TableCell>

                      <TableCell  padding="none">{row.sharedCentimorgans}</TableCell>

                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
  );
}
