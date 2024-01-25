import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";

const errorMessages = (loading, error, internalServerError) => {
  console.log('called errorMessages');

  let errorArray =[];

  if(loading)
    return [];

  if(error && error.message){
    errorArray.push(error.message);
  }

  if(error && error.graphQLErrors && error.graphQLErrors.length >0){
    errorArray.push(...error.graphQLErrors);
  }

  if(internalServerError!='')
  {
    errorArray.push(internalServerError);
  }

  return errorArray;

};



export  function useMapState(qry,defaultParams) {

 // console.log('useMapState ');
 // const [filterParams, setFilterParams] = React.useState(defaultParams);
 
 console.log('useMapState' );

  const  { loading, networkStatus,error, data, refetch } = useQuery(qry, {
    // errorPolicy: 'all' ,
     variables: defaultParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });

 // var newRows = [];
  var totalRows = 0;  
  var loginInfo = '';
  var internalServerError = '';
  var subSchema;

  if(!loading && data && data[subSchema]) 
  {   
    totalRows = data[subSchema].totalRows;
    loginInfo =  data[subSchema].loginInfo;
    internalServerError = data[subSchema].error?.trim() ?? ''; //bit of a hack 
    subSchema = data[subSchema];
  }

  var errors = [];

  if(!loading)
    errors = errorMessages(loading,error, internalServerError);
 
  return {  
    data : subSchema,
    totalRows,
    loading, 
    errors ,
    refetch
  };
}
