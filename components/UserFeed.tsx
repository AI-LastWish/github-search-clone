import React from 'react'
import { ITEMS_PER_PAGE } from '../constants/PageConst'
import { Node, User } from '../typings'
import PaginatedItems from './PaginatedItems'
import UserCard from './UserCard'

interface Props {
  users: User[],
  userCount: number
}

const UserFeed = ({ users, userCount }: Props) => {

  return (
    <>
      <div className='flex items-start pl-4 pt-4'>{userCount.toLocaleString()} GitHub users found</div>
      <div className='grid md:grid-cols-2 mx-auto w-full'>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <PaginatedItems itemsPerPage={ITEMS_PER_PAGE} userCount={userCount} />
    </>
  )
}

export default UserFeed