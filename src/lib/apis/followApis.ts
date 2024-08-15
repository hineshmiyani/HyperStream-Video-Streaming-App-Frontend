import api from '@/lib/axios'
import { FollowSchemaType } from '@/lib/validators/followSchema'
import {
  FollowedUsersResponse,
  FollowResponse,
  IsUserAlreadyFollowingResponse,
  UnfollowResponse,
} from '@/types/followTypes'

const getIsUserAlreadyFollowing = (
  followingId: string
): Promise<IsUserAlreadyFollowingResponse> => {
  return api.get(`/follows/is-following/${followingId}`)
}

const followUser = (payload: FollowSchemaType): Promise<FollowResponse> => {
  return api.post('/follows/follow', payload)
}

const unfollowUser = (payload: FollowSchemaType): Promise<UnfollowResponse> => {
  return api.post('/follows/unfollow', payload)
}

const getFollowedUsers = (): Promise<FollowedUsersResponse> => {
  return api.get('/follows/followed-users')
}

export { followUser, getFollowedUsers, getIsUserAlreadyFollowing, unfollowUser }
