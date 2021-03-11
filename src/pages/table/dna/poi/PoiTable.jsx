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
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';

import PoiTableHeader from './PoiTableHeader.jsx';
import PoiTableToolbar from './PoiTableToolbar.jsx';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

export default function PoiTable(props) {


  const {ReturnData, makeData} = props;

  const classes = useStyles();
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('surname');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [filterParams, setFilterParams] = React.useState({
     sortColumn : '',
     sortOrder : '',
     limit : 0,
     offset :0,
      yearStart :'',
      yearEnd :'',
      mincm :'',
      surname :'',
      location :'',
      country : ''
  });

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

//rowsPerPage
  console.log('POITable : ' + page + ' ' + order + ' ' + orderBy );

  filterParams.limit =rowsPerPage;
  filterParams.offset = (page* rowsPerPage) ;
  filterParams.sortColumn = order;
  filterParams.sortOrder = orderBy;

  const  { loading, error, data, fetchMore } = useQuery(ReturnData, {
     errorPolicy: 'all' ,
    variables: filterParams,
    onCompleted : (data)=>{
      console.log('finished fetching');

    }

  });

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
    fetchMore(
      {
        variables: {offset : (newPage* rowsPerPage)}

      }
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchMore({variables: filterParams});
  };


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

  var parsedData = makeData(data);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>


          <PoiTableToolbar numSelected={selected.length} filterParams ={filterParams} title = 'POI'
            filterFieldChanged = {(filterObj)=>
              {
                filterObj.limit =rowsPerPage;
                filterObj.offset = (page* rowsPerPage);
                filterObj.sortColumn = order;
                filterObj.sortOrder = orderBy;

                setFilterParams(filterObj);
                console.log('filter clicked' + filterObj);

                fetchMore({variables: filterObj});
               }}>
          </PoiTableToolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="poi table"
            >
              <PoiTableHeader
                classes={classes}

                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {

                  rows.map((row, index) => {
                    //console.log(row.reference);
                    const isItemSelected = isSelected(row.id);
                    const labelId = `poi-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
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

                        <TableCell  padding="none">{row.testDisplayName}</TableCell>
                        <TableCell  padding="none">{row.testAdminDisplayName}</TableCell>
                        <TableCell  padding="none">{row.treeUrl}</TableCell>
                        <TableCell  padding="none">{row.sharedCentimorgans}</TableCell>
                        <TableCell  padding="none">{row.memory}</TableCell>
                        <TableCell  padding="none">{row.name}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25,50]}
            component="div"
            count={totalRecordCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

      </div>
    </MuiThemeProvider>
  );
}
