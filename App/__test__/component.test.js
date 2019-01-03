import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserItem from '../Components/UserItem';
import RepoItem from '../Components/RepoItem';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '../../node_modules/react-apollo/test-utils';
import token from '../../config';
import ApolloClient from "apollo-boost";
import {InMemoryCache} from 'apollo-cache-inmemory'

import UserList from '../Components/UsersListQuery';
import RepoList from '../Components/ReposListQuery';
import GET_USERS from '../Querys/getUsers';
import GET_REPOS from '../Querys/getRepos';
import 'isomorphic-fetch';

//Testing render items
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

//Testing data querys
test('Get users query without errors', () => {
 expect(GET_USERS).toMatchSnapshot();
});

test('Get repos query without errors', () => {
  expect(GET_REPOS).toMatchSnapshot();
});

//Testing item properties
test('Check properties ', () => {
  expect(UserItem).toHaveProperty("name");
});



const client = new ApolloClient(
  {
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${token}`
    },
    cache: new InMemoryCache({
      dataIdFromObject: obj => obj.id,
      addTypename: false,
      fragmentMatcher: {
        match: ({ id }, typeCond, context) => !!context.store.get(id)
      }
    })
  }
  
);

test('User list query', () => {
  const userList = renderer.create(
    <ApolloProvider client={ client } >  
      <UserList user={"Luisa"}/>
    </ ApolloProvider>
  ).toJSON();

  expect(userList).toMatchSnapshot()
})

test('Repo list query', () => {
  const userList = renderer.create(
    <ApolloProvider client={ client } >  
      <RepoList login={"luisaGonzales"}/>
    </ ApolloProvider>
  ).toJSON();

  expect(userList).toMatchSnapshot()
})








