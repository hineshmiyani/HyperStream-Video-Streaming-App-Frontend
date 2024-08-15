'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import UserItem, { UserItemSkeleton } from '@/components/layout/Sidebar/UserItem'
import { getFollowedUsers } from '@/lib/apis/followApis'
import { isCollapsed } from '@/lib/redux/features/sidebar/sidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { FollowedUsersResponse } from '@/types/followTypes'
import { UserResponse } from '@/types/userTypes'

const Following = () => {
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const queryClient = useQueryClient()

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const { data: following, isLoading } = useQuery({
    queryKey: ['following'],
    queryFn: () => getFollowedUsers(),
    enabled: !!getFromLocalStorage('accessToken'),
    select: (data) => (data as FollowedUsersResponse)?.data,
  })

  useEffect(() => {
    if (following && currentUser?.id) {
      ;(async () => {
        await queryClient.invalidateQueries({
          queryKey: ['recommendedUsers', currentUser?.id],
          exact: true,
        })
      })()
    }
  }, [following, currentUser?.id])

  if (!(following && following?.length > 0)) {
    return null
  }

  return (
    <>
      {!isLoading ? (
        <div>
          {!isSidebarCollapsed ? (
            <div className="mb-4 pl-6">
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          ) : null}

          <div className="space-y-2 px-2">
            {following.map((follow) => (
              <UserItem
                key={follow?.following?.id}
                username={follow?.following?.username}
                imageUrl={follow?.following.avatar || ''}
              />
            ))}
          </div>
        </div>
      ) : (
        <FollowingSkeleton />
      )}
    </>
  )
}

const FollowingSkeleton = () => {
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

export { FollowingSkeleton }

export default Following
