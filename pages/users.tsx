import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import HeaderUserDetails from '../components/HeaderUserDetails'
import UserAvatar from '../components/UserAvatar'
import UserDetailsTabs from '../components/UserDetailsTabs'
import { DEFAULT_SELECTED_TAB, FOLLOWERS_TAB, FOLLOWINGS_TAB, REPOSITORIES_TAB } from '../constants/UserDetailsConst'
import { getUserDetails } from '../services/searchServices'
import {
  UserDetailsFollowers,
  UserDetailsFollowing,
  UserDetailsRepository,
  UserDetailsType
}
  from '../typings'

const userDetails = () => {

  const router = useRouter()
  const [userDetails, setUserDetails] = useState<UserDetailsRepository | UserDetailsFollowers | UserDetailsFollowing | null>(null)
  const [selectedTab, setSelectedTab] = useState(DEFAULT_SELECTED_TAB)

  const handleSelectedTab = (selected: number) => {
    setSelectedTab(selected)
  }

  const fetchUserDetails = async () => {
    const login = router.query.username
    const tab = router.query.tab
    if (login) {
      switch (tab) {
        case FOLLOWERS_TAB:
          const dataFollowers = await getUserDetails(login as string, UserDetailsType.UserDetailsFollowers)
          setSelectedTab(Number(FOLLOWERS_TAB))
          setUserDetails(dataFollowers as UserDetailsFollowers)
          break
        case FOLLOWINGS_TAB:
          const dataFollowings = await getUserDetails(login as string, UserDetailsType.UserDetailsFollowing)
          setSelectedTab(Number(FOLLOWINGS_TAB))
          setUserDetails(dataFollowings as UserDetailsFollowing)
          break
        default:
          const data = await getUserDetails(login as string, UserDetailsType.UserDetailsRepository)
          setSelectedTab(Number(REPOSITORIES_TAB))
          setUserDetails(data as UserDetailsRepository)
          break
      }
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    fetchUserDetails()
  }, [router.isReady, selectedTab])

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='mx-16 pt-8 pb-4'>
        <Head>
          <title>User Details</title>
        </Head>
        <HeaderUserDetails />
      </div>
      <main className='flex flex-col justify-center flex-grow px-12 py-2'>
        {userDetails && <UserAvatar userDetails={userDetails} />}
        {userDetails &&
          <UserDetailsTabs
            userDetails={userDetails as UserDetailsFollowing}
            selectedTab={selectedTab}
            handleSelectedTab={handleSelectedTab}
          />}
      </main>
      <Footer />
    </div>
  )
}

export default userDetails