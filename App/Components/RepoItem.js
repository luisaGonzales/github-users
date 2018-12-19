import React, {Component} from 'react';
import {Text, Right, ListItem, Body } from 'native-base';
import styles from '../Styles/ListItemRepoStyle';

class RepoItem extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <ListItem 
        avatar
        style={styles.listItemRepoContainer }>
        <Body style={styles.noneBorder}>
          <Text>
            {this.props.name}
          </Text>
          <Text style={styles.subtitle} note>{this.props.description}</Text>
        </Body>
        <Right style={styles.noneBorder}>
          <Text style={styles.subtitle}>PR Count: {this.props.pullRequests}</Text>
        </Right>
      </ListItem>
    )
  }
}

export default RepoItem;
