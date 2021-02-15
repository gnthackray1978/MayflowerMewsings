import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: "https://msgapigen01.azurewebsites.net/graphql/",
});

const authLink = setContext((_, { headers }) => {

var token ;

try {
  //console.log('getting token');

  var key = Object.keys(sessionStorage)[0];

  var sessionValue = JSON.parse(sessionStorage[key]);

  // get the authentication token from local storage if it exists
  // 'abcdedf';//localStorage.getItem('token');

  token = sessionValue.access_token;



  console.log(token ? `{ "authorization": "Bearer ${token}" }` : "");



} catch (e) {
  //console.log('couldnt get token from storage: ' + e);
} finally {

}


  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
