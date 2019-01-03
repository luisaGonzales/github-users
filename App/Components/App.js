import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import AppContainer from '../routes';
import token from '../../config';
import {InMemoryCache} from 'apollo-cache-inmemory'


export const client = new ApolloClient(
  {
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${token}`
    },
    cache: new InMemoryCache({
      dataIdFromObject: obj => obj.id,
      addTypename: false,
      fragmentMatcher: {
        match: ({ id }, typeCond, context) => !!context.store.get(id)
      }
    })
  }
  
);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
