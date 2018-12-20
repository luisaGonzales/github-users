import React, {Component} from 'react';
import {  ActivityIndicator } from 'react-native';
import {Text, List, Left, ListItem, Thumbnail, Body, Content, View, Container} from 'native-base';
import GET_USERS from '../Querys/getUsers';
import { Query, graphql, compose } from "react-apollo";
import UserItem from './UserItem';
import { FlatList } from 'react-native-gesture-handler';

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  renderItem = ({ item: user }) => (
    <UserItem 
      login={user.node.login} 
      avatar={user.node.avatarUrl} 
      name={user.node.name} 
      location={user.node.location}
      navigation={this.props.navigation}
      />
  )

  render() {
    return(
      <Container>
        {
          this.props.loading 
          ?
            <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/>
          :
            <FlatList 
              data={this.props.search.edges}
              renderItem={this.renderItem}
              keyExtractor={user => user.node.login} 
              onEndReachedThreshold={1}
              ListEmptyComponent={<View />
              }
            />
        }
      </Container>
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