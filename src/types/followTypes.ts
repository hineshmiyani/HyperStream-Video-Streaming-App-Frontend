import { User } from '@/types/userTypes'

export type Follow = {
  id: string
  followerId: string
  followingId: string
  following: User
  createdAt: Date
  updatedAt: Date
}

export type FollowResponse = TApiResponse & {
  data: Follow
}

export type UnfollowResponse = FollowResponse

export type FollowedUsersResponse = TApiResponse & {
  data: Follow[]
}

export type IsUserAlreadyFollowingResponse = TApiResponse & {
  data: {
    isUserAlreadyFollowing: boolean
  }
}
