import gql from "graphql-tag";

export const count = 20;

const REPO_FRAGMENT = gql`
  fragment RepoFragment on RepositoryEdge {
    node {
      name
      description
      pullRequests{
        totalCount
      }
    }
  }
`

const GET_REPOS = gql`
  query GetRepositories($login: String!, $cursor: String, $count: Int){
    user(login: $login){
      repositories(first: $count , after: $cursor){
        edges{
          cursor
          ... RepoFragment
        }
      }
    }
  }
  ${REPO_FRAGMENT}
`;

export default GET_REPOS;