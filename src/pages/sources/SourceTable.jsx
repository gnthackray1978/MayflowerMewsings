import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../table/styleFuncs.jsx';
import TableHeaderFromState  from '../../features/Table/TableHeaderFromState.jsx';

export default function SourceTable(props) {

  const {state} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="source table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
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

  );
}
