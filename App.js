import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Header, Container, Left, Button, Title, Icon, Body, Right} from 'native-base'

export default class App extends Component<Props> {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Github Users</Title>
          </Body>
        </Header>
      </Container>
    );
  }
}
