import React from 'react'
import { connect } from "react-redux";

const AuthContext = React.createContext()


function _AuthProvider(props) {

  const {Connected} = props;

  return (
    <AuthContext.Provider value={Connected}>
        {props.children}
    </AuthContext.Provider>
  )
}

function useAuthProvider() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context;
}


const mapStateToProps = state => {
  return {
    Connected : state.ids.connected
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(CountProvider);

var AuthProvider =  connect(mapStateToProps, mapDispatchToProps)(_AuthProvider);

export {useAuthProvider, AuthProvider}
