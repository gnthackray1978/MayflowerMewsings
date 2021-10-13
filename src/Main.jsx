import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './features/SideDrawer/SideDrawer.jsx';
import TopButtons from './features/ButtonBar/TopButtons.jsx';
import {AuthProvider} from './shared/IDSConnect/AuthProvider.jsx'
import SiteDialog from './features/SiteDialog/SiteDialog.jsx';
import PageContainer from './pages/PageContainer.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {metaDataLoaded} from "./features/uxActions.jsx";

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



function Main(props) {

    const {metaDataLoaded} = props;


    const { loading, error, data } = useQuery(GET_Meta, {
      fetchPolicy: "no-cache",
      onCompleted : (data)=>{

        //console.log('Got app meta data');

        var selection = getPageName(location.pathname, data.function.search.results);

        let stateObj = {
          sites: data.site.search.results,
          funcs :data.function.search.results,
          pageId : selection.pageId,
          appId : selection.appId
        };

        metaDataLoaded(stateObj);

      }
    });
    //
    // let sites;
    // let functions;
    //
    // if(!loading && data){
    //
    //     sites = data.site.search.results;
    //
    //     functions =data.function.search.results;
    // }


    return (
      <AuthProvider>

          <div>
            <TopButtons isData = {true} />

            <SideDrawer/>

            <SiteDialog/>

            <PageContainer/>
          </div>

      </AuthProvider>
    );

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    metaDataLoaded: (data) => dispatch(metaDataLoaded(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
