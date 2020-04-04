
const queryString = require('query-string');
import { push } from 'react-router-redux';


export const setUserInfo = () =>{
  return async (dispatch, getState)  => {

    const ids = getState().ids;

    if(!ids.loggedIn){
       dispatch({
         type: "LOAD_USER",
         infoloaded :false
       });
    }


  }
};

export const login = () =>{
  return async (dispatch, getState)  => {
    const ids = getState().ids;

    if(!ids.loggedIn && !ids.inautoconnect){
       dispatch({
         type: "IDS_ATTEMPT_CONNECT",
         connecting :true
       });
    }


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
    const ids = getState().ids;


     if(query.code){
       dispatch({
         type: "CONNECT_REDIRECT",
         connecting :false
       });
     }
     else{
       if(query.state){
         dispatch({
                   type: "SET_USER_LOGOUT"
                 });
         dispatch(push("/"));
       }else{

         console.log('loginRedirect Nothing in query string assumed page has been reloaded somehow');
         dispatch({
           type: "LOAD_USER",
         });
       }


     }

    }
};
