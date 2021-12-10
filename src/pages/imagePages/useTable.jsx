import React  from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';


export function useTableState() {
   
  // console.log('useTableState');
  const GET_IMAGES = gql`
  
  query Image($page : String!){
    image
    {
      imagesearch(page : $page) {
        page
         error
        loginInfo
        results {
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
         
        results {
          id
          title
          to
          from
          info
          page
        }
      }
      
    }
     
    
  }
  `;
   
  
 
   const makeData = function(data){
 
     if(data && data.image.imagesearch.results.length>0){
    
       let stateObj = {
          imagesearch: data.image.imagesearch.results,
          imageparentsearch :data.image.imageparentsearch.results
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
 
   var stateObj = makeData(data);
 
   let parents = [];
   

   if(stateObj.imageparentsearch && stateObj.imagesearch){
     parents = stateObj.imageparentsearch;
     let tpimages = stateObj.imagesearch;

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