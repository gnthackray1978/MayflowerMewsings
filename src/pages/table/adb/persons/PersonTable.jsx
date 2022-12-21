import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../../../features/Table/TableHeaderFromState.jsx';

export default function PersonTable(props) {


  const {state} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="Person table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `person-table-checkbox-${index}`;

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

                        <TableCell  padding="none">{row.estBirthYearInt}</TableCell>
                        <TableCell  padding="none">{row.deathInt}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.christianName}
                        </TableCell>


                        <TableCell  padding="none">{row.surname}</TableCell>
                        <TableCell  padding="none">{row.birthLocation}</TableCell>
                        <TableCell  padding="none">{row.birthCounty}</TableCell>
                        <TableCell  padding="none">{row.deathLocation}</TableCell>
                        <TableCell  padding="none">{row.deathCounty}</TableCell>
                        <TableCell  padding="none">{row.fatherChristianName}</TableCell>
                        <TableCell  padding="none">{row.motherChristianName}</TableCell>
                        <TableCell  padding="none">{row.motherSurname}</TableCell>


                        <TableCell  padding="none">{row.occupation}</TableCell>
                        <TableCell  padding="none">{row.spouseName}</TableCell>
                        <TableCell  padding="none">{row.spouseSurname}</TableCell>
                        <TableCell  padding="none">{row.totalEvents}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
  );
}
