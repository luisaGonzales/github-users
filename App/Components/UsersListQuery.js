import React, {Component} from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { View, Container } from 'native-base';
import GET_USERS, { counter } from '../Querys/getUsers';
import { graphql, compose } from "react-apollo";
import UserItem from './UserItem';

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: '',
      users: 0,
      data: []
    }
  }

  componentWillReceiveProps(props) {
    if(!props.loading && props.search != undefined && this.props.user != '' && this.props.name == props.name ) {
      let users = props.search.edges.length;
      let cursor = props.search.edges[users - 1].cursor;
      let data = this.state.data.concat(props.search.edges)
      this.setState({
        users: users,
        cursor: cursor,
        data: data
      })
    }

    if(this.props.user != props.user ) {
      this.setState({
        data: [],
        cursor: null,
        users: 0
      })
    }
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
         <FlatList 
              data={ this.state.data }
              renderItem={this.renderItem}
              keyExtractor={user => user.node.login} 
              onEndReachedThreshold={1}
              onEndReached={()=>{
                if(this.state.users == counter) {
                  this.props.fetchMore({
                    variables: {
                      cursor: this.state.cursor, 
                      counter: counter,
                      user: this.props.user
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (!fetchMoreResult) return prev;
                      let data = [...this.state.data, ...fetchMoreResult.search.edges];
                      let cursor = data[data.length - 1].cursor; 
                      this.setState({
                        data: data,
                        cursor: cursor
                      })
                      return Object.assign({}, prev, {
                        edges: [...prev.search.edges, ...fetchMoreResult.search.edges]
                      })
                    }
                  })
                }
              }}
              ListEmptyComponent={<View />}
              ListFooterComponent={this.props.loading ? <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/> : <View />}
            />
      </Container>
    ) 
  }

}

const UserData = graphql(GET_USERS, {
  options: props => ({
    variables: {
      user: props.user,
      cursor: props.cursor,
      counter: counter
    }
  }),
  props: ({ data: { loading, search, error, fetchMore } }) => ({
    loading, error, search, fetchMore
  }),
})


export default compose(UserData)(UserList);