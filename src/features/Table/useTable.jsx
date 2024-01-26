import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { errorFormatter } from '../../shared/common';



export  function useTableState(ReturnData,defaultParams, subSchema) {

  const [order, setOrder] = React.useState(defaultParams.sortOrder);
  const [sortColumn, setSortColumn] = React.useState(defaultParams.sortColumn);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
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
    //console.log('called filterFieldChanged');

    filterObj.limit =rowsPerPage;
    filterObj.offset = (page* rowsPerPage);
    filterObj.sortColumn = sortColumn;
    filterObj.sortOrder = order;

    setFilterParams(filterObj);

    refetch(
      {
        variables: filterObj
      }
    );
  };


  filterParams.limit =rowsPerPage;
  filterParams.offset = (page* rowsPerPage) ;
  filterParams.sortColumn = sortColumn;
  filterParams.sortOrder = order;

  const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
     errorPolicy: 'all' ,
     variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });



  console.log('loading : ' + loading + ' network status: ' +  networkStatus + ' error:' + error + ' data: ' + data);

  //loading : false network status: 8 
  // error:Error: Response not successful: Received status code 400 data: undefined
 // var parsedData = makeData(data, subSchema);


  var rows = [];
  var totalRows = 0;  
  var loginInfo = '';
  var internalServerError = '';


  if(data && data[subSchema]) 
  {
    rows = data[subSchema].rows;
    totalRows =  data[subSchema].totalRows;
    loginInfo =  data[subSchema].loginInfo;
    internalServerError = data[subSchema].error?.trim() ?? ''; //bit of a hack
  }
 
  let errors = errorFormatter(loading,error, internalServerError);

  return {
    order,
    sortColumn,
    selected,
    page,
    rowsPerPage,
    filterParams,
    errors,
    loading,
    rows,
    totalRows,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    filterFieldChanged    
  };
}
