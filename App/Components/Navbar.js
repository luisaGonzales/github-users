import React, { Component } from 'react'
import {Header, Container, Title, Body} from 'native-base'

export default class Navbar extends Component {

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Nav</Title>
          </Body>
        </Header>
      </Container>
    )
  }
}
