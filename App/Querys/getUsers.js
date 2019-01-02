import gql from "graphql-tag";

export const counter = 20;

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    name
    location
    login
    avatarUrl
  }
`;

const GET_USERS = gql`
  query SearchUsers($user: String!, $cursor: String, $counter: Int){
    search(query: $user, type: USER, first: $counter, after: $cursor) {
      edges {
        cursor
        node {
          ... UserFragment
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;


export default GET_USERS;
