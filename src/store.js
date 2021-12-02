import {combineReducers, createStore, applyMiddleware,compose  } from "redux";

import thunk from "redux-thunk";


import googleReducers from "./shared/GoogleConnect/googleReducers.js";
import googleMiddleware from "./shared/GoogleConnect/googleMiddleware.jsx";
import idsReducers from "./shared/IDSConnect/idsReducers.js";
import uxReducers from "./features/uxReducers.jsx";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ux : uxReducers,
  google : googleReducers,
  ids : idsReducers
  //,
  //routing: routerReducer
});


const googleMW = googleMiddleware('');

//const routerMW = routerMiddleware(createBrowserHistory());

const store = createStore(
 rootReducer,
 undefined,
  composeEnhancers(
    applyMiddleware(googleMW,thunk)
   )
);


export default store;
