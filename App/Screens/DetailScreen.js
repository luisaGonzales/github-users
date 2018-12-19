import React, {Component} from 'react';
import {Text, Container} from 'native-base';


class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('login'),
    };
  };
  render() {
    const { navigation } = this.props;
    const login = navigation.getParam('login', 'NO-ID');

    return (
      <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>{login}</Text>
      </Container>
    );
  }
}

export default DetailsScreen
