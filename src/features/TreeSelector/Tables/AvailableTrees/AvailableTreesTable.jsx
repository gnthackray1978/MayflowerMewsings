import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import {useSideBarStyles} from '../../../../pages/table/styleFuncs.jsx';

import TableHeaderFromState  from '../../../Table/TableHeaderFromState.jsx';


function AvailableTreesTable(props) {

  const {state} = props;

  const theme = useTheme();

  const classes = useSideBarStyles(theme);

  
 
  return (
    <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="availtrees table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {

                  state.rows.map((row, index) => {
                 
                    const isItemSelected = state.isSelected(row.id);
                    const labelId = `availtrees-table-checkbox-${index}`;

                    const rowStyle = {                     
                      backgroundColor: isItemSelected ? 'red' : '',                      
                    };

                    
                    return (
                      <TableRow
                        hover 
                        onClick={(event) => {                        
                          state.setTreeSelectionState(event,state.rows, row, false);
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        style = {rowStyle}
                        
                      >

                        <TableCell  padding="none">
                            <Link href= 'https://uk.yahoo.com/?guccounter=1' onClick={ (event) =>
                                  {
                                    console.log('Clicked');
                                    event.preventDefault();

                                  }
                              } color="inherit">
                              {row.name}
                            </Link>


                          </TableCell>
                        <TableCell  padding="none">{row.personCount}</TableCell>
                        <TableCell  padding="none">{row.cM}</TableCell>
                  
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
  );
}

 

export default AvailableTreesTable;
