import React, { Component } from 'react'
import { connect } from "react-redux";
import { loginRedirect, setPath} from "../idsActions.jsx";

const queryString = require('query-string');


class IDSRedirect extends Component {
  constructor(props) {
     super(props);
   }

   componentDidMount() {
     console.log('IDSRedirect loginRedirect');

     const {loginRedirect} = this.props;

     var query = queryString.parse(window.location.search);
     
     loginRedirect(query);
   }

   render() { return (<div>redirect</div> ); }

}


const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {

  return {
    loginRedirect : query =>{
      dispatch(loginRedirect(query))
    },
    setPath : () =>{
      dispatch(setPath())
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IDSRedirect);
