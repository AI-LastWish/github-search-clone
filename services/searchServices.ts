import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GET_ALL_USERS, GET_USER_DETAILS, GET_USER_DETAILS_FOLLOWERS, GET_USER_DETAILS_FOLLOWING, GET_USER_DETAILS_REPOSITORIES } from '../constants/GQLConst'
import {
  SearchResult,
  UserDetails,
  UserDetailsFollowers,
  UserDetailsFollowing,
  UserDetailsRepository,
  UserDetailsType
} from '../typings';

const createClient = () => {
  const API_KEY = process.env.API_KEY;
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: API_KEY ? `Bearer ${API_KEY}` : "",
      }
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  })

  return client
}

export const getUserByUsername = async (username: string, first: number, after: string) => {
  const client = createClient()

  const GET_ALL_USERS_VARIABLES = {
    username,
    first,
    after
  };

  const { data } = await client.query<SearchResult>({
    query: GET_ALL_USERS,
    variables: GET_ALL_USERS_VARIABLES,
  })

  return data
}

export const getUserDetails = async (login: string, type: UserDetailsType) => {
  const client = createClient()

  const GET_USER_DETAILS_VARIABLES = { login }

  switch (type) {
    case UserDetailsType.UserDetails:
      const { data } = await client.query<UserDetails>({
        query: GET_USER_DETAILS,
        variables: GET_USER_DETAILS_VARIABLES
      })
      return data

    case UserDetailsType.UserDetailsRepository:
      const { data: dataRepository } = await client.query<UserDetailsRepository>({
        query: GET_USER_DETAILS_REPOSITORIES,
        variables: GET_USER_DETAILS_VARIABLES
      })
      return dataRepository
    case UserDetailsType.UserDetailsFollowers:
      const { data: dataFollowers } = await client.query<UserDetailsFollowers>({
        query: GET_USER_DETAILS_FOLLOWERS,
        variables: GET_USER_DETAILS_VARIABLES
      })
      return dataFollowers
    default:
      const { data: dataFollowing } = await client.query<UserDetailsFollowing>({
        query: GET_USER_DETAILS_FOLLOWING,
        variables: GET_USER_DETAILS_VARIABLES
      })
      return dataFollowing
  }
}