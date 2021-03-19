import AddIcon from '@material-ui/icons/Add';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ControlIcon from '@material-ui/icons/OpenWith';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/FeedBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import NavigationIcon from '@material-ui/icons/Navigation';
import PersonIcon from '@material-ui/icons/Person';

import React, { Component , useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import {PropTypes,func} from 'prop-types';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { connect , shallowEqual, useSelector } from "react-redux";
import Default from './Default.jsx';
import Diagrams from './Diagrams.jsx';
import FTMDupes from './FTMDupes.jsx';
import FTMPersons from './FTMPersons.jsx';
import FTMTrees from './FTMTrees.jsx';
import Maps from './Maps.jsx';
import PTombstones from './PTombstones.jsx';
import PWills from './PWills.jsx';
import TBirths from './TBirths.jsx';
import TMarriages from './TMarriages.jsx';
import TSources from './TSources.jsx';
import WLincolnshire from './WLincolnshire.jsx';
import WNorfolk from './WNorfolk.jsx';
import Ancestrymatches from './Ancestrymatches.jsx';

import {
  Switch,
  Route,
    BrowserRouter as Router
} from "react-router-dom";



// appName :1,
// appList : [
//     {
//       id: 1,
//       name: 'Front Page',
//       defaultPageName : '',
//       __typename: 'SiteType'
//     }],
//
// funcName :1,
// funcList : [
//     {
//       id: 1,
//       name: 'Front Page',
//       pageName: '',
//       __typename: 'Function'
//     }],

function getPageName(appName, funcName, appList , funcList){

   console.log('get page name');
   let idx =0;
   let pageName = '';

   let appListPageName ='';
   let funcListName ='';

   while(idx < appList.length){
     if(appList[idx].id == appName){
       appListPageName = appList[idx].defaultPageName;

     }
     idx++;
   }

   //if we are the front page just return the default page
   if(appName == 1 || funcList.length == 0)
    return appListPageName;



   idx=0;

   while(idx < funcList.length){
     if(funcList[idx].id == funcName){
       funcListName = funcList[idx].pageName;
     }
     idx++;
   }



   return funcListName;
}

function PageContainer(props) {


    var tp = (state)=>{
      return {
        appName: state.ux.appName,
        funcName: state.ux.funcName,
        appList: state.ux.appList,
        funcList: state.ux.funcList
      }
    };

    const { appName, funcName, appList , funcList} = useSelector(tp,shallowEqual);

    var page = getPageName(appName, funcName, appList , funcList);

    if(page == 'default')
      return (<Default></Default>);
    if(page == 'diagrams')
      return (<Diagrams></Diagrams>);
    if(page == 'ftmdupes')
      return (<FTMDupes></FTMDupes>);
    if(page == 'ftmpersons')
      return (<FTMPersons></FTMPersons>);
    if(page == 'ftmtrees')
      return (<FTMTrees></FTMTrees>);
    if(page == 'ancestrymatches')
      return (<Ancestrymatches></Ancestrymatches>);
    if(page == 'maps')
      return (<Maps></Maps>);
    if(page == 'ptombstones')
      return (<PTombstones></PTombstones>);
    if(page == 'pwills')
      return (<PWills></PWills>);
    if(page == 'tbirths')
      return (<TBirths></TBirths>);
    if(page == 'tmarriages')
      return (<TMarriages></TMarriages>);
    if(page == 'tsources')
      return (<TSources></TSources>);
    if(page == 'wlincolnshire')
      return (<WLincolnshire></WLincolnshire>);
    if(page == 'wnorfolk')
      return (<WNorfolk></WNorfolk>);



    return (
      <Switch>
          <Route exact path="/ftmpersons" component= {()=><FTMPersons/>}/>

        </Switch>
      );


}


export default PageContainer;
