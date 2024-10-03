'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useMutationFactory } from '@/hooks/react-query'
import { blockUser, getIsUserAlreadyBlocked, unblockUser } from '@/lib/apis/blockApis'
import { followUser, unfollowUser } from '@/lib/apis/followApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { User, UserResponse } from '@/types/userTypes'

type ActionProps = {
  otherUser: User
  isUserAlreadyFollowing: boolean
}

const Actions = ({ otherUser, isUserAlreadyFollowing }: ActionProps) => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const { data: isUserBlocked, isFetching } = useQuery({
    queryKey: ['isUserBlocked', currentUser?.id, otherUser?.id],
    queryFn: () => getIsUserAlreadyBlocked(currentUser?.id as string, otherUser?.id),
    select: (data) => data?.data?.isUserBlocked,
    enabled: !!currentUser?.id && !!otherUser?.id,
  })

  const followUserMutation = useMutationFactory({
    mutationFn: followUser,
    onSuccess: () => {
      router.refresh()
      queryClient.fetchQuery({
        queryKey: ['following'],
      })
    },
  })

  const unfollowUserMutation = useMutationFactory({
    mutationFn: unfollowUser,
    onSuccess: () => {
      router.refresh()
      queryClient.fetchQuery({
        queryKey: ['following'],
      })
    },
  })

  const blockUserMutation = useMutationFactory({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['isUserBlocked', currentUser?.id, otherUser?.id],
      })
    },
  })

  const unblockUserMutation = useMutationFactory({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['isUserBlocked', currentUser?.id, otherUser?.id],
      })
    },
  })

  const handleFollow = async () => {
    if (isUserAlreadyFollowing) {
      await unfollowUserMutation.mutateAsync({
        followingId: otherUser.id,
      })
    } else {
      await followUserMutation.mutateAsync({
        followingId: otherUser.id,
      })
    }
  }

  const handleBlock = async () => {
    if (isUserBlocked) {
      await unblockUserMutation.mutateAsync({
        otherUserId: otherUser?.id,
      })
    } else {
      await blockUserMutation.mutateAsync({
        otherUserId: otherUser?.id,
      })
    }
  }

  if (isFetching) {
    return null
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleFollow}
        disabled={followUserMutation?.isPending || unfollowUserMutation?.isPending}
      >
        {isUserAlreadyFollowing ? 'Unfollow' : 'Follow'}
      </Button>

      <Button
        onClick={handleBlock}
        disabled={blockUserMutation?.isPending || unblockUserMutation?.isPending}
      >
        {isUserBlocked ? 'Unblock' : 'Block'}
      </Button>
    </div>
  )
}

export default Actions
