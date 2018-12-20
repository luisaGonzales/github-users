import React, {Component} from 'react';
import {Text, Container} from 'native-base';
import ReposList from './../Components/ReposListQuery';
import RepoData from './../Components/ReposListQuery';

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('login'),
    };
  };
  render() {
    const { navigation } = this.props;
    const login = navigation.getParam('login');

    return (
      <Container>
        <RepoData login={login} />
      </Container>
    );
  }
}

export default DetailsScreen
