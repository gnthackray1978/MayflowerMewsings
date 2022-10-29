import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';

import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';
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
