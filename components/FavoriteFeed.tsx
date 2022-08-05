import React from 'react'
import { User } from '../typings'
import UserCard from './UserCard'

interface Props {
  users: User[]
}

const FavoriteFeed = ({ users }: Props) => {

  return (
    <div className='grid md:grid-cols-2 mx-auto w-full'>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default FavoriteFeed