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
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


import TreePeopleTableToolbar from './TreePeopleTableToolbar.jsx';
import {useTableState} from '../../../../pages/table/useTable';
import {theme,useSideBarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableHeaderFromState  from '../../../../pages/table/TableHeaderFromState.jsx';
import {setTreePerson} from "../../../uxActions.jsx";



function TreePeopleTable(props){

  const {state, setTreePerson} = props;

  const classes = useSideBarStyles();


  return(
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size='small'
        aria-label="treepeople table"
      >
        <TableHeaderFromState state= {state}/>

        <TableBody>
          {

            state.rows.map((row, index) => {
          //    console.log(row.id);
              const isItemSelected = state.isSelected(row.id);
              const labelId = `treepeople-table-checkbox-${index}`;
              const avgYear = (Number(row.yearTo) + Number(row.yearFrom)) /2;
              const name = row.firstName + ' ' + row.surname;
              return (
                <TableRow
                  hover
                  onClick={(event) => setTreePerson(row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="none">{avgYear}</TableCell>

                  <TableCell  padding="none">
                    <Link id={labelId}  href= 'https://uk.yahoo.com/?guccounter=1' onClick={ (event) =>
                          {
                            console.log('Clicked');
                            event.preventDefault();
                          }
                      } color="inherit">
                      {name}
                    </Link>
                  </TableCell>

                  <TableCell padding="none">{row.location}</TableCell>
                </TableRow>
              );
            })}

        </TableBody>
      </Table>
    </TableContainer>
  );
}


const mapStateToProps = state => {
  return {
    treeId : state.ux.treeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTreePerson: (person) => dispatch(setTreePerson(person)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreePeopleTable);
