import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../../../features/Table/TableHeaderFromState.jsx';

export default function PoiTable(props) {

  const {state} = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="poi table"
          >
            <TableHeaderFromState state= {state}/>

            <TableBody>
              {

                state.rows.map((row, index) => {
                  //console.log(row.reference);
                  const isItemSelected = state.isSelected(row.id);
                  const labelId = `poi-table-checkbox-${index}`;
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

                       <TableCell  padding="none">{row.christianName}</TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.surname}
                    </TableCell>

                    <TableCell  padding="none">{row.birthYear}</TableCell>
                    <TableCell  padding="none">{row.birthPlace}</TableCell>

                      <TableCell  padding="none">{row.birthCounty}</TableCell>

                      <TableCell  padding="none">
                        <Link href={row.treeUrl} onClick={(event) => event.preventDefault()} color="inherit">
                          {row.testDisplayName}
                        </Link>


                      </TableCell>
                      <TableCell  padding="none">{row.testAdminDisplayName}</TableCell>

                      <TableCell  padding="none">{row.sharedCentimorgans}</TableCell>

                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
  );
}
