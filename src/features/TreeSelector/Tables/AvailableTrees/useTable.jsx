import React  from 'react';
import { useQuery } from '@apollo/client';



export  function useAvTreesState(ReturnData,defaultParams, schema, subSchema) {

  const [initialLoad, setInitialLoad] = React.useState(false);
  const [order, setOrder] = React.useState(defaultParams.sortOrder);
  const [sortColumn, setSortColumn] = React.useState(defaultParams.sortColumn);
  const [selected, setSelected] = React.useState([]);
  const [treeSelectionState, setTreeState] = React.useState(defaultParams.treeSelectionState);
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


  const setTreeSelectionState = (event, rows, row, singleSelect) => {

    let name = row.id;

    const makeOriginString = (rows, previouslySelectedIds)=>{

      //console.log('makeOriginString..');
   
       let origins =[];
   
       if(!previouslySelectedIds){
         return '';
       }
   
       rows.forEach(row => {
         previouslySelectedIds.forEach(prevSelId => {
           if(row.id == prevSelId){
             if(!origins.includes(row.name))
               origins.push(row.name);
           }
         });
   
       });
   
       var newString = origins.join(' ');
   
       //console.log(newString);
   
       return newString;
   
    };
   

    //console.log('handleclick');
    if(singleSelect){
      
      selected.splice(0, selected.length);
      selected.push(name);
      setSelected(selected);
      return selected;
    }
    else{
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

      let originString = makeOriginString(rows,newSelected, row);

      let treeState = {idString : newSelected.join(','),description : originString};

      setSelected(newSelected);
      setTreeState(treeState);
      
      console.log('newSelected',newSelected);
    }

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

    if(data && data[schema])
     totalRecordCount =  data[schema][subSchema].totalResults;

    return {
      rows,
      totalRecordCount
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

  //console.log('network stat: ' + networkStatus + ' ' + loading);

  //console.log('useQuer : ' + loading +  networkStatus );

  var parsedData = makeData(data,schema, subSchema);

  var rows = parsedData.rows;

  var totalRecordCount = parsedData.totalRecordCount;

  if(!totalRecordCount) totalRecordCount =0;


 
  const setSelection = function(){
    
    console.log('setSelection called');

    if(!treeSelectionState || treeSelectionState.idString == '') return;
    if(selected.length != 0) return;
    if(!rows || rows.length==0) return;

   
    let idList = treeSelectionState.idString.split(',');
    // let idList =[];

    // rows.forEach(row=>{
    //   treeNames.forEach(name => {
    //     if(row.name == name && !idList.includes(row.id))
    //       idList.push(row.id);
    //   });
    // });

    if(idList.length >0)
      setSelected(idList);
  
  }

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
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    filterFieldChanged,

    loading, error, data,rows,totalRecordCount,setSelected,setTreeSelectionState,treeSelectionState,setSelection
  };
}
