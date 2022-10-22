import React from 'react'
import { connect } from "react-redux";

//console.log('context created');
const AuthContext = React.createContext()

function _AuthProvider(props) {

  const {tokenExpiresAt} = props;

  return (
    <AuthContext.Provider value={tokenExpiresAt}>
        {props.children}
    </AuthContext.Provider>
  )
}

function useAuthProvider() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthProvider must be used within a AuthProvider')
  }
  return context;
}


const mapStateToProps = state => {
  return {
    tokenExpiresAt : state.ids.tokenExpiresAt
  };
};

const mapDispatchToProps = dispatch => {
  return {
 //   setTokenExpiration: (time) => dispatch(setTokenExpiration(time)),
  };
};


var AuthProvider =  connect(mapStateToProps, mapDispatchToProps)(_AuthProvider);

export {useAuthProvider, AuthProvider}
