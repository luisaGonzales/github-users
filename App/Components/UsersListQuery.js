import React from 'react';
import {Text, List, Left, ListItem, Thumbnail, Body, Content} from 'native-base';
import GET_USERS from '../Querys/getUsers';
import { Query } from "react-apollo";
import styles from '../Styles/ListItemStyles';

const UsersList = ({user, navigation}) => (
  <Query
    query={GET_USERS} variables={{user}}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Text>Loading...</Text>;
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
                  <ListItem avatar
                    onPress={() => navigation.navigate('Details', {
                      login: user.node.login
                    })}
                    key={index}
                    style={styles.listItemContainer}
                  >
                    <Left>
                      <Thumbnail source={{ uri: user.node.avatarUrl }} />
                    </Left>
                    <Body style={styles.listItemBody}>
                      <Text>
                        {user.node.name}, {user.node.location}
                      </Text>
                      <Text note>{user.node.login}</Text>
                    </Body>
                </ListItem>
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