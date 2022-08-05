import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { UserDetails } from '../typings'
import FavoriteFeed from '../components/FavoriteFeed'
import CurrentPageProvider from '../context/CurrentPageProvider'
import { fetchFavorite } from '../utils/favorite'
import FavoriteNoLike from '../components/FavoriteNoLike'

const Favorite = () => {
  const [favorite, setFavorite] = useState<UserDetails[]>([])

  useEffect(() => {
    fetchFavorite(setFavorite)
  }, [])

  return (
    // <CurrentPageProvider>
      <div className='min-h-screen flex flex-col'>
        <div className='mx-16 pt-8'>
          <Head>
            <title>Favorite</title>
          </Head>
          <Header title='Favorite' />
        </div>
        <main className='flex flex-col justify-center flex-grow px-12 py-2'>
          {favorite.length > 0 ? <FavoriteFeed users={favorite.map(x => x.user)} /> : <FavoriteNoLike />}
        </main>
        <Footer />
      </div>
    // </CurrentPageProvider>
  )
}

export default Favorite
