import React from 'react';
import {Text, List, Left, ListItem, Thumbnail, Body, Content} from 'native-base';
import GET_REPOS from '../Querys/getRepos';
import { Query } from "react-apollo";

const ReposList = ({login, navigation}) => (
  <Query
    query={GET_REPOS} variables={{login}}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) {
        console.warn(error)
        return <Text>Error :(</Text>;
      }
      console.log(data)
      return (
        <Content>
          <Text>YEI</Text>
        </Content>
      )
    }}
  </Query>
);

export default ReposList