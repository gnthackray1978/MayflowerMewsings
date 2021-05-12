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

import AvailableTreesToolbar from './AvailableTreesToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import {useTableState} from '../../../../pages/table/useTable';
import {theme,useSideBarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableHeaderFromState  from '../../../../pages/table/TableHeaderFromState.jsx';
import {setTree} from "../../../uxActions.jsx";




function AvailableTreesTable(props) {

  const {state,selectedTreeData, setTree} = props;

  const classes = useSideBarStyles();

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="availtrees table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `availtrees-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={() => setTree(row)}
                        role="checkbox"
                        aria-checked={state.isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={state.isItemSelected}
                      >


                          <TableCell  padding="none">
                            <Link href= 'https://uk.yahoo.com/?guccounter=1' onClick={ (event) =>
                                  {
                                    console.log('Clicked');
                                    event.preventDefault();

                                  }
                              } color="inherit">
                              {row.name}
                            </Link>


                          </TableCell>


                        <TableCell  padding="none">{row.personCount}</TableCell>
                        <TableCell  padding="none">{row.cM}</TableCell>

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
    selectedTreeData : state.ux.selectedTreeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTree: (treeId) => dispatch(setTree(treeId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AvailableTreesTable);
