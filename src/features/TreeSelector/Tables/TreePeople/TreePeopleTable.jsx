import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import { connect } from "react-redux";
 import {useSideBarStyles} from '../../../../pages/table/styleFuncs.jsx';
import TableHeaderFromState  from '../../../Table/TableHeaderFromState.jsx';
import {setTreePerson} from "../../../uxActions.jsx";
import { useTheme } from '@material-ui/core/styles';


function TreePeopleTable(props){

  const {state, setTreePerson} = props;

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
              const isItemSelected = state.isSelected(row.id);
              const labelId = `treepeople-table-checkbox-${index}`;
              const avgYear = (Number(row.yearTo) + Number(row.yearFrom)) /2;
              const name = row.firstName + ' ' + row.surname;
              return (
                <TableRow
                  hover
                  onClick={(event) => setTreePerson(row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
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
    treeId : state.ux.treeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTreePerson: (person) => dispatch(setTreePerson(person)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreePeopleTable);
