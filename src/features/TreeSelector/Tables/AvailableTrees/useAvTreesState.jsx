import React  from 'react';
import { useQuery } from '@apollo/client';
import {useSearchParamsState} from '../../../../shared/useSearchParamsState.jsx';
import { errorFormatter } from '../../../../shared/common';

export  function useAvTreesState(ReturnData,defaultParams, subSchema) {

  //const [initialLoad, setInitialLoad] = React.useState(false);
  const [order, setOrder] = React.useState(defaultParams.sortOrder);
  const [sortColumn, setSortColumn] = React.useState(defaultParams.sortColumn);
//  const [selected, setSelected] = React.useState([]);
  //const [origin, setOrigin] = React.useState(defaultParams.origin);
  //const [originDescription, setOriginDescription] = React.useState(defaultParams.originDescription);
  
  const [origins, setOrigin] = useSearchParamsState("origins", defaultParams.origin);
  const [persons, setPerson] = useSearchParamsState("persons", '');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  //const [totalRecords, setTotalRecords] = React.useState(0);

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
    
    

     

   // console.log('filterFieldChanged');
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


  const isPersonSelected = (personId) =>{ 

    //we dont have multiple selection for persons yet 
    //but perhaps we will in the future
    let selected = persons?.split(',') ??[];

    const selectedIndex = selected.indexOf(String(personId));

    return selectedIndex !== -1;

  }

  const isSelected = (treeId) =>{ 

    //let newSelected = [];

    let selected = origins?.split(',') ??[];

    const selectedIndex = selected.indexOf(String(treeId));

    return selectedIndex !== -1;

  }

  const makeIdString = (ids, previouslySelectedIds)=>{

    //console.log('makeOriginString..');
 
     let origins =[];
 
     if(!previouslySelectedIds){
       return '';
     }
 
     ids.forEach(row => {
       previouslySelectedIds.forEach(prevSelId => {
         if(id == prevSelId){
           if(!origins.includes(id))
             origins.push(id);
         }
       });
 
     });
 
     var newString = origins.join(' ');
 
     //console.log(newString);
 
     return newString;
 
  };

  const setTree = (treeId) => {
    console.log('setTree called');
    treeId = String(treeId);
    let newSelected = [];
    let selected = origins?.split(',') ??[];

    const selectedIndex = selected.indexOf(treeId);
    

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, treeId);
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

    setOrigin(newSelected.join(','));
    
    //console.log('newSelected',newSelected);
  };

  const setTreePerson = (personId) => {
    // this is used by diagram generating code.
    personId = String(personId);
    let newSelected = [];
    let selected = persons?.split(',') ??[];

    const selectedIndex = selected.indexOf(personId);
    

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, personId);
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

    setPerson(newSelected.join(','));
  };

 
  console.log('origin set to: ' + origins);

  filterParams.limit =rowsPerPage;
  filterParams.offset = (page* rowsPerPage) ;
  filterParams.sortColumn = sortColumn;
  filterParams.sortOrder = order;
  filterParams.origin = origins;

  const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
    // errorPolicy: 'all' ,
     variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });

  //console.log('loading : ' + loading + ' network status: '   + data);

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
    page,
    rowsPerPage,
    filterParams,
    handleRequestSort,
    handleSelectAllClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    isPersonSelected,
    filterFieldChanged,
    setTree,
    setTreePerson,
    loading, 
    errors, 
    data,
    rows,
    totalRows,
    origin
  };
}
