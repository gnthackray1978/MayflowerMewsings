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

import FTMViewTableHeader from './FTMViewTableHeader.jsx';
import FTMViewTableToolbar from './FTMViewTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {useTableState} from '../../useTable';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        fontSize : '0.700rem',
        textAlign : 'left'
      }
    },

    MuiTable: {
      root: {
        width: '95%',

      }
    },

    MuiFormControl: {
      root: {
        paddingRight: '20px',
        flex: '1 1 100%',
        paddingBottom: '40px',
        paddingTop: '40px',
      }
    },

    MuiFormLabel: {
      root: {
        paddingRight: '20px',
        paddingTop: '40px',
      }
    },


  }

});

const useStyles = makeStyles((theme) => ({





  root: {
    width: '95%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 700,
    marginLeft: '25px',
    marginRight: '25px'
  },
  // overrides: {
  //   MuiTableCell: {
  //    root: {
  //       backgroundColor: 'lightblue'
  //     }
  //   },
  // },
  // .MuiTableCell-root :{
  //   color: red
  //
  // },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));




export default function FTMViewTable(props) {


  const {ReturnData, makeData} = props;

  const classes = useStyles();


  var state = useTableState(ReturnData,{
    sortColumn : 'surname',
    sortOrder : 'asc',
    limit : 0,
    offset :0,
    yearStart : 1500,
    yearEnd : 2000,
    location : '',
    surname : ''
  });

  if (state.loading) return <span>loading...</span>

  if(state.error && state.error.graphQLErrors && state.error.graphQLErrors.length >0){
    return (
      <div>
        <pre>Bad: {state.error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
        </pre>
      </div>
    );
  }

  var parsedData = makeData(state.data);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>


          <FTMViewTableToolbar numSelected={state.selected.length}
            filterParams ={state.filterParams} title = 'FTMView'
            filterFieldChanged = {state.filterFieldChanged}>
          </FTMViewTableToolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="ftmview table"
            >
              <FTMViewTableHeader
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
                //    console.log(row.id);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `ftmview-table-checkbox-${index}`;

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

                        <TableCell padding="none">{row.yearFrom}</TableCell>
                        <TableCell padding="none">{row.yearTo}</TableCell>
                        <TableCell padding="none">{row.firstName}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.surname}
                        </TableCell>


                        <TableCell  padding="none">{row.location}</TableCell>

                        <TableCell  padding="none">{row.origin}</TableCell>
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
