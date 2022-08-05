import { OfficeBuildingIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import { UserDetailsFollowers, UserDetailsFollowing, UserDetailsRepository } from '../typings'

interface Props {
  userDetails: UserDetailsRepository | UserDetailsFollowers | UserDetailsFollowing
}

const UserAvatar = ({ userDetails }: Props) => {

  return (
    <div className='flex flex-col items-center justify-center'>
      <Image className='rounded-full' src={userDetails.user.avatarUrl ?? ''} width={160} height={160} />
      <p className='text-2xl m-4'><strong>{userDetails.user.bio ?? ''}</strong></p>
      <p className='text-2xl mb-4'>{userDetails.user.login ?? ''}</p>
      <div className='flex items-center'>
        <OfficeBuildingIcon className='h-10' />
        <div>{userDetails.user.location ?? ''}</div>
      </div>
    </div>
  )
}

export default UserAvatar