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
    if( !props.loading ) {
      let repos = props.user.repositories.edges.length;
      let cursor = props.user.repositories.edges[repos - 1].cursor;
      let data = this.state.data.concat(props.user.repositories.edges);

      this.setState({
        repos: repos,
        cursor: cursor,
        data: data
      })
    }
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
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor} 
            onEndReachedThreshold={1}
            onEndReached={()=>{
              if(this.state.repos == count) {
                this.props.fetchMore({
                  variables: {
                    login: this.props.login,
                    cursor: this.state.cursor,
                    count: count
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if( !fetchMoreResult ) return prev;
                    let data = [...this.state.data, ...fetchMoreResult.user.repositories.edges]
                    let cursor = data[data.length - 1].cursor;
                    this.setState({
                      data: data,
                      cursor: cursor
                    })
                    return Object.assign({}, prev, {
                      edges: [...prev.user.repositories.edges, ...fetchMoreResult.user.repositories.edges]
                    })
                  }
                })
              }
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
  props: ({ data: { loading, user, error, fetchMore } }) => ({
    loading, error, user, fetchMore
  }),
})

export default compose(RepoData)(RepoList)
