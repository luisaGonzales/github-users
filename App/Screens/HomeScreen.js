import React, {Component} from 'react';
import {Text, Container, View, Item, Input, Icon} from 'native-base';
import UsersList from '../Components/UsersListQuery'; 

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'GitHub Users',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <Container>        
        <View style={{backgroundColor: "#f9f9f9", paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#ececec" }}>
          <Text style={{color: "#000", fontSize: 35, fontWeight: "900", marginBottom: 5}}>Github Users</Text>
          <Item 
            rounded
            style={{borderRadius: 12, padding: 0, height: 40, backgroundColor: "#ebebeb", borderColor: "transparent"}}
            >
            <Icon active name='search' style={{fontSize: 20, paddingRight:0, color: "#949494" }} />
            <Input 
              placeholder='Search Github Users'
              placeholderTextColor="#949494"
              onChangeText={(text) => {
                this.setState({text})
              }}
              style={{padding: 0, placeholderTextColor: "red"}}
              />
          </Item>
        </View>
        <UsersList user={this.state.text} navigation={this.props.navigation}/>
      </Container>
    );
  }
}

export default HomeScreen
