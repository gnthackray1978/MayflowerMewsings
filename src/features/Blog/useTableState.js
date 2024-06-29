import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { settings } from '../../shared/common.js';

const makeData = function(data, subSchema){

  let rows = [];

  if(!data) return rows;

  if(!data[subSchema]) return rows;

  let idx =0;

  while(idx < data[subSchema].rows.length){
    let tp = data[subSchema].rows[idx];

    rows.push(tp);

    idx++;
  }

  let totalRows =0;
  let loginInfo = '';
  let errorMessage = '';
  if(data ){
   totalRows =  data[subSchema].totalRows;
   loginInfo =  data[subSchema].loginInfo;
   errorMessage = data[subSchema].error;
  }

  return {
    rows,
    totalRows,
    errorMessage,
    loginInfo
  };

}

export  function useTableState(ReturnData,defaultParams, subSchema) {

  const [filterParams, setFilterParams] = React.useState(defaultParams);
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  
  const filterFieldChanged = (filterObj) => {
    //console.log('called filterFieldChanged');

    setFilterParams(filterObj);

    refetch(
      {
        variables: filterObj
      }
    );

  };
 
  const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
    // errorPolicy: 'all' ,
     variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });



 // console.log('makeData :  ');

  var parsedData = makeData(data, subSchema);

  var mainFeaturedPost= {
    title: 'Loading..',
    text:
      "We'll get there eventually. Dont give up hope!",
      imageURL: settings.forumImgUrl,
      imageDescription: 'main image description',
      linkURL : settings.forumUrl,
      linkDescription: 'Continue reading…',
  };
  
  var featuredPosts =[
    {
      title: 'Featured post',
      dateLastEdit: 'Nov 12',
      text:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      imageURL: settings.forumImgUrl,
      
      imageDescription: 'Image Text',
    },
    {
      title: 'Post title',
      dateLastEdit: 'Nov 11',
      text:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      imageURL:settings.forumImgUrl,
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

  var totalRows = parsedData.totalRows;
  
  var loginInfo = parsedData.loginInfo;
  var errorMessage = parsedData.errorMessage;

  return {
    filterParams, 
    filterFieldChanged,

    loading, 
    error, 
    data,
    mainFeaturedPost,
    featuredPosts,
    posts,
    months,
    totalRows,
    loginInfo,
    errorMessage
  };
}

