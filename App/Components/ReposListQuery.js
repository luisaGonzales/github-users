import React, { Component } from 'react';
import {  ActivityIndicator, FlatList } from 'react-native';
import {Text, List, View, Content, Container} from 'native-base';
import GET_REPOS from '../Querys/getRepos';
import { Query, graphql, compose } from "react-apollo";
import RepoItem from './RepoItem';

class RepoList extends Component {
  constructor(props) {
    super(props)
  }

  renderItem = ({ item: repository }) => (
    <RepoItem 
      name={repository.name} 
      description={repository.description} 
      pullRequests={repository.pullRequests.totalCount} 
    />
  )

  keyExtractor = (item, index) => index.toString();

  render(){
    console.log(this.props)
    return(
      <Container>
        {
          this.props.loading
          ?
          <ActivityIndicator size="large" color="#333" style={{flex:1, alignSelf: "center"}}/>
          :
          <FlatList
            data={this.props.user.repositories.nodes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor} 
            onEndReachedThreshold={1}
            ListEmptyComponent={<View />}
          />
        }
      </Container>
    )
  }
}

const RepoData = graphql(GET_REPOS, {
  options: props => ({
    variables: {
      login: props.login
    }
  }),
  props: ({ data: { loading, user, error } }) => ({
    loading, error, user
  }),
})

export default compose(RepoData)(RepoList)
