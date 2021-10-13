import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


export  function useMapState(qry) {

 // console.log('useMapState ');
 
  const [getMapData, { loading,networkStatus, error,data }] = useLazyQuery(qry,{fetchPolicy: 'network-only'},);
 
  const filterFieldChanged = (filterObj) => {
    
   // console.log('filterFieldChanged');
   
    if(filterObj.origin == undefined || filterObj.origin == ''){
      filterObj.origin ='_21_Alan!Douglas';
    }

    getMapData({ variables: filterObj} );
 
   };

  return {  
    data,
    loading, 
    error ,
    filterFieldChanged
  };
}
