import React, { Component } from 'react'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer'; 
import TableRow from '@material-ui/core/TableRow';  
import {useStyles} from '../../styleFuncs.jsx';
import TableHeaderFromState  from '../../TableHeaderFromState.jsx';

export default function FTMViewTable(props){

  const {state, theme} = props;

  const classes = useStyles(theme);

  return(
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size='small'
        aria-label="ftmview table"
      >
        <TableHeaderFromState state= {state}/>

        <TableBody>
          {

            state.rows.map((row, index) => {
          //    console.log(row.id);
              const isItemSelected = state.isSelected(row.id);
              const labelId = `ftmview-table-checkbox-${index}`;
              const path = 'ftmpersons?location=' + row.birthLat + '_' + row.birthLong + '_10' ;
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

                  <TableCell padding="none">{row.yearFrom}</TableCell>
                  <TableCell padding="none">{row.yearTo}</TableCell>
                  <TableCell padding="none">{row.firstName}</TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.surname}
                  </TableCell>
                  <TableCell  padding="none"><a href = {path}>{row.location}</a></TableCell>
                  <TableCell  padding="none">{row.origin}</TableCell>
                </TableRow>
              );
            })}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
