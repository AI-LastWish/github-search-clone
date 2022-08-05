import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../typings'

const NoSearchFound = () => {
  const keyword = useSelector<IRootState, string>((state) => state.keyword.keyword)

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='text-center w-72 text-sm github-text break-words whitespace-pre-line'>
          <p>No search result found for</p>
          <p><strong>{keyword}</strong></p>
        </div>

      </div>
    </div>
  )
}

export default NoSearchFound