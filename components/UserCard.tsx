import Image from 'next/image'
import React, { useState } from 'react'
import { IRootState, User } from '../typings'
import Highlighter from "react-highlight-words";
import { shallowEqual, useSelector } from 'react-redux';
import { kFormatter } from '../utils/number';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { FAVORITE } from '../constants/FavoriteConst';
import { useRouter } from 'next/router';
import { DEFAULT_SELECTED_TAB } from '../constants/UserDetailsConst';

interface Props {
  user: User,
  isUserDetails?: boolean
}

const UserCard = ({ user, isUserDetails = false }: Props) => {
  const router = useRouter()
  const keyword = useSelector<IRootState, string>((state) => state.keyword.keyword)
  const [isFavorite, toggleFavorite] = useState(false)

  const handleonClickUserCard = () => {
    if (isUserDetails) {
      location.replace(`/users?username=${user.login}&tab=${DEFAULT_SELECTED_TAB}`)
    } else {
      router.push(`/users?username=${user.login}&tab=${DEFAULT_SELECTED_TAB}`)
    }
  }

  const handleToggleFavorite = () => {
    const favoriteFromStorage = localStorage.getItem(FAVORITE)
    if (favoriteFromStorage && JSON.parse(favoriteFromStorage).includes(user.login)) {
      const favorite: string[] = JSON.parse(favoriteFromStorage)
      localStorage.setItem(FAVORITE, JSON.stringify(favorite.filter(f => f !== user.login)))
      toggleFavorite(!isFavorite)
    } else {
      if (!favoriteFromStorage) {
        localStorage.setItem(FAVORITE, JSON.stringify([user.login]))
        toggleFavorite(!isFavorite)
      } else {
        const favorite: string[] = JSON.parse(favoriteFromStorage)
        localStorage.setItem(FAVORITE, JSON.stringify([...favorite, user.login]))
        toggleFavorite(!isFavorite)
      }
    }
  }

  return (
    <div className='flex shadow-user dark:shadow-user-dark rounded-lg p-6 m-4'>
      <button onClick={handleonClickUserCard}><Image src={user.avatarUrl ?? '/images/user/default-user-logo.png'} width={100} height={100} /></button>
      <div className='whitespace-pre-line pl-8 flex-shrink flex-grow'>
        <div className='relative'>
          <Highlighter
            highlightClassName="font-bold"
            searchWords={[keyword]}
            autoEscape={true}
            textToHighlight={user.login ?? ''}
          />
          {
            localStorage.getItem(FAVORITE) && JSON.parse(localStorage.getItem(FAVORITE)!).includes(user.login) ?
              <HeartIconSolid
                className='w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-0 heart-icon cursor-pointer'
                onClick={handleToggleFavorite} /> :
              <HeartIcon
                className='w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-0 heart-icon cursor-pointer'
                onClick={handleToggleFavorite} />
          }

        </div>
        <div>
          <Highlighter
            highlightClassName="font-bold"
            searchWords={[keyword]}
            autoEscape={true}
            textToHighlight={user.name ?? ''}
          />
        </div>
        {`\n
        ${user.followers?.totalCount ? kFormatter(user.followers?.totalCount) : 0} followers
        ${user.following?.totalCount ? kFormatter(user.following?.totalCount) : 0} followings
        `}
      </div>
    </div>
  )
}

export default UserCard