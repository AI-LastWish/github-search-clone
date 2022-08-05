import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
  query SearchUsers($username: String!, $first: Int!, $after: String) {
    search(query: $username, type: USER, first: $first, after: $after) {
      userCount
      edges {
        node {
          ... on User {
            avatarUrl
            id
            login
            name
            followers(first: 1) {
              totalCount
            }
            following(first: 1) {
              totalCount
            }
          }
        }
      }
    }
  }
`

export const GET_USER_DETAILS = gql`
  query User($login: String!) {
    user(login: $login) {
      avatarUrl
      id
      login
      name
      followers(first: 1) {
        totalCount
      }
      following(first: 1) {
        totalCount
      }
    }
  }
`

export const GET_USER_DETAILS_REPOSITORIES = gql`
  query User($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      location
      bio
      repositories(first: 6) {
        totalCount
        nodes {
          id
          name
          stargazerCount
          forkCount
        }
      }
      followers(first: 1) {
        totalCount
      }
      following(first: 1) {
        totalCount
      }
    }
  }
`

export const GET_USER_DETAILS_FOLLOWERS = gql`
  query User($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      location
      bio
      repositories(first: 1) {
          totalCount
      }
      following(first: 1) {
        totalCount
      }
      followers(first: 6) {
        totalCount
        nodes {
          avatarUrl
          id
          login
          name
          followers(first: 6) {
            totalCount
          }
          following(first: 6) {
            totalCount
          }
        }
      }
    }
  }
`

export const GET_USER_DETAILS_FOLLOWING = gql`
  query User($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      location
      bio
      repositories(first: 1) {
        totalCount
      }
      followers(first: 1) {
        totalCount
      }
      following(first: 6) {
        totalCount
        nodes {
          avatarUrl
          id
          login
          name
          followers(first: 6) {
            totalCount
          }
          following(first: 6) {
            totalCount
          }
        }
      }
    }
  }
`