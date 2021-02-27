import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { withStyles } from '@material-ui/core/styles';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

import EnhancedTableHead from './EnhancedTableHead.jsx';
import EnhancedTableToolbar from './EnhancedTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


const GET_WILLS = gql`
query Will($first: Int!, $offset : Int!){
  will{
    search(first : $first, offset : $offset ) {
     page
     totalResults
     results {
          id
         description
         collection
         reference
         place
         year
         typ
         firstName
         surname
         occupation
         aliases
     }
   }
  }
}
`;

const headCells = [
//  { id: 'Id', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'Year', numeric: false, disablePadding: true, label: 'Year' },
  { id: 'Reference', numeric: false, disablePadding: true, label: 'Reference' },
  { id: 'Description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'Place', numeric: false, disablePadding: true, label: 'Place' },
  { id: 'FirstName', numeric: false, disablePadding: true, label: 'FirstName' },
  { id: 'Surname', numeric: false, disablePadding: true, label: 'Surname' },
  { id: 'Typ', numeric: false, disablePadding: true, label: 'Type' },
];

function makeData(data){



  let rows = [];

  let idx =0;

  while(idx < data.will.search.results.length){
    let tp = data.will.search.results[idx];

    rows.push(tp);

    idx++;
  }

  return rows;

}

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }
//
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }




const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        fontSize : '0.700rem',
        textAlign : 'left'
      }
    },

    MuiTable: {
      root: {
        width: '95%',

      }
    },

    MuiFormControl: {
      root: {
        paddingRight: '20px',
        flex: '1 1 100%',
        paddingBottom: '40px',
        paddingTop: '40px',
      }
    },

    MuiFormLabel: {
      root: {
        paddingRight: '20px',
        paddingTop: '40px',
      }
    },


  }

});



const useStyles = makeStyles((theme) => ({





  root: {
    width: '95%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 700,
    marginLeft: '25px',
    marginRight: '25px'
  },
  // overrides: {
  //   MuiTableCell: {
  //    root: {
  //       backgroundColor: 'lightblue'
  //     }
  //   },
  // },
  // .MuiTableCell-root :{
  //   color: red
  //
  // },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));



export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('year');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [filterParams, setFilterParams] = React.useState({
     sortColumn : '',
     sortOrder : '',
     first : 0,
     offset :0,
     yearStart : 0,
     yearEnd : 2000,
     ref : '',
     desc : '',
     place : '',
     surname : ''
  });
  // const [yearTo, setYearTo] = React.useState(2000);
  // const [ref, setRef] = React.useState('');
  // const [desc, setDesc] = React.useState('');
  // const [place, setPlace] = React.useState('');
  // const [surname, setSurname] = React.useState('');



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;


//rowsPerPage
  console.log('EnhancedTable : ' + page + ' ' + order + ' ' + orderBy );

  filterParams.first = (page* rowsPerPage);
  filterParams.offset = rowsPerPage;
  filterParams.sortColumn = order;
  filterParams.sortOrder = orderBy;

  const { loading, error, data } = useQuery(GET_WILLS, {
     errorPolicy: 'all' ,
    variables: filterParams,
    fetchPolicy: "no-cache",
    onCompleted : (data)=>{
  //    console.log(data.will.search.results[0].id);

    }

  });


  if (loading) return <span>loading...</span>

  if(error && error.graphQLErrors && error.graphQLErrors.length >0){
    return (
      <div>
        <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
        </pre>
      </div>
    );
  }


  var rows = makeData(data);



const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>


          <EnhancedTableToolbar numSelected={selected.length} title = 'Wills'
            filterFieldChanged = {(filterObj)=>
              {
                setFilterParams(filterObj);
                console.log('filter clicked' + filterObj);
               }}>
          </EnhancedTableToolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                headCells ={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {
                  //stableSort(rows, getComparator(order, orderBy))
              //    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  rows.map((row, index) => {
                    const isItemSelected = isSelected(row.reference);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.reference)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.reference}
                        selected={isItemSelected}
                      >


                        <TableCell  padding="none">{row.year}</TableCell>

                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.reference}
                        </TableCell>

                        <TableCell  padding="none">{row.description}</TableCell>
                        <TableCell  padding="none">{row.place}</TableCell>
                        <TableCell  padding="none">{row.firstname}</TableCell>
                        <TableCell  padding="none">{row.surname}</TableCell>
                        <TableCell  padding="none">{row.typ}</TableCell>
                      </TableRow>
                    );
                  })}
             
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.will.search.totalResults}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

      </div>
    </MuiThemeProvider>
  );
}
