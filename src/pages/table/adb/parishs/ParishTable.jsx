import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../TableHeaderFromState.jsx';

export default function ParishTable(props) {

  const {state, theme} = props;

  const classes = useStyles(theme);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="Parish table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
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

  );
}
