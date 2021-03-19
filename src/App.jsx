import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

// import {
//   Router,
//   BrowserRouter,
//   Switch,
//   Route
// } from "react-router-dom";

import {
  Switch,
  Route,
    BrowserRouter as Router
} from "react-router-dom";


import Main from './Main.jsx';

import IDSRedirect from './shared/IDSConnect/Components/IDSRedirect.jsx';
import store from './store.js';


const styles = theme => ({

});

//const history = syncHistoryWithStore(createBrowserHistory(), store);

class App extends Component {
  constructor(props) {
     super(props);
   }

   componentDidMount() {

   }



   render() {

    let result;

    result = <Main/>

    let test = <IDSRedirect/>;

    return (
     <Router>
          <Main/>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
   };
};

const mapDispatchToProps = dispatch => {return {}; };



//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
