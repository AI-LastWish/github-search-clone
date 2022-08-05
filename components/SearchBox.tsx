import React, { useContext, useEffect } from 'react'
import { setUsers } from '../redux/slices/searchSlice'
import { setKeyword } from '../redux/slices/keywordSlice'
import { getUserByUsername } from '../services/searchServices'
import { IRootState, Node } from '../typings'
import { Dispatch } from 'redux'
import { useAppDispatch } from '../utils/hooks'
import { useSelector } from 'react-redux'
import { setUserCount } from '../redux/slices/userCountSlice'
import { DEFAULT_CURRENT_PAGE, ITEMS_PER_PAGE } from '../constants/PageConst'
import { CurrentPageContext } from '../context/CurrentPageProvider'
import { getAfterForPagination } from '../utils/pagination'
import { XCircleIcon } from '@heroicons/react/solid'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'

const actionDispatch = (dispatch: Dispatch) => ({
  setUsers: (users: Node[]) => dispatch(setUsers(users)),
  setUserCount: (userCount: number) => dispatch(setUserCount(userCount)),
  setKeyword: (keyword: string) => dispatch(setKeyword(keyword))
})

const SearchBox = () => {
  const router = useRouter()
  const keyword = useSelector<IRootState, string>((state) => state.keyword.keyword)
  const { setUsers, setUserCount, setKeyword } = actionDispatch(useAppDispatch())
  const { currentPage, handleSetCurrentPage } = useContext(CurrentPageContext)

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    handleSetCurrentPage?.(DEFAULT_CURRENT_PAGE)
    filterSearch(router, `${DEFAULT_CURRENT_PAGE}`, e.target.value)
  }

  const onDeleteKeyword = () => {
    setKeyword('')
    handleSetCurrentPage?.(DEFAULT_CURRENT_PAGE)
    filterSearch(router, `${DEFAULT_CURRENT_PAGE}`, '')
  }

  const fetchUsers = async () => {
    const first = ITEMS_PER_PAGE
    const after = getAfterForPagination(currentPage, ITEMS_PER_PAGE)
    const data = await getUserByUsername(keyword, first, after)

    setUserCount(data.search.userCount)
    setUsers(data.search.edges)
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.page) {
      handleSetCurrentPage(Number(router.query.page) - 1)
    }
    if (router.query.keyword) setKeyword(router.query.keyword as string)
  }, [router.isReady])

  useEffect(() => {
    if (!router.isReady) return;
    if (keyword.trim() !== '') {
      fetchUsers();
      filterSearch(router, `${currentPage + 1}`, keyword)
    }
  }, [router.isReady, keyword, currentPage]);

  return (
    <div className='relative cursor-pointer flex items-center h-14 rounded flex-grow'>
      <input
        className='p-2 h-full flex-grow flex-shrink 
            rounded focus:outline-none px-4 border-solid border text-base'
        type="text"
        placeholder='Enter GitHub username, i.e. gaearon'
        value={keyword}
        onChange={onChangeKeyword}
      />
      {keyword.trim() !== '' &&
        <XCircleIcon
          className='w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3 x-circle dark:x-circle-dark'
          onClick={onDeleteKeyword} />
      }
    </div>
  )
}

export default SearchBox