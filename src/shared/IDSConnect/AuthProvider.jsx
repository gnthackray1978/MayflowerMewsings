import React from 'react'
import { connect } from "react-redux";

const AuthContext = React.createContext()


function _AuthProvider({children}, {Connected}) {
  //const [state, dispatch] = React.useReducer(countReducer, {count: 0})
 //const {Connected} = this.props;
  return (
    <AuthContext.Provider value={Connected}>
        {children}
    </AuthContext.Provider>
  )
}

function useAuthProvider() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
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
