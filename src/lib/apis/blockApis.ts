import api from '@/lib/axios'
import { BlockSchemaType } from '@/lib/validators/blockSchema'
import {
  BlockUserResponse,
  IsUserAlreadyBlockedResponse,
  UnblockUserResponse,
} from '@/types/blockTypes'

const getIsUserAlreadyBlocked = (
  currentUserId: string,
  otherUserId: string
): Promise<IsUserAlreadyBlockedResponse> => {
  return api.get(`/blocks/is-blocked/${currentUserId}/${otherUserId}`)
}

const blockUser = (payload: BlockSchemaType): Promise<BlockUserResponse> => {
  return api.post('/blocks/block-user', payload)
}

const unblockUser = (payload: BlockSchemaType): Promise<UnblockUserResponse> => {
  return api.post('/blocks/unblock-user', payload)
}

export { blockUser, getIsUserAlreadyBlocked, unblockUser }
