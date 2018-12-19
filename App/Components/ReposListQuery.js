import React from 'react';
import {Text, List, Left, Right, ListItem, Thumbnail, Body, Content} from 'native-base';
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
      console.log(data.user.repositories.nodes.length)
      return (
        <Content>
         <List>
         {
          data.user.repositories.nodes.map((repo, index) => (
              <ListItem avatar
                  key={index}
                >
                  <Body>
                    <Text>
                      {repo.name}
                    </Text>
                    <Text note>{repo.description}</Text>
                  </Body>
                  <Right>
                    <Text>PR Count: {repo.pullRequests.totalCount}</Text>
                  </Right>
              </ListItem>
              ))
            }
         </List>
        </Content>
      )
    }}
  </Query>
);

export default ReposList