import { UsersIcon } from '@heroicons/react/solid'
import React from 'react'

const FavoriteNoLike = () => {

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='text-center w-72 text-sm github-text break-words whitespace-pre-line flex flex-col items-center'>
          <UsersIcon className='h-10 mb-4 no-like-icon dark:no-like-icon-dark' />
          <p>Once you like people, you'll see them here.</p>
        </div>

      </div>
    </div>
  )
}

export default FavoriteNoLike