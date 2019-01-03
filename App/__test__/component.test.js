import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserItem from '../Components/UserItem';
import RepoItem from '../Components/RepoItem';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '../../node_modules/react-apollo/test-utils';

import UserList from '../Components/UsersListQuery';
import GET_USERS from '../Querys/getUsers';

test('Render user item with null data', () => {
  const userItemNull = renderer.create(
    <UserItem 
      login={ "No user login" } 
      avatar={ null } 
      name={ "No name" } 
      location={ "No location" }
    />
  ).toJSON();
  expect(userItemNull).toMatchSnapshot();
});

test('Render user item with data', () => {
  const userItem = renderer.create(
    <UserItem 
      login={ "luisaGonzales" } 
      avatar={ "https://avatars3.githubusercontent.com/u/29384758?v=4" } 
      name={ "Luisa Gonzales" } 
      location={ null }
    />
  ).toJSON();
  expect(userItem).toMatchSnapshot();
});

test('Render repo item', () => {
  const repoItem = renderer.create(
    <RepoItem 
      name={"IA-tictactoe"}
      description={"N en raya con algoritmo de MinMax"}
      pullRequests={0}
    />
  ).toJSON();
  expect(repoItem).toMatchSnapshot();
});




