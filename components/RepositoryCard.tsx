import React, {  } from 'react'
import { Repository } from '../typings'
import { kFormatter } from '../utils/number';

interface Props {
  repository: Repository
}

const RepositoryCard = ({ repository }: Props) => {

  return (
    <div className='flex shadow-user dark:shadow-user-dark rounded-lg p-6 m-4'>
      <div className='whitespace-pre-line pl-8 flex-shrink flex-grow'>
        <div className='relative'>
          <strong>{repository.name}</strong>  
        </div>
        {`\n
        ${repository.stargazerCount ? kFormatter(repository.stargazerCount) : 0} stars
        ${repository.forkCount ? kFormatter(repository.forkCount) : 0} forks
        `}
      </div>
    </div>
  )
}

export default RepositoryCard