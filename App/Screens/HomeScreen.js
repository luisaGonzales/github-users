import React, {Component} from 'react';
import {Text, Container, View, Item, Input, Icon} from 'native-base';
import UsersList from '../Components/UsersListQuery'; 
import styles from '../Styles/HomeScreenStyles';
import UserData from '../Components/UsersListQuery';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'GitHub Users',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {text: undefined};
  }

  render() {
    return (
      <Container>        
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Github Users</Text>
          <Item 
            rounded
            style={styles.inputContainer}
            >
            <Icon active name='search' style={styles.inputIcon} />
            <Input 
              placeholder='Search Github Users'
              placeholderTextColor="#949494"
              onChangeText={(text) => {
                this.setState({text})
              }}
              />
          </Item>
        </View>
        {
          this.state.text != undefined && <UserData user={this.state.text} navigation={this.props.navigation}/>
        }
      </Container>
    );
  }
}

export default HomeScreen
