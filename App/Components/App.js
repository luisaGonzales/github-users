import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import {Text, Container} from 'native-base';

import {createStackNavigator} from 'react-navigation';

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


class HomeScreen extends React.Component {
  render() {
    return (
      <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
});



export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}