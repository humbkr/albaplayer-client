import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
//const client = new ApolloClient();

const API_URL = 'http://localhost:32768/graphql';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
});

export default apolloClient;
