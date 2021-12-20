import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../TableHeaderFromState.jsx';

export default function DupeTable(props) {

  const {state} = props;

  const classes = useStyles();

  return (
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size='small'
          aria-label="dupe table"
        >
          <TableHeaderFromState state= {state}/>

          <TableBody>
            {

              state.rows.map((row, index) => {
                //console.log(row.reference);
                const isItemSelected = state.isSelected(row.id);
                const labelId = `dupe-table-checkbox-${index}`;

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
                    <TableCell  padding="none">{row.yearFrom}</TableCell>
                    <TableCell  padding="none">{row.yearTo}</TableCell>
                    <TableCell  padding="none">{row.origin}</TableCell>
                    <TableCell  padding="none">{row.location}</TableCell>
                    <TableCell  padding="none">{row.firstName}</TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.surname}
                    </TableCell>

                  </TableRow>
                );
              })}

          </TableBody>
        </Table>
      </TableContainer>
  );
}
