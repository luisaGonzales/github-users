import gql from "graphql-tag";

export const counter = 20;
export const GET_USERS = gql`
  query SearchUsers($user: String!, $cursor: String, $counter: Int){
    search(query: $user, type: USER, first: $counter, after: $cursor) {
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
