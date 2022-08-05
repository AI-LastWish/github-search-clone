import { useTheme } from 'next-themes'
import React from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const HeaderUserDetails = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  return (
    <header className='flex justify-between'>
      <HomeIcon className='h-10 cursor-pointer' onClick={() => router.push('/')} />
      <div className="flex items-center justify-end w-full mb-12">
        <label
          htmlFor="toogleDarkMode"
          className="flex items-center cursor-pointer"
        >
          <div className="relative has-tooltip">
            <input id="toogleDarkMode" type="checkbox" className="sr-only" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <div className="bar w-10 h-6 bg-gray-400 rounded-full shadow-inner cursor-pointer"></div>
            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 top-0 transition"></div>
            <span className='tooltip rounded shadow-lg p-1 bg-gray-500 dark:bg-white text-white dark:text-black mt-4 -ml-30 w-40 text-center'>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
          </div>
        </label>

      </div>
    </header>
  )
}

export default HeaderUserDetails