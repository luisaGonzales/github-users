import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import AppContainer from '../routes';


//Set Apollo Client
const token = '<GITHUB_PERSONAL_ACCESS_TOKEN>';
const client = new ApolloClient(
  {
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${token}`
    }
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