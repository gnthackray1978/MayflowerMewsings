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
    BrowserRouter as Router,

} from "react-router-dom";


function PageContainer(props) {


    // var tp = (state)=>{
    //   return {
    //     funcList: state.ux.funcList
    //   }
    // };
    //
    // const { funcList} = useSelector(tp,shallowEqual);

  //  var page = getPageName(location.pathname, funcList);


    return (
      <Switch>
          <Route exact path="/ftmpersons" render = {()=><FTMPersons/>}/>
          <Route exact path="/ancestrymatches" component= {()=><Ancestrymatches/>}/>
          <Route exact path="/ftmtrees" component= {()=><FTMTrees/>}/>
          <Route exact path="/ftmdupes" component= {()=><FTMDupes/>}/>

          <Route exact path="/diagrams" component= {()=><Diagrams/>}/>

          <Route exact path="/wnorfolk" component= {()=><WNorfolk/>}/>
          <Route exact path="/wlincolnshire" component= {()=><WLincolnshire/>}/>

          <Route exact path="/tsources" component= {()=><TSources/>}/>
          <Route exact path="/tmarriages" component= {()=><TMarriages/>}/>
          <Route exact path="/tbirths" component= {()=><TBirths/>}/>

          <Route exact path="/pwills" component= {()=><PWills/>}/>
          <Route exact path="/ptombstones" component= {()=><PTombstones/>}/>

          <Route exact path="/maps" component= {()=><Maps/>}/>

          <Route path="/" component= {()=><Default/>}/>

        </Switch>
      );


}


export default PageContainer;
