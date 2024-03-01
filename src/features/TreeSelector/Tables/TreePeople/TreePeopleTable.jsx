import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { connect } from "react-redux";
 import {useSideBarStyles} from '../../../../pages/table/styleFuncs.jsx';
 import {setPerson} from "../../../uxActions.jsx";
import TableHeaderFromState  from '../../../Table/TableHeaderFromState.jsx';
import { useTheme } from '@mui/material/styles';


function TreePeopleTable(props){

  const {state,setPerson} = props;

  const theme = useTheme();
  
  const classes = useSideBarStyles(theme);


  return(
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size='small'
        aria-label="treepeople table"
      >
        <TableHeaderFromState state= {state}/>

        <TableBody>
          {

            state.rows.map((row, index) => {
          //    console.log(row.id);
              const isItemSelected = state.isPersonSelected(row.id);
              const labelId = `treepeople-table-checkbox-${index}`;

              const rowStyle = {                     
                backgroundColor: isItemSelected ? 'blue' : '',                      
              };

              const avgYear =  Number(row.yearStart);//(Number(row.yearEnd) + Number(row.yearStart)) /2;
              const name = row.firstName + ' ' + row.surname;
              return (
                <TableRow
                  hover
                  onClick={(event) => {
                      state.setTreePerson( row.id);
                      setPerson(row.id);
                    }
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  style = {rowStyle} 
                >
                  <TableCell padding="none">{avgYear}</TableCell>

                  <TableCell  padding="none">
                    <Link id={labelId}  href= 'https://uk.yahoo.com/?guccounter=1' onClick={ (event) =>
                          {
                            console.log('Clicked');
                            event.preventDefault();
                          }
                      } color="inherit">
                      {name}
                    </Link>
                  </TableCell>

                  <TableCell padding="none">{row.location}</TableCell>
                </TableRow>
              );
            })}

        </TableBody>
      </Table>
    </TableContainer>
  );
}


const mapStateToProps = state => {
  return {
  //  treeId : state.ux.treeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPerson: (person) => dispatch(setPerson(person)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreePeopleTable);
