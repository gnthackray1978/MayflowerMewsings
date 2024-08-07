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
     // console.log('errorformatter: loading');
      return [];
    }
  
    if(error && error.message){
      errorArray.push(error.message);
    }
  
    if(error && error.graphQLErrors && error.graphQLErrors.length >0){
//      errorArray.push('GraphQLErrors Error(s)'); 
      errorArray.push('Message: ' + error.graphQLErrors[0].message);
      if(error.graphQLErrors[0].path && error.graphQLErrors[0].path.length >0)
        errorArray.push('Path: '+error.graphQLErrors[0].path[0]);

      errorArray.push('Extensions message: ' + error.graphQLErrors[0].extensions?.message ?? 'no message');
      errorArray.push('Extensions stack trace: '+ error.graphQLErrors[0].extensions?.stackTrace ?? 'no stackTrace');
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


export const pobj = {

  params : ` 
      $limit: Int!,
      $offset : Int!,
      $sortColumn: String!,
      $sortOrder : String!,
      $treeName : String!
      $surname : String!,
      $yearStart : Int!,
      $yearEnd : Int!,
      $location : String!,
      $origin : String!,
      $minCM : Int!,
      $name : String!,
      $isPaternal : Boolean!,
      $isMaternal : Boolean!
      `
  ,
      
  pobj :`
      pobj : {
      limit : $limit,
      offset : $offset,
      sortColumn: $sortColumn,
      sortOrder : $sortOrder,
      treeName : $treeName,
      surname : $surname,
      yearStart : $yearStart,
      yearEnd : $yearEnd,
      location : $location,
      origin : $origin,
      minCM : $minCM,
      name : $name,
      isPaternal : $isPaternal,
      isMaternal : $isMaternal
      }
  `, 

  defaults  : {
      page: 0,
      limit : 25, 
      sortColumn : 'cm',
      sortOrder : 'desc',
      offset :0,
      origin :'', 
      treeName : '',
      yearStart : 1500,
      yearEnd : 2000,
      location : '',
      surname : '',
      minCM : 0,
      name : '',
      isPaternal : false,
      isMaternal : false, 
      parentage : ''
  }                

}
  

export const settings = { 
  
  IdServParams :{    
    msgnotificationhub: "http://localhost:5001/hub/msgnotificationhub",
    client_id :'40002111194-tidi50nrgmsk8vnqokjcvlni7g5lq6j5.apps.googleusercontent.com',
    identityEndpoint : 'http://msgapigen01.azurewebsites.net/api/identity',
    forumUrl : 'http://localhost:1234',
    forumImgUrl :  'http://localhost:1234/temp.jpg',
    apiBaseUrl : 'http://localhost:5001/',
    graphqlUrl : 'http://localhost:5001/graphql/',
    
  },
  GNTServParams :{     
    msgnotificationhub: "https://msgapiinput01.azurewebsites.net/hub/msgnotificationhub",
    client_id :'40002111194-tidi50nrgmsk8vnqokjcvlni7g5lq6j5.apps.googleusercontent.com',
    identityEndpoint : 'https://msgapigen01.azurewebsites.net/api/identity',
    forumUrl : 'https://www.gnthackray.co.uk:1234',
    forumImgUrl :  'https://www.gnthackray.co.uk/temp.jpg',
    apiBaseUrl : 'https://msgapigen01.azurewebsites.net/',
    graphqlUrl : 'https://msgapigen01.azurewebsites.net/graphql/',
    
  },

  apiBaseUrl : 'http://localhost:5001/',
  graphqlUrl : 'http://localhost:5001/graphql/',
};

//https://msgapigen01.azurewebsites.net/graphql/