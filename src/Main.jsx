import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './features/SideDrawer/SideDrawer.jsx';
import TopButtons from './features/ButtonBar/TopButtons.jsx';
import {AuthProvider} from './shared/IDSConnect/AuthProvider.jsx'
import SiteDialog from './features/SiteDialog/SiteDialog.jsx';
import PageContainer from './pages/PageContainer.jsx';
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {metaDataLoaded} from "./features/uxActions.jsx";
import {formatDate, getCurrentTime,userExpired,makeLoginDetailAction,RS,validateUser} from './shared/oidcFuncLib.jsx';


import {
  BrowserRouter as Router,
} from "react-router-dom";

const styles = () => ({

});


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

 //  console.log('get page name ');

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



function Main(props) {

    const {metaDataLoaded,config} = props;
   
    var state = useTableState(GET_Meta);

    var userManager = new UserManager(config);

    userManager.events.addUserLoaded((user)=>{
      console.log('user loaded:'+user);
    });

    userManager.getUser().then((user)=>{
      if(user){

        
        let tp = userExpired(user);


        console.log('user: ' + user + 
        ' count: ' + state.stateObj.sites.length 
        +' loading '+ state.loading 
        + ' net stat '+ state.networkStatus 
        + ' error '+state.error
        + ' exp ' + tp);
       


        if(state.stateObj.sites.length < 2 && !state.loading && !tp)
        {
          state.refetch();
          console.log('refreshing');
        } 

      }
    });

    return (
      <AuthProvider>

          <div>
            <TopButtons isData = {true} />

            <SideDrawer stateObj = {state.stateObj}/>

            <SiteDialog stateObj = {state.stateObj}/>

            <PageContainer/>
          </div>

      </AuthProvider>
    );

}

const mapStateToProps = state => {

  return {
    profileObj : state.ids.profileObj,
    config : state.ids.IdServParams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    metaDataLoaded: (data) => dispatch(metaDataLoaded(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
