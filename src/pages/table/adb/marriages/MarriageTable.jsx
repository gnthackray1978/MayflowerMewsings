import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../../../features/Table/TableHeaderFromState.jsx';


export default function MarriageTable(props) {

  const {state} = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="marriage table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `marriage-table-checkbox-${index}`;

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
                          {row.maleSname}
                        </TableCell>
                        <TableCell  padding="none">{row.maleCname}</TableCell>
                        <TableCell  padding="none">{row.femaleCname}</TableCell>
                        <TableCell  padding="none">{row.femaleSname}</TableCell>
                        <TableCell  padding="none">{row.marriageLocation}</TableCell>
                        <TableCell  padding="none">{row.yearIntVal}</TableCell>
                        <TableCell  padding="none">{row.marriageCounty}</TableCell>
                        <TableCell  padding="none">{row.source}</TableCell>
                        <TableCell  padding="none">{row.witness1}</TableCell>
                        <TableCell  padding="none">{row.femaleIsKnownWidow}</TableCell>
                        <TableCell  padding="none">{row.maleIsKnownWidower}</TableCell>
                        <TableCell  padding="none">{row.isLicence}</TableCell>
                        <TableCell  padding="none">{row.totalEvents}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>

  );
}
