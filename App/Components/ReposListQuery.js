import React from 'react';
import {  ActivityIndicator } from 'react-native';
import {Text, List, Right, ListItem, Body, Content, Container} from 'native-base';
import GET_REPOS from '../Querys/getRepos';
import { Query } from "react-apollo";
import styles from '../Styles/ListItemRepoStyle';
import RepoItem from './RepoItem';


const ReposList = ({login, navigation}) => (
  <Query
    query={GET_REPOS} variables={{login}}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <ActivityIndicator size="large" color="#333" style={{flex: 1, alignSelf: "center"}} />
      }
      if (error) {
        console.warn(error)
        return <Text>Error :(</Text>;
      }
      return (
        <Content>
         <List>
         {
          data.user.repositories.nodes.map((repo, index) => (
            <RepoItem name={repo.name} description={repo.description} pullRequests={repo.pullRequests.totalCount} key={index} />
          ))
          }
         </List>
        </Content>
      )
    }}
  </Query>
);

export default ReposList