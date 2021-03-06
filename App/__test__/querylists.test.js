import React from 'react';
import { ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';
import UserList from '../Components/UsersListQuery';
import RepoList from '../Components/ReposListQuery';
import 'isomorphic-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import token from '../../config';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '../../node_modules/react-apollo/test-utils';
import wait from "waait";

import GET_USERS from '../Querys/getUsers';
import GET_REPOS from '../Querys/getRepos';


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

//Test with mocks
//Render without errors
test("render without error user list", async () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <UserList />
    </MockedProvider>
  );
});

test("render without error repo list", async () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <RepoList />
    </MockedProvider>
  );
});

//Mocks

const userMocks = [
  {
    request: {
      query: GET_USERS,
      variables: {
        user: 'Luisa',
        counter: 1
      },
    },
    result: {
      "data": {
        "search": {
          "edges": [
            {
              "cursor": "Y3Vyc29yOjE=",
              "node": {
                "name": "Luis Antonio González Martí",
                "location": "Madrid, Spain",
                "login": "Luisangonzalez",
                "avatarUrl": "https://avatars3.githubusercontent.com/u/1648046?v=4"
              }
            }
          ]
        }
      }
    },
  },
];

const repoMocks = [
  {
    request: {
      query: GET_REPOS,
      variables: {
        login: 'luisaGonzales',
        counter: 1
      },
    },
    result: {
      "data": {
        "user": {
          "repositories": {
            "edges": [
              {
                "cursor": "Y3Vyc29yOnYyOpHOBa7Cug==",
                "node": {
                  "name": "Ejercicios-Objetos",
                  "description": "Solución de los tres ejercicios del tema de objetos",
                  "pullRequests": {
                    "totalCount": 0
                  }
                }
              }
            ]
          }
        }
      }
    },
  },
];

test('UserList query without error', () => {
  const userListMock = renderer.create(
    <MockedProvider mocks={userMocks} addTypename={false}>
      <UserList />
    </MockedProvider>,
  ).toJSON();
  expect(userListMock).toMatchSnapshot();
});

test('RepoList query without error', () => {
  const repoListMock = renderer.create(
    <MockedProvider mocks={repoMocks} addTypename={false}>
      <RepoList />
    </MockedProvider>,
  );
  expect(repoListMock).toMatchSnapshot();
});


