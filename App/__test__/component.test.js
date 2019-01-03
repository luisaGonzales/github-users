import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../Screens/HomeScreen';
import UserItem from '../Components/UserItem';

test('Basic Render User Item', () => {
  const loadingTree = renderer.create(
    <UserItem 
      login={ "No user login" } 
      avatar={null} 
      name={ "No name" } 
      location={ "No location" }
    />
  ).toJSON();
  expect(loadingTree).toMatchSnapshot();
});