import React, { createContext, ReactNode, useState } from 'react'
import { DEFAULT_CURRENT_PAGE } from '../constants/PageConst'

interface ICurrentPageProvider {
  currentPage: number,
  handleSetCurrentPage: (page: number) => void
}

interface Props {
  children?: ReactNode
}

const defaultState = {
  currentPage: DEFAULT_CURRENT_PAGE,
  handleSetCurrentPage: () => {}
}

export const CurrentPageContext = createContext<ICurrentPageProvider>(defaultState)

const CurrentPageProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState(defaultState.currentPage)

  const handleSetCurrentPage = (page: number) => setCurrentPage(page)

  return (
    <CurrentPageContext.Provider value={{ currentPage, handleSetCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  )
}

export default CurrentPageProvider