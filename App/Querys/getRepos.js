import gql from "graphql-tag";

const GET_REPOS = gql`
  query GetRepositories($login: String!){
    user(login: $login){
      repositories(first: 20){
        nodes {
          name
          description
          pullRequests {
              totalCount
          }
        }
      }
    }
  }
`;

export default GET_REPOS;