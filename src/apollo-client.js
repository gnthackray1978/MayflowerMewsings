import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";



const client = new ApolloClient({
  uri: "https://up3f4.sse.codesandbox.io/",
  cache: new InMemoryCache()
});


export default client;
