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
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';

import ParishTableHeader from './ParishTableHeader.jsx';
import ParishTableToolbar from './ParishTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {useTableState} from '../../useTable.jsx';
import {theme,useStyles} from '../../styleFuncs.jsx';

export default function ParishTable(props) {


  const {ReturnData, makeData} = props;

  const classes = useStyles();

  var state = useTableState(ReturnData,{
          sortColumn : 'parishName',
          sortOrder : 'asc',
          limit : 25,
          offset :0,
          parishName : '',
          county : ''
  });


  var parsedData = makeData(state.data);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>


          <ParishTableToolbar numSelected={state.selected.length}
            filterParams ={state.filterParams} title = 'Parishs'
            filterFieldChanged = {state.filterFieldChanged}>
          </ParishTableToolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="Parish table"
            >
              <ParishTableHeader
                classes={classes}

                numSelected={state.selected.length}
                order={state.order}
                orderBy={state.sortColumn}
                onSelectAllClick={state.handleSelectAllClick}
                onRequestSort={state.handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {

                  rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `Parish-table-checkbox-${index}`;

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
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.parishName}
                        </TableCell>
                        <TableCell  padding="none">{row.parishRegistersDeposited}</TableCell>
                        <TableCell  padding="none">{row.parishNotes}</TableCell>
                        <TableCell  padding="none">{row.parentParish}</TableCell>
                        <TableCell  padding="none">{row.parishStartYear}</TableCell>
                        <TableCell  padding="none">{row.parishEndYear}</TableCell>
                        <TableCell  padding="none">{row.parishX}</TableCell>
                        <TableCell  padding="none">{row.parishY}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25,50]}
            component="div"
            count={totalRecordCount}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onChangePage={state.handleChangePage}
            onChangeRowsPerPage={state.handleChangeRowsPerPage}
          />

      </div>
    </MuiThemeProvider>
  );
}
