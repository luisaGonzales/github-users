import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserItem from '../Components/UserItem';
import RepoItem from '../Components/RepoItem';
import GET_USERS from '../Querys/getUsers';
import GET_REPOS from '../Querys/getRepos';

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








