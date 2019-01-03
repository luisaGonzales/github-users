import React from 'react';
import renderer from 'react-test-renderer';
import UserList from '../Components/UsersListQuery';
import RepoList from '../Components/ReposListQuery';
import 'isomorphic-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import token from '../../config';
import { ApolloProvider } from 'react-apollo';

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

test('User list query', async () => {
  const userList = renderer.create(
    <ApolloProvider client={ client } >  
      <UserList user={"Luisa"}/>
    </ ApolloProvider>
  ).toJSON();

  expect(userList).toMatchSnapshot()
})

test('Repo list query', async () => {
  const userList = renderer.create(
    <ApolloProvider client={ client } >  
      <RepoList login={"luisaGonzales"}/>
    </ ApolloProvider>
  ).toJSON();

  expect(userList).toMatchSnapshot()
});