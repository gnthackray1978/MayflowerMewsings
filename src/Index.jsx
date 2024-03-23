import React, { Component , useEffect} from 'react';
import { connect } from "react-redux";
import SideDrawer from './features/SideDrawer/SideDrawer.jsx';
import TopButtons from './features/ButtonBar/TopButtons.jsx';
import {AuthProvider} from './shared/GoogleIDS/AuthProvider.jsx'
import SiteDialog from './features/SiteDialog/SiteDialog.jsx';
import TreeSelectionDrawer from './features/SideDrawer/TreeSelectionDrawer.jsx';
import { errorFormatter } from '../src/shared/common';
import PageContainer from './pages/PageContainer.jsx';
import {gql, useQuery } from '@apollo/client';
import {metaDataLoaded,applicationSelected,setTree} from "./features/uxActions.jsx";
import {getParams} from './features/Table/qryStringFuncs';
import ControlPanelDrawer from './features/SideDrawer/ControlPanelDrawer.jsx';
 

const GETQL_Meta = gql`
query Query($appId:Int!) { 
  searchSiteFunction(appId: $appId) {
    page
    rows {
      id
      name
      pageName
      pageTitle
      applicationId
    }
    error
  }   
  searchSite(appId: 0) {
    page
    rows {
      id,
      name,
      defaultPageName,
      defaultPageTitle
    }
    error
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

  console.log('index');

  const makeData = function(data){

    if(data && data.searchSite.rows.length>0){
      var selection = getPageName(location.pathname, data.searchSiteFunction.rows);

      let stateObj = {
        sites: data.searchSite.rows,
        funcs :data.searchSiteFunction.rows,
        error : data.searchSite.error + data.searchSiteFunction.error,
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
        funcs : [],
        error : 'no data found'
      };
    }
  }

  var filterParams = {
    appId : 0
  };

  const  { loading, networkStatus,error, data, refetch } = useQuery(qry, {
    variables: filterParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"no-cache"  
  });

  var stateObj = makeData(data);

  let errors = errorFormatter(loading,error, stateObj.error, networkStatus);
  
  if(errors.length>0){
    console.log(errors);
  }

  return {
    stateObj,
    refetch ,
    loading, networkStatus,error


  };
}



function Index(props) {

    const {metaDataLoaded,applicationSelected,tokenExpiresAt,setTree} = props;
    
    //console.log('Index: ' + tokenExpiresAt);
    
    

    let state = useTableState(GETQL_Meta,tokenExpiresAt);    

    useEffect(() => { 
        if(state.stateObj)          
          applicationSelected(state.stateObj.appId); 
          
          let params = getParams();
          if(params && params.origin && params.originDescription){
            setTree({origin : params.origin, originDescription: params.originDescription});
          }
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

            <ControlPanelDrawer stateObj = {state.stateObj}/>

            <SiteDialog stateObj = {state.stateObj}/>

            <PageContainer stateObj = {state.stateObj}/>
          </div>

    );
 



}

const mapStateToProps = state => {

  return {
    tokenExpiresAt : state.ids.tokenExpiresAt,
  //  selectedTreeData : state.ux.selectedTreeData

  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationSelected: (selectedApp) => dispatch(applicationSelected(selectedApp)),
    metaDataLoaded: (data) => dispatch(metaDataLoaded(data)),
    setTree: (data) => dispatch(setTree(data))

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);
