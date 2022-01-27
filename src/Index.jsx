import React, { Component , useEffect} from 'react';
import { connect } from "react-redux";
import SideDrawer from './features/SideDrawer/SideDrawer.jsx';
import TopButtons from './features/ButtonBar/TopButtons.jsx';
import {AuthProvider} from './shared/IDSConnect/AuthProvider.jsx'
import SiteDialog from './features/SiteDialog/SiteDialog.jsx';
import TreeSelectionDrawer from './features/SideDrawer/TreeSelectionDrawer.jsx';

import PageContainer from './pages/PageContainer.jsx';
import {gql, useQuery } from '@apollo/client';
import {metaDataLoaded,applicationSelected} from "./features/uxActions.jsx";

const GET_Meta = gql`


query {
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
    search(query: "Star Wars") {
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


function useTableState(qry) {

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

  const  { loading, networkStatus,error, data, refetch } = useQuery(qry, {

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

    const {metaDataLoaded,applicationSelected} = props;
 
    let state = useTableState(GET_Meta);    

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
      <AuthProvider>

          <div>
            <TopButtons isData = {true} metaSubset = {metaSubset}/>

            <SideDrawer stateObj = {state.stateObj}/>
            
            <TreeSelectionDrawer stateObj = {state.stateObj}/>

            <SiteDialog stateObj = {state.stateObj}/>

            <PageContainer stateObj = {state.stateObj}/>
          </div>

      </AuthProvider>
    );
 



}

const mapStateToProps = state => {

  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationSelected: (selectedApp) => dispatch(applicationSelected(selectedApp)),
    metaDataLoaded: (data) => dispatch(metaDataLoaded(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);