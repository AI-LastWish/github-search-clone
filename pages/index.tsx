import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import { IRootState, Node } from '../typings'
import UserFeed from '../components/UserFeed'
import { useSelector } from 'react-redux'
import DefaultSearch from '../components/DefaultSearch'
import CurrentPageProvider from '../context/CurrentPageProvider'
import NoSearchFound from '../components/NoSearchFound'

const Home: NextPage = () => {
  const users = useSelector<IRootState, Node[]>((state) => state.users.users)
  const userCount = useSelector<IRootState, number>((state) => state.userCount.userCount)
  const keyword = useSelector<IRootState, string>((state) => state.keyword.keyword)

  return (
    <CurrentPageProvider>
      <div className='min-h-screen flex flex-col'>
        <div className='mx-16 pt-8'>
          <Head>
            <title>Search</title>
          </Head>
          <Header title='Search' />
          <SearchBox />
        </div>
        <main className='flex flex-col justify-center flex-grow px-12 py-2'>
          {keyword.trim() !== '' ?
            (userCount > 0 ? <UserFeed users={users.map(x => x.node)} userCount={userCount} /> : <NoSearchFound />)
            : <DefaultSearch />}
        </main>
        <Footer />
      </div>
    </CurrentPageProvider>
  )
}

export default Home
