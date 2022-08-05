import { useRouter } from 'next/router';
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FOLLOWERS, FOLLOWERS_TAB, FOLLOWINGS, FOLLOWINGS_TAB, REPOSITORIES, REPOSITORIES_TAB } from '../constants/UserDetailsConst';
import { UserDetailsRepository, UserDetailsFollowers, UserDetailsFollowing } from '../typings'
import { changeTab } from '../utils/filterSearch';
import RepositoryCard from './RepositoryCard';
import UserCard from './UserCard';
import { kFormatter } from '../utils/number';

interface Props {
  userDetails: UserDetailsRepository | UserDetailsFollowers | UserDetailsFollowing
  selectedTab: number,
  handleSelectedTab: (selected: number) => void
}

const UserDetailsTabs = ({ selectedTab, userDetails, handleSelectedTab }: Props) => {
  const router = useRouter()

  return (
    <Tabs
      onSelect={(index: number) => {
        changeTab(router, userDetails.user.login, index.toString())
        handleSelectedTab(index)
      }}
      selectedIndex={selectedTab}
      className='mt-4'
    >
      <TabList>

        <Tab>
          <div className='flex flex-col items-center justify-center'>
            <div>{REPOSITORIES}</div>
            <div>({kFormatter(userDetails.user.repositories.totalCount)})
            </div>
          </div>
        </Tab>
        <Tab>
          <div className='flex flex-col items-center justify-center'>
            <div>{FOLLOWERS}</div>
            <div>({kFormatter(userDetails.user.followers.totalCount)})
            </div>
          </div>
        </Tab>
        <Tab>
          <div className='flex flex-col items-center justify-center'>
            <div>{FOLLOWINGS}</div>
            <div>({kFormatter(userDetails.user.following.totalCount)})</div>
          </div>
        </Tab>
      </TabList>

      <TabPanel>
        <div className='grid md:grid-cols-2 mx-auto w-full'>
          {
            // @ts-ignore
            selectedTab === Number(REPOSITORIES_TAB) && userDetails.user.repositories.nodes && userDetails.user.repositories.nodes.map(repo => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
        </div>
      </TabPanel>
      <TabPanel>
        <div className='grid md:grid-cols-2 mx-auto w-full'>
          {
            // @ts-ignore
            selectedTab === Number(FOLLOWERS_TAB) && userDetails.user.followers.nodes && userDetails.user.followers.nodes.map(user => (
              <UserCard key={user.id} user={user} isUserDetails={true} />
            ))}
        </div>
      </TabPanel>
      <TabPanel>
        <div className='grid md:grid-cols-2 mx-auto w-full'>
          {
            // @ts-ignore
            selectedTab === Number(FOLLOWINGS_TAB) && userDetails.user.following.nodes && userDetails.user.following.nodes.map(user => (
              <UserCard key={user.id} user={user} isUserDetails={true} />
            ))}
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default UserDetailsTabs