import {combineReducers, createStore, applyMiddleware,compose  } from "redux";
import thunk from "redux-thunk";
import idsReducers from "./shared/GoogleIDS/redux/idsReducers.js"
import uxReducers from "./features/uxReducers.jsx";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ux : uxReducers,
  ids : idsReducers
});

const store = createStore(
 rootReducer,
 undefined,
  composeEnhancers(
    applyMiddleware(thunk)
   )
);


export default store;
