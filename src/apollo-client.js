import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getToken} from './shared/GoogleIDS/libs/googleFuncs.jsx';
import { settings } from './shared/common.js';

const httpLink = createHttpLink({
  uri: settings.graphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them

  var token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

export default client;
