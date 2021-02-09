import {combineReducers, createStore, applyMiddleware,compose  } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";


import googleReducers from "./shared/GoogleConnect/googleReducers.js";
import googleMiddleware from "./shared/GoogleConnect/googleMiddleware.jsx";
import idsReducers from "./shared/IDSConnect/idsReducers.js";
import uxReducers from "./features/uxReducers.jsx";
import oidcMiddleware from "./shared/IDSConnect/oidcMiddleware.jsx";

import { createBrowserHistory } from 'history';

import { syncHistoryWithStore, routerReducer,routerMiddleware, push  } from 'react-router-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ux : uxReducers,
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
    applyMiddleware(oidcMW,routerMW,googleMW,thunk)
   )
);


export default store;
