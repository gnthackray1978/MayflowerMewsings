import React, { Component , useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {useStyles} from './styleFuncs.jsx';
import {getGEDFiles,selectGEDFile, deleteGEDFile} from './data.jsx';
import Link from '@mui/material/Link';
import TableHeaderFromState  from '../../features/Table/TableHeaderFromState.jsx';

export default function GEDTable(props) {

    const state ={
        order : 'asc',
        sortColumn : 'name',
        selected : [],
        page    : 0,
        rowsPerPage : 5,
        //filterParams    ,
        errors  : [],
        loading : false,
        rows   : [],  
        totalRows   : 5,
        handleRequestSort : (event, property) => {},
        handleSelectAllClick: (event, property) => {},
        handleClick: (event, property) => {},
        handleChangePage: (event, property) => {},
        handleChangeRowsPerPage: (event, property) => {},
        filterFieldChanged: (event, property) => {}    
      }

  const {timeStamp, selectGEDClick,deleteGEDClick} = props;      

  const theme = useTheme();
  const classes = useStyles(theme);
  const [rows,setRows] = React.useState([]);
  
  const isSelected = (id) => {

    for(let row of rows){
        if(row.id == id){
            return true;
        }
    }
    return false;
    
  };


  // const selectClick = (event, id) => {
  //  // console.log('select clicked: ' + id);
    
  //   selectGEDFile(id, ()=>{
  //       console.log('complete');
  //       getGEDFiles().then((data) => {
  //           if(data)
  //               setRows(data);
  //       });
  //   });

  //   event.preventDefault() ;
  // };

  // const deleteClick = (event, id) => {
  // //  console.log('delete clicked: ' + id);


  //   deleteGEDFile(id, (result)=>{
  //     console.log('complete');

  //     if(result.status == 'success'){
  //       getGEDFiles().then((data) => {
  //           if(data)
  //               setRows(data);
  //       });
  //     }


  // });

  //   event.preventDefault() ;
  // };

    useEffect(() => {
     //   console.log('use effect ged table')
        getGEDFiles((data)=>{
            if(data && data.status == 'success')
                setRows(data.data);
          }
        );
    }, [timeStamp]);

 

      const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'size', numeric: false, disablePadding: true, label: 'Size' },
        { id: 'dateImported', numeric: false, disablePadding: true, label: 'Date' },        
        { id: 'user', numeric: false, disablePadding: true, label: 'User' },
        { id: 'select', numeric: false, disablePadding: true, label: 'Select' },
        { id: 'delete', numeric: false, disablePadding: true, label: 'Delete' },
        { id: 'importStatus', numeric: false, disablePadding: true, label: 'Status' }, 
      ];
  

    state.headCells = headCells;
    state.title =`GED Table`;

  return (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="GED table"
            >
              <TableHeaderFromState state= {state}/>

              <TableBody>
                {
                  rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = row.selected;
                    const labelId = `ged-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover = {true}
                        onClick={(event) => state.handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >                        
                        <TableCell className= {classes.cell_long} padding="none">{row.name}</TableCell>
                        <TableCell className= {classes.cell_short} padding="none">{row.size}</TableCell>
                        <TableCell className= {classes.cell_short} padding="none">{row.dateImported}</TableCell>
                        <TableCell className= {classes.cell_short} padding="none">{row.user}</TableCell>
                        <TableCell className= {classes.cell_short} padding="none"><Link href="#" 
                            onClick = {(event,id)=>{selectGEDClick(event,row.id)} }  >Select</Link></TableCell>
                        <TableCell className= {classes.cell_short} padding="none"><Link href="#"
                            onClick = {(event,id)=>{deleteGEDClick(event,row.id)} }  >Delete</Link></TableCell>
                        <TableCell className= {classes.cell_short} padding="none">{row.importStatus}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>

  );
}
