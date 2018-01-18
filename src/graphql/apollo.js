import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DEV_BACKEND_URL } from "../dev";

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
//const client = new ApolloClient();

const API_URL = DEV_BACKEND_URL + '/graphql';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
});

export default apolloClient;
