import React, {Component} from 'react';
import {  ActivityIndicator } from 'react-native';
import {Text, List, Left, ListItem, Thumbnail, Body, Content, View} from 'native-base';
import GET_USERS from '../Querys/getUsers';
import { Query, graphql, compose } from "react-apollo";
import UserItem from './UserItem';

const UsersList = ({user, navigation}) => (
  <Query
    query={GET_USERS} variables={{user}}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/>
      }
      if (error) {
        console.warn(error)
        return (
          Toast.show({
            text: 'Wrong password!',
            buttonText: 'Okay'
          })
        );
      }
      if (data.search.edges.length > 0) {
        
        return (
          <Content>
            <List>
              {
                data.search.edges.map((user, index) => (
                  <UserItem key={index} navigation={navigation} login={user.node.login} avatar={user.node.avatarUrl} name={user.node.name} location={user.node.location}/>
                ))
              }
            </List>
          </Content>
        )
      } else {
        return (
          <Text></Text>
        )
      }
    }}
  </Query>
);

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props){
    console.log(".----", props)
  }

  render(){
    return(
      <Text>Works props</Text>
    )
  }

}

const UserData = graphql(GET_USERS, {
  options: props => ({
    variables: {
      user: props.user
    }
  }),
  props: ({ data: { loading, search, error } }) => ({
    loading, error, search
  }),
})


export default compose(UserData)(UserList)