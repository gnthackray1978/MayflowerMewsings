import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


export  function useTableState(ReturnData,defaultParams, schema, subSchema) {

  const [initialLoad, setInitialLoad] = React.useState(false);
  const [order, setOrder] = React.useState(defaultParams.sortOrder);
  const [sortColumn, setSortColumn] = React.useState(defaultParams.sortColumn);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [filterParams, setFilterParams] = React.useState(defaultParams);

  const handleRequestSort = (event, property) => {
    const isAsc = sortColumn === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSortColumn(property);
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
    console.log('called handleChangePage');

  //  var tp = {};

    var tp = (newPage * rowsPerPage);

    refetch(
      {
        offset: tp
      }
    );
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('called handleChangeRowsPerPage');
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refetch({
        variables: filterParams
    });
  };

  const filterFieldChanged = (filterObj) => {
    console.log('called filterFieldChanged');

    filterObj.limit =rowsPerPage;
    filterObj.offset = (page* rowsPerPage);
    filterObj.sortColumn = sortColumn;
    filterObj.sortOrder = order;

    setFilterParams(filterObj);


    //let tp =
    refetch(
      {
        variables: filterObj
      }
    );

    // tp.then(
    //   function(value) {
    //
    //     console.log('prom val: ' + value);
    //   },
    //   function(error) {
    //
    //     console.log('prom error: ' + error);
    //   }
    // );


  };


  const makeData = function(data, schema, subSchema){

    let rows = [];

    if(!data) return rows;

    let idx =0;

    while(idx < data[schema][subSchema].results.length){
      let tp = data[schema][subSchema].results[idx];

      rows.push(tp);

      idx++;
    }

    let totalRecordCount =0;
    let loginInfo = '';
    let errorMessage = '';
    if(data && data[schema]){
     totalRecordCount =  data[schema][subSchema].totalResults;
     loginInfo =  data[schema][subSchema].loginInfo;
     errorMessage = data[schema][subSchema].error;
    }

    return {
      rows,
      totalRecordCount,
      errorMessage,
      loginInfo
    };

  }

  filterParams.limit =rowsPerPage;
  filterParams.offset = (page* rowsPerPage) ;
  filterParams.sortColumn = sortColumn;
  filterParams.sortOrder = order;

  const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
    // errorPolicy: 'all' ,
     variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });



  console.log('useQuer : ' + loading +  networkStatus );

  var parsedData = makeData(data,schema, subSchema);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;
  
  var loginInfo = parsedData.loginInfo;
  var errorMessage = parsedData.errorMessage;

  return {
  //  initialLoad,setInitialLoad,
    order,
    sortColumn,
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

    loading, error, data,rows,totalRecordCount,loginInfo,errorMessage
  };
}
