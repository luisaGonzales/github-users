import React, { Component } from 'react';
import styles from '../Styles/ListItemStyles';
import {Text, List, Left, ListItem, Thumbnail, Body, Content, View} from 'native-base';

class UserItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem avatar
          onPress={() => this.props.navigation.navigate('Details', {
            login: this.props.login
          })}
          style={styles.listItemContainer}
        >
          <Left>
            {
              this.props.avatar ?
              <Thumbnail source={{ uri: this.props.avatar }} />
              :
              <Thumbnail source={require('../Images/github-icon.png')} />
            }
          </Left>
          <Body style={styles.listItemBody}>
            <Text>
              {this.props.name}, {this.props.location}
            </Text>
            <Text note>{this.props.login}</Text>
          </Body>
      </ListItem>
    )
  }
}

export default UserItem;