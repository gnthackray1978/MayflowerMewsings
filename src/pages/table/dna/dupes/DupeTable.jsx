import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../../../features/Table/TableHeaderFromState.jsx';

export default function DupeTable(props) {

  const {state} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

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
                    <TableCell  padding="none">{row.yearStart}</TableCell>
                    <TableCell  padding="none">{row.yearEnd}</TableCell>
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
