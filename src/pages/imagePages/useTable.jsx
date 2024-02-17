import React  from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { errorFormatter } from '../../shared/common';

export function useTableState() {
   
  // console.log('useTableState');
  const GET_IMAGES = gql`
  
  query Query($page : String!){
      imagesearch(page : $page) {
        page
        error
        loginInfo
        rows {
          id
          path
          title
          info
          parentImageId
        }
      }
      imageparentsearch(page : $page) {
        page
        error
         
        rows {
          id
          title
          to
          from
          info
          page
        }
      }
  }
  `;
   
  
 
   const makeData = function(data){
 

    
     if(data && data.image.imagesearch.rows.length>0){
    
       let stateObj = {
          imagesearch: data.image.imagesearch.rows,
          imageparentsearch :data.image.imageparentsearch.rows
       };
 
       return stateObj;
     }
     else{
       
 
       return {
       };
     }
   }

   var page = location.pathname.replace('/','');

   var filterParams = {
     page: page
   };

   const  { loading, networkStatus,error, data, refetch } = useQuery(GET_IMAGES, {
      variables: filterParams,
      notifyOnNetworkStatusChange: true,
      fetchPolicy:"no-cache"  
   });
 
   console.log('loading : ' + loading + ' network status: ' +  networkStatus + ' error:' + error + ' data: ' + data);

   //loading : false network status: 8 
   // error:Error: Response not successful: Received status code 400 data: undefined
  // var parsedData = makeData(data, subSchema);
 
 
   var rows = [];
   var totalRows = 0;  
   var loginInfo = '';
   var internalServerError = '';

   
   //var stateObj = makeData(data);
 
   let parents = [];
   

   if(!loading && data.imageparentsearch && data.imagesearch){
     parents = data.imageparentsearch.rows;
     let tpimages = data.imagesearch.rows;

     parents.forEach(f=>{
       f.children = tpimages.filter(is=>is.parentImageId == f.id);
     });
   }

   return {
     parents,
     refetch ,
     loading, networkStatus,error
 
 
   };
 }