import React, {Component} from 'react';
import {Text, Container, Item, Input} from 'native-base';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'GitHub Users',
  };
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <Container >        
        <Text>Github Users</Text>
        <Item rounded>
          <Input 
            placeholder='Search Github Users'
            onChangeText={(text) => {
              this.setState({text})
            }}
            />
        </Item>
      </Container>
    );
  }
}

export default HomeScreen
