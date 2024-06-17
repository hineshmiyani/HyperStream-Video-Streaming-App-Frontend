'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import UserItem, { UserItemSkeleton } from '@/components/layout/Sidebar/UserItem'
import { getAllUsers } from '@/lib/apis/usersApi'
import { isCollapsed } from '@/lib/redux/features/sidebar/sidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

const Recommended = () => {
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const { data: recommendedUsers, isFetching } = useQuery({
    queryKey: ['users', currentUser?.id],
    queryFn: () => getAllUsers(currentUser?.id || ''),
    select: (data) => data?.data,
  })

  const showLabel = !isSidebarCollapsed && recommendedUsers && recommendedUsers?.length > 0

  if (isFetching) {
    return null
  }

  return (
    <div>
      {showLabel ? (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      ) : null}

      <div className="space-y-2 px-2">
        {recommendedUsers?.map((user) => (
          <UserItem
            key={user?.id}
            username={user?.username}
            imageUrl={user?.avatar || ''}
            isLive={false}
          />
        ))}
      </div>
    </div>
  )
}

const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {Array(3)
        .fill('_')
        .map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
    </ul>
  )
}

export { RecommendedSkeleton }

export default Recommended
