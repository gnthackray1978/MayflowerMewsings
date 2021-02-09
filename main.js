import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./src/apollo-client.js";
import store from "./src/store.js";


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,document.getElementById('root'));
