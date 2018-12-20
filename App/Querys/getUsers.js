import gql from "graphql-tag";

export const GET_USERS = gql`
  query SearchUsers($user: String!){
    search(query: $user, type: USER, first: 20) {
      edges {
        cursor
        node {
          ... on User {
            name
            avatarUrl
            location
            login
          }
        }
      }
    }
  }
`;

export const FETCH_USERS = gql`
query SearchUsers($user: String!, $cursor: String){
  search(query: $user, type: USER, first: 20, after: $cursor) {
    edges {
      cursor
      node {
        ... on User {
          name
          avatarUrl
          location
          login
        }
      }
    }
  }
}
`;