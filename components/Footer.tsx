import React, { useEffect } from 'react'
import { HeartIcon, SearchIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()

  return (
    <footer className='mt-auto shadow-footer dark:shadow-footer-dark flex justify-center items-center mb-2'>
      <button
        onClick={() => router.push('/')}
        className={`flex-grow flex-shrink flex flex-col justify-center items-center cursor-pointer
        ${router.query.page || router.pathname === '/' ? 'footer-hightlight' : ''}`}
      >
        <SearchIcon className='h-8 mt-2' />
        <p className='text-md'>Search</p>
      </button>
      <button
        onClick={() => router.push('/liked')}
        className={`flex-grow flex-shrink flex flex-col justify-center items-center cursor-pointer
        ${router.pathname === '/liked' ? 'footer-hightlight' : ''}`}
      >
        <HeartIcon className='h-8 mt-2' />
        <p className='text-md'>Favorite</p>
      </button>
    </footer>
  )
}

export default Footer