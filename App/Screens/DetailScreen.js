import React, {Component} from 'react';
import {Text, Container} from 'native-base';


class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
    };
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('id', 'NO-ID');
    return (
      <Container style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>{itemId}</Text>
      </Container>
    );
  }
}

export default DetailsScreen
