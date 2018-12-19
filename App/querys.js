import gql from "graphql-tag";

const GET_USERS = gql`
  query SearchUsers($user: String!){
    search(query: $user, type: USER, first: 50) {
      edges {
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

export default GET_USERS;