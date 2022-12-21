import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../../../features/Table/TableHeaderFromState.jsx';

export default function TrsTable(props) {

  const {state} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="trs table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `trs-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => state.handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={state.isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={state.isItemSelected}
                      >
                        <TableCell  padding="none">{row.name}</TableCell>
                        <TableCell  padding="none">{row.personCount}</TableCell>
                        <TableCell  padding="none">{row.cM}</TableCell>
                        <TableCell  padding="none">{row.located}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.origin}
                        </TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
  );
}
