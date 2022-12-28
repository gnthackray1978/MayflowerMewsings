import React, { Component } from 'react';
import { useQuery } from '@apollo/client';

export  function useTableState(ReturnData,defaultParams, schema, subSchema) {


  const [order, setOrder] = React.useState(defaultParams.sortOrder);
  const [sortColumn, setSortColumn] = React.useState(defaultParams.sortColumn);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50); 
  const [filterParams, setFilterParams] = React.useState(defaultParams);
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  
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

  const makeData = function(data, schema, subSchema){

    let rows = [];

    if(!data) return rows;

    if(!data[schema][subSchema]) return rows;

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



  //console.log('useQuer : ' + loading +  networkStatus );

  var parsedData = makeData(data,schema, subSchema);

  var mainFeaturedPost= {
    title: 'Loading..',
    text:
      "We'll get there eventually. Dont give up hope!",
      imageURL: 'https://source.unsplash.com/random',
      imageDescription: 'main image description',
      linkURL : 'http://localhost:1234',
      linkDescription: 'Continue reading…',
  };
  
  var featuredPosts =[
    {
      title: 'Featured post',
      dateLastEdit: 'Nov 12',
      text:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      imageURL: 'https://source.unsplash.com/random',
      
      imageDescription: 'Image Text',
    },
    {
      title: 'Post title',
      dateLastEdit: 'Nov 11',
      text:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      imageURL: 'https://source.unsplash.com/random',
      imageDescription: 'Image Text',
    },
  ];
  
  const makeDate =(dateString) => {
    let d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day:"numeric", year:"numeric", month:"short"});
  };

  var posts = [];
 // var featuredPosts =[]; 
  var months = [];

  if(parsedData.rows && parsedData.rows.length > 0){
      posts = [];
      featuredPosts =[];

      for(var post of parsedData.rows){
          if(post.level === 1){
              mainFeaturedPost = post;
              break;
          }
      }

      for(var post of parsedData.rows){
          if(post.level === 2){
              featuredPosts.push(post);      
          }
      }

      for(var post of parsedData.rows){             
          if(post.level !== 1)
              posts.push(post);                              
      }

      for(var post of parsedData.rows){             
          let d = new Date(post.dateLastEdit);               

          let month = d.getMonth();
          let year = d.getFullYear();

         
          let found = false;
          for(var m of months){
              if(m.month === month && m.year === year){
                  found = true;
                  break;
              }
          }

          //{ title: 'March 2020', url: '#' },
          if(!found){
              months.push(
                {
                  
                  title: monthNames[month] + ' ' + year,
                  url: '#',
                  month,
                  year,
                  monthKey : month + '-' + year
                });              
          }

      }

  }


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
    handleClick,
    isSelected,
    filterFieldChanged,

    loading, error, data,
    mainFeaturedPost,
    featuredPosts,
    posts,
    months,
    totalRecordCount,loginInfo,errorMessage
  };
}

