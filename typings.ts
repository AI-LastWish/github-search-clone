import { combineReducers } from 'redux';
import searchSliceReducer from './redux/slices/searchSlice'
import keywordSliceReducer from './redux/slices/keywordSlice'
import userCountSliceReducer from './redux/slices/userCountSlice';

const rootReducer = combineReducers({
  users: searchSliceReducer,
  userCount: userCountSliceReducer,
  keyword: keywordSliceReducer
})

export type User = {
  id: string,
  avatarUrl: string,
  login: string,
  name: string,
  followers: {
    totalCount: number
  },
  following: {
    totalCount: number
  }
}

export type Node = {
  node: User
}

export type SearchResult = {
  search: {
    userCount: number
    edges: Node[]
  }
}

export type UserDetails = {
  user: User
}

export type Repository = {
  id: string,
  name: string,
  stargazerCount: number,
  forkCount: number
}

export type UserDetailsRepository = {
  user: {
    avatarUrl: string,
    login: string,
    location: string,
    bio: string,
    repositories: {
      totalCount: number,
      nodes: Repository[]
    },
    followers: {
      totalCount: number
    }
    following: {
      totalCount: number
    }
  }
}

export type UserDetailsFollowers = {
  user: {
    avatarUrl: string,
    login: string,
    location: string,
    bio: string,
    followers: {
      totalCount: number
      nodes: User[]
    }
    repositories: {
      totalCount: number
    }
    following: {
      totalCount: number
    }
  }
}

export type UserDetailsFollowing = {
  user: {
    avatarUrl: string,
    login: string,
    location: string,
    bio: string,
    following: {
      totalCount: number
      nodes: User[]
    }
    repositories: {
      totalCount: number
    }
    followers: {
      totalCount: number
    }
  }
}

export const enum UserDetailsType {
  UserDetails = 1,
  UserDetailsRepository,
  UserDetailsFollowers,
  UserDetailsFollowing
}

export type IRootState = ReturnType<typeof rootReducer>;
