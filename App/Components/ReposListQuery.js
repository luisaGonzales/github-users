import React, { Component } from 'react';
import {  ActivityIndicator, FlatList } from 'react-native';
import { View, Container, Text} from 'native-base';
import GET_REPOS, { count }from '../Querys/getRepos';
import { graphql, compose } from "react-apollo";
import RepoItem from './RepoItem';

class RepoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: 0,
      data: [],
      cursor: ''
    }
  }

  componentWillReceiveProps(props) {
    console.log("this are props on list", props)
    
  }

  renderItem = ({ item: repository }) => (
    <RepoItem 
      name={repository.node.name} 
      description={repository.node.description} 
      pullRequests={repository.node.pullRequests.totalCount} 
    />
  )

  keyExtractor = (item, index) => index.toString();

  render(){
    return(
      <Container>
        {
          this.props.loading
          ?
          <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/>
          :
          <FlatList
            data={this.props.user.repositories.edges}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor} 
            onEndReachedThreshold={1}
            onEndReached={()=>{
              console.log("on reach end");
              
            }}
            ListEmptyComponent={<View />}
            ListFooterComponent={this.props.loading ? <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/> : <View />}
          />
        }
      </Container>
    )
  }
}

const RepoData = graphql(GET_REPOS, {
  options: props => ({
    variables: {
      login: props.login,
      cursor: null,
      count: count
    }
  }),
  props: ({ data: { loading, user, error } }) => ({
    loading, error, user
  }),
})

export default compose(RepoData)(RepoList)
