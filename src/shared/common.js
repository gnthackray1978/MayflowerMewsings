import React, { Component } from 'react';
import { NetworkStatus } from '@apollo/client';


export const errorFormatter = (loading, error, internalServerError, networkStatus) => {
    
    if (networkStatus === NetworkStatus.refetch) 
    {
      console.log('errorformatter: refetching');
      return [];     
    }

    
    
    let errorArray =[];
  
    if(loading)
    {
      console.log('errorformatter: loading');
      return [];
    }
  
    if(error && error.message){
      errorArray.push(error.message);
    }
  
    if(error && error.graphQLErrors && error.graphQLErrors.length >0){
      errorArray.push('GraphQLErrors Error(s)');
      errorArray.push(...error.graphQLErrors);
    }
  
    if(error && error.networkError 
      && error.networkError.result 
      && error.networkError.result.errors 
      && error.networkError.result.errors.length >0){
        errorArray.push('Network Error(s)');
        for(var e of error.networkError.result.errors) {
          errorArray.push(e.message);
        };
      //errorArray.push(...error.networkError.result.errors);
    }
  
    if(internalServerError!='')
    {
      errorArray.push('Internal Server Error(s)');
      errorArray.push(internalServerError);
    }
  
    return errorArray;
  
  };
  

export const displayErrors = (errors) => {
    console.log('displayErrors called');
  
    if(errors && errors.length >0){
      return (<div>
        <h5><span style={{color: "red", padding: "20px"} } >Errors</span></h5>
        <ul>  
        {
         errors.map((row, index) => {return(<li>{row}</li>);})        
        }
        </ul>  
      </div>);
    }
    else{
      return (<div></div>);
    }
  };
  
  export const displayLoadingScreen = () =>{
  
    return (
      <div>
        <h5><span style={{color: "blue", padding: "20px"} } >loading...</span></h5>
      </div>
    );
  }