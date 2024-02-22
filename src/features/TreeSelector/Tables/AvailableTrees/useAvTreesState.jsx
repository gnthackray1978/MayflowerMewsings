import React  from 'react';
import { useQuery } from '@apollo/client';
import { errorFormatter } from '../../../../shared/common';
import{setParams, getParams} from '../../../Table/qryStringFuncs.jsx';

export  function useAvTreesState(ReturnData,defaultParams, subSchema, rdxSetTree) {

  //console.log('useAvTreesState called');
  
  let qryStrObj = getParams();

  //we need to make sure this is a string if someone has been editting the query string!!!
  //then it can be set as a number

  qryStrObj.origin = String(qryStrObj.origin ?? '');
  qryStrObj.persons = String(qryStrObj.persons ?? '');
 
  //validate filterParams
  //write a function that checks the filterParams has valid data
  
  //if its valid then set it as component state


  const [filterParams, setFilterParams] = React.useState({...defaultParams,...qryStrObj});

  // a bit of a hack because I don't want to change the way the filterParams are set
  // as this will trigger another call to the api to refresh the data
  // and I do need to cause a rerender when the persons/origins are changed.
  // so origin & persons are stored in 2 places (hmmmm).

  const [persons, setPersons] = React.useState(String(qryStrObj.persons?? ''));
  const [origin, setOrigin] = React.useState(String(qryStrObj.origin ?? ''));
  let rows = [];
  let totalRows = 0;  
  let loginInfo = '';
  let internalServerError = '';


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
 //   let selected = persons?.split(',') ??[];

    //const selectedIndex = selected.indexOf(String(personId));

    return personId == persons;

  }

  const isSelected = (treeId) =>{ 

    //let newSelected = [];

    let selected = origin.split(',') ??[];

    const selectedIndex = selected.indexOf(String(treeId));

    return selectedIndex !== -1;

  }

  const setTree = (rows, treeId) => {
//    console.log('setTree called');
 
    treeId = String(treeId);
    let newSelected = [];
 
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

    let description = '';
    for(let r of rows){
      for(let originId of newSelected){
        if(originId == r.id){
          description += ' ' + r.name;
        }
      }
    }

    let params ={
      origin : newSelected.join(','),  
      originDescription : description    
    }
  
    //ffs setting state in 3 places!!!!
  
    setParams(params);

    setOrigin(params.origin);
  };

  const setTreePerson = (personId) => {
    // only set one person at a time
    let newSelected ='';
    if(String(persons).search(personId) == -1){
      newSelected = String(personId);
    }

    let params ={
      persons : newSelected
    };

    setParams(params);

    setPersons(params.persons);
  };



 //the useAvTreesState hook might be called numerous times
 //but it doesnt matter.
 //the api only gets called when the filterParams is changed !
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
