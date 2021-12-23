import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
 
import {useStyles} from '../styleFuncs.jsx';
import TableHeaderFromState  from '../TableHeaderFromState.jsx';

export default function WillTable(props) {


  const {state, theme} = props;

  const classes = useStyles(theme);

  console.log(state.loginInfo);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="will table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    
                    const isItemSelected = state.isSelected(row.reference);
                    const labelId = `will-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => state.handleClick(event, row.reference)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >


                        <TableCell  padding="none">{row.year}</TableCell>

                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.reference}
                        </TableCell>

                        <TableCell  padding="none">{row.description}</TableCell>
                        <TableCell  padding="none">{row.place}</TableCell>
                        <TableCell  padding="none">{row.firstName}</TableCell>
                        <TableCell  padding="none">{row.surname}</TableCell>
                        <TableCell  padding="none">{row.typ}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
    </TableContainer>
  );
}
