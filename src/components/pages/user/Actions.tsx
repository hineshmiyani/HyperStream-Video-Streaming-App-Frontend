'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useMutationFactory } from '@/hooks/react-query'
import { followUser, unfollowUser } from '@/lib/apis/followApis'
import { User } from '@/types/userTypes'

type ActionProps = {
  user: User
  isUserAlreadyFollowing: boolean
}

const Actions = ({ user, isUserAlreadyFollowing }: ActionProps) => {
  const router = useRouter()

  const queryClient = useQueryClient()

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

  const handleFollow = async () => {
    if (isUserAlreadyFollowing) {
      await unfollowUserMutation.mutateAsync({
        followingId: user.id,
      })
    } else {
      await followUserMutation.mutateAsync({
        followingId: user.id,
      })
    }
  }

  return (
    <div>
      <Button
        onClick={handleFollow}
        disabled={followUserMutation?.isPending || unfollowUserMutation?.isPending}
      >
        {isUserAlreadyFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )
}

export default Actions
