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

import SourceTableToolbar from './SourceTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {useTableState} from '../../useTable.jsx';

import {theme,useStyles} from '../../styleFuncs.jsx';
import GenericTableHeader  from '../../genericTableHeader.jsx';

export default function SourceTable(props) {


  const {ReturnData, makeData, headCells} = props;

  const classes = useStyles();

  var state = useTableState(ReturnData,{
          sortColumn : 'sourceRef',
          sortOrder : 'asc',
          limit : 0,
          offset :25,
          yearStart : 1500,
          yearEnd: 1800,
          location :'',
          sourceRef : ''
  });


  var parsedData = makeData(state.data);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>


          <SourceTableToolbar numSelected={state.selected.length}
            filterParams ={state.filterParams} title = 'Sources'
            filterFieldChanged = {state.filterFieldChanged}>
          </SourceTableToolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="source table"
            >
              <GenericTableHeader
                classes={classes}

                numSelected={state.selected.length}
                order={state.order}
                orderBy={state.sortColumn}
                onSelectAllClick={state.handleSelectAllClick}
                onRequestSort={state.handleRequestSort}
                rowCount={rows.length}
                headCells ={headCells}
              />
              <TableBody>
                {

                  rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `source-table-checkbox-${index}`;

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
                          {row.sourceRef}
                        </TableCell>
                        <TableCell  padding="none">{row.sourceDate}</TableCell>
                        <TableCell  padding="none">{row.sourceDateTo}</TableCell>
                        <TableCell  padding="none">{row.originalLocation}</TableCell>
                        <TableCell  padding="none">{row.isCopyHeld}</TableCell>
                        <TableCell  padding="none">{row.isViewed}</TableCell>
                        <TableCell  padding="none">{row.isThackrayFound}</TableCell>
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
