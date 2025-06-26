import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getToken} from './shared/GoogleIDS/libs/googleFuncs.jsx';
import { RetryLink } from '@apollo/client/link/retry';

import { settings } from './shared/common.js';

const { GNTServParams, IdServParams } = settings;

const graphqlUrl = window.location.origin.includes('gnthackray') ? GNTServParams.graphqlUrl : IdServParams.graphqlUrl;

export const httpLink = createHttpLink({ uri: graphqlUrl });


export const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
 
  //console.log('authLink called');
  var token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const retryLink = new RetryLink({
  attempts: {
    max: 3, // Maximum number of retry attempts
    retryIf: (error, _operation) => !!error, // Retry on any error
  },
  delay: {
    initial: 100, // Initial delay in milliseconds
    max: 3000, // Maximum delay in milliseconds
    jitter: true // Randomize delays to avoid thundering herd
  }
});

export const client = new ApolloClient({
  link: from([retryLink, authLink,httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
    Will: {
      fields: {
        search: {

            keyArgs: false,
            merge(existing =[], incoming) {
              return incoming;
            }

       }
      }
    },
    Dna: {
      fields: {
        treerecsearch: {
            keyArgs: false,
            merge(existing =[], incoming) {
              return incoming;
            }
        },
        dupesearch: {
           keyArgs: false,
           merge(existing =[], incoming) {
             return incoming;
           }
        },

        ftmviewsearch: {
           keyArgs: false,
           merge(existing =[], incoming) {
             return incoming;
           }
        },

        ftmlocsearch: {
          keyArgs: false,
          merge(existing =[], incoming) {
            return incoming;
          }
       },

        poisearch: {
           keyArgs: false,
           merge(existing =[], incoming) {
             return incoming;
           }
        },
      }
    },
    Diagram: {
      fields: {
        ancestorsearch: {
            keyArgs: false,
            merge(existing =[], incoming) {
              return incoming;
            }
        },    
        descendantsearch: {
          keyArgs: false,
          merge(existing =[], incoming) {
            return incoming;
          }
      },          
      }
    }

   }
  })
});

//export client;
