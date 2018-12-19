import React from 'react';
import {  ActivityIndicator } from 'react-native';
import {Text, List, Left, ListItem, Thumbnail, Body, Content, View} from 'native-base';
import GET_USERS from '../Querys/getUsers';
import { Query } from "react-apollo";
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

export default UsersList