import React, { Component } from 'react';

import {
  Switch,
  Route,
    BrowserRouter as Router
} from "react-router-dom";

import Main from './Main.jsx';

import IDSRedirect from './shared/IDSConnect/Components/IDSRedirect.jsx';

class App extends Component {
  constructor(props) {
     super(props);
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

export default App;
