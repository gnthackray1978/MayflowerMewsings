import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


export  function useTableState(ReturnData,defaultParams, defaultOrder) {

  const [initialLoad, setInitialLoad] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(defaultOrder);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [filterParams, setFilterParams] = React.useState(defaultParams);

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

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
    console.log('called fetchmore');

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

  const filterFieldChanged = (filterObj) => {
    filterObj.limit =rowsPerPage;
    filterObj.offset = (page* rowsPerPage);
    filterObj.sortColumn = order;
    filterObj.sortOrder = orderBy;

    setFilterParams(filterObj);


    fetchMore({variables: filterObj});
  };

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

  return {
  //  initialLoad,setInitialLoad,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    filterParams,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    filterFieldChanged,

    loading, error, data
  };
}
