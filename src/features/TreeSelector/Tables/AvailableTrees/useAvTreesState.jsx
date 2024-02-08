import React  from 'react';
import { useQuery } from '@apollo/client';
import { errorFormatter } from '../../../../shared/common';
import{setParams, getParams} from '../../../Table/qryStringFuncs.jsx';

export  function useAvTreesState(ReturnData,defaultParams, subSchema) {

  console.log('useAvTreesState called');
  
  let qryStrObj = getParams();

  //we need to make sure this is a string if someone has been editting the query string!!!
  //then it can be set as a number

  qryStrObj.origin = String(qryStrObj.origin ?? '');
  qryStrObj.persons = String(qryStrObj.persons ?? '');
 
  const [filterParams, setFilterParams] = React.useState({...defaultParams,...qryStrObj});

  // a bit of a hack because I don't want to change the way the filterParams are set
  // as this will trigger another call to the api to refresh the data
  // and I do need to cause a rerender when the persons/origins are changed.
  // so origin & persons are stored in 2 places (hmmmm).

  const [persons, setPersons] = React.useState(String(qryStrObj.persons?? ''));
  const [origin, setOrigin] = React.useState(String(qryStrObj.origin ?? ''));


  const handleRequestSort = (event, property) => { 
    setFilterParams({...filterParams, ...{
      sortOrder : isAsc ? 'desc' : 'asc',
      sortColumn : property
    }});
  };

  const handleChangePage = (event, newPage) => {

    setFilterParams({...filterParams, ...{
      page : newPage,
      offset : (newPage * filterParams.limit)
    }});

    refetch(
      {
        offset: (newPage * filterParams.limit)
      }
    );
  };

  const handleChangeRowsPerPage = (event) => { 
    setFilterParams({...filterParams, ...{
      page : 0,
      limit : parseInt(event.target.value, 10),
    }});

    refetch({
        variables: filterParams
    });
  };

  const treeNameFilterChanged = (treeName) => {     
    
    setFilterParams({...filterParams, ... {
      treeName : treeName,
    }});

    refetch(
      {
        variables: filterParams
      }
    );

  };

  const treePersonFilterChanged = (params) => {     
    //todo replace with splice
    setParams(params);
    
    setFilterParams({...filterParams, ... params});
 
    refetch(filterParams);
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

    let selected = origin.split(',') ??[];

    const selectedIndex = selected.indexOf(String(treeId));

    return selectedIndex !== -1;

  }

  const setTree = (treeId) => {
   // console.log('setTree called');

  //  let qryStrObj = getParams(); 

    treeId = String(treeId);
    let newSelected = [];

    //let tpOrigin = String(qryStrObj?.origin ?? '');

    let selected = origin.split(',') ??[];

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

    let params ={
      origin : newSelected.join(','),      
    }
  
    setParams(params);
   
   // setFilterParams({...filterParams, ... params});

    setOrigin(params.origin);
  };

  const setTreePerson = (personId) => {
   // let qryStrObj = getParams(); 
    
    // this is used by diagram generating code.
  
    let newSelected = [];

   // let p =qryStrObj?.persons ?? '';

    let selected = persons.split(',');

    const selectedIndex = selected.indexOf(String(personId));
    

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

    let params ={
      persons : newSelected.join(','),
    };

    setParams(params);

   // setFilterParams({...filterParams, ... params});

    
    setPersons(params.persons);
  };

 
  console.log('filter param: ' + filterParams);

  const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
     errorPolicy: 'all' ,
     variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network",
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
 
  let errors = errorFormatter(loading,error, internalServerError, networkStatus);

  return {
     order :  filterParams.sortOrder,
     sortColumn : filterParams.sortColumn,
     page : filterParams.page,
    rowsPerPage : filterParams.limit,
    filterParams,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    isPersonSelected,
    treeNameFilterChanged,
    treePersonFilterChanged,
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
