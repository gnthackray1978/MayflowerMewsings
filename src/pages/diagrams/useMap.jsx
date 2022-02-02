import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";


export  function useMapState(qry,defaultParams) {

 // console.log('useMapState ');
 // const [filterParams, setFilterParams] = React.useState(defaultParams);

  const  { loading, networkStatus,error, data, refetch } = useQuery(qry, {
    // errorPolicy: 'all' ,
     variables: defaultParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });

  return {  
    data,
    loading, 
    error ,
    refetch
  };
}
