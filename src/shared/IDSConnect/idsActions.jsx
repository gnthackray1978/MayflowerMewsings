
const queryString = require('query-string');
import { push } from 'react-router-redux';


export const setPath = () =>{
  return async (dispatch, getState)  => {
      dispatch(push("/"));
    }
};

export const login = () =>{
  return async (dispatch, getState)  => {

    dispatch({
      type: "IDS_ATTEMPT_CONNECT"
    });

    }
};
//
export const setIdsLoginScreenVisible = (isVisible) =>{
  return async (dispatch, getState)  => {

    dispatch({
      type: "SET_IDSLOGINLOADVISIBLE",
      payload : isVisible
    });

    }
};

export const logout = () =>{
  return async (dispatch, getState)  => {
       dispatch({
         type: "DISCONNECT",
       });
    }
};


export const loginRedirect = () =>{
  var query = queryString.parse(window.location.search);

  return async (dispatch, getState)  => {
       dispatch({
         type: "RELOAD",
         payload : query
       });
    }

};
