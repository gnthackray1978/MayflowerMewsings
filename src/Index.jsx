import React, { Component , useEffect} from 'react';
import { connect } from "react-redux";
import SideDrawer from './features/SideDrawer/SideDrawer.jsx';
import TopButtons from './features/ButtonBar/TopButtons.jsx';
import {AuthProvider} from './shared/GoogleIDS/AuthProvider.jsx'
import SiteDialog from './features/SiteDialog/SiteDialog.jsx';
import TreeSelectionDrawer from './features/SideDrawer/TreeSelectionDrawer.jsx';

import PageContainer from './pages/PageContainer.jsx';
import {gql, useQuery } from '@apollo/client';
import {metaDataLoaded,applicationSelected} from "./features/uxActions.jsx";

const GET_Meta = gql`


query Site($query : String!) {
  function
  {
    search(appid: 0) {
      page
      results {
        id
        name
        pageName
        pageTitle
        applicationId
      }
    }
  }
  site {
    search(query: $query) {
      page
      results {
        id,
        name,
        defaultPageName,
        defaultPageTitle
      }
    }
  }
}

`;

function getPageName(pagePath, funcList){

   //console.log('get page name ');

   var path = pagePath.replace('/','');

   let idx =0;

   let appId =1;
   let pageId =0;

   while(idx < funcList.length){
     if(funcList[idx].pageName == path){
       appId = funcList[idx].applicationId;
       pageId = funcList[idx].id;
     }
     idx++;
   }



   return {
     pageId,
     appId
   };
}


function useTableState(qry, tokenExpiresAt) {

 // console.log('useTableState');

  const makeData = function(data){

    if(data && data.site.search.results.length>0){
      var selection = getPageName(location.pathname, data.function.search.results);

      let stateObj = {
        sites: data.site.search.results,
        funcs :data.function.search.results,
        pageId : selection.pageId,
        appId : selection.appId
      };

      return stateObj;
    }
    else{
      

      return {
        appId :1,
        sites : [
            {
              id: 1,
              name: 'Front Page',
              defaultPageName : 'default',
              defaultPageTitle :'Default',
              __typename: 'SiteType'
            }],
  
            pageId :0,
            funcs : []
      };
    }
  }

  var filterParams = {
    query: tokenExpiresAt
  };

  const  { loading, networkStatus,error, data, refetch } = useQuery(qry, {
    variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"no-cache"  
  });

  var stateObj = makeData(data);

  return {
    stateObj,
    refetch ,
    loading, networkStatus,error


  };
}



function Index(props) {

    const {metaDataLoaded,applicationSelected,tokenExpiresAt} = props;
    
    console.log('Index: ' + tokenExpiresAt);
 
    let state = useTableState(GET_Meta,tokenExpiresAt);    

    useEffect(() => { 
        if(state.stateObj)          
          applicationSelected(state.stateObj.appId);      
    });


    let metaSubset ={
      loading : state.loading,
      fnRefetch : state.refetch,
      siteCount : state.stateObj.sites.length,
      sites : state.stateObj.funcs
    }
 

    return (
          <div>
            <TopButtons isData = {true} metaSubset = {metaSubset}/>

            <SideDrawer stateObj = {state.stateObj}/>
            
            <TreeSelectionDrawer stateObj = {state.stateObj}/>

            <SiteDialog stateObj = {state.stateObj}/>

            <PageContainer stateObj = {state.stateObj}/>
          </div>

    );
 



}

const mapStateToProps = state => {

  return {
    tokenExpiresAt : state.ids.tokenExpiresAt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationSelected: (selectedApp) => dispatch(applicationSelected(selectedApp)),
    metaDataLoaded: (data) => dispatch(metaDataLoaded(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);
