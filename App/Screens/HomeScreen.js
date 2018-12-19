import React, {Component} from 'react';
import {Text, Container} from 'native-base';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'GitHub Users',
  };
  render() {
    return (
      <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </Container>
    );
  }
}

export default HomeScreen
