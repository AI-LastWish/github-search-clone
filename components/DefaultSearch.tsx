import React from 'react'

const DefaultSearch = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-32 bg-github-logo dark:bg-github-logo-dark' />
      <div className='h-14 justify-center items-center bg-github-text dark:bg-github-text-dark' />
      <div className='flex justify-center items-center'>
        <div className='text-center w-72 text-sm github-text break-words'>
          Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.
        </div>

      </div>
    </div>
  )
}

export default DefaultSearch