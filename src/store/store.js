import {combineReducers, createStore, applyMiddleware,compose  } from "redux";
import thunk from "redux-thunk";
import applicationStateReducers from "./reducers/applicationStateReducers.js";

import googleReducers from "./reducers/googleReducers.js";
import idsReducers from "./reducers/idsReducers.js";

import uxReducers from "./reducers/uxReducers.js";
import oidcMiddleware from "./middleware/oidcMiddleware.jsx";
import googleMiddleware from "./middleware/googleMiddleware.jsx";

import { createBrowserHistory } from 'history';

import { syncHistoryWithStore, routerReducer,routerMiddleware, push  } from 'react-router-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  applicationState : applicationStateReducers, // key name same as the carefully renamed default export
  google : googleReducers,
  uxState: uxReducers,
  ids : idsReducers,
  routing: routerReducer
});

const oidcMW = oidcMiddleware('argh');

const googleMW = googleMiddleware('');

const routerMW = routerMiddleware(createBrowserHistory());

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
     applyMiddleware(thunk,oidcMW,routerMW,googleMW)
   )
);




const unsubscribe = store.subscribe((arg) => {

const roughSizeOfObject = function( object ) {

      var objectList = [];
      var stack = [ object ];
      var bytes = 0;

      while ( stack.length ) {
          var value = stack.pop();

          if ( typeof value === 'boolean' ) {
              bytes += 4;
          }
          else if ( typeof value === 'string' ) {
              bytes += value.length * 2;
          }
          else if ( typeof value === 'number' ) {
              bytes += 8;
          }
          else if
          (
              typeof value === 'object'
              && objectList.indexOf( value ) === -1
          )
          {
              objectList.push( value );

              for( var i in value ) {
                  stack.push( value[ i ] );
              }
          }
      }
      return bytes;
  }

//  console.log("store size: " + roughSizeOfObject(store.getState()));
});

export default store;
