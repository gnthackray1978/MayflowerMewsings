import {combineReducers, createStore, applyMiddleware,compose  } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";


import googleReducers from "./shared/GoogleConnect/googleReducers.js";
import googleMiddleware from "./shared/GoogleConnect/googleMiddleware.jsx";
import idsReducers from "./shared/IDSConnect/idsReducers.js";
import oidcMiddleware from "./shared/IDSConnect/oidcMiddleware.jsx";



import { createBrowserHistory } from 'history';

import { syncHistoryWithStore, routerReducer,routerMiddleware, push  } from 'react-router-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  google : googleReducers,
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

//const c =  composeEnhancers(
//    applyMiddleware(thunk,oidcMW,routerMW,googleMW)
//  );

//const store = configureStore({
  // reducer: rootReducer,
  // enhancers : [thunk,oidcMW,routerMW,googleMW]
//});

export default store;
