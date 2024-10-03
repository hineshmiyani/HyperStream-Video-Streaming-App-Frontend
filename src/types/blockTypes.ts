import { User } from '@/types/userTypes'

export type Block = {
  id: string
  blockerId: string
  blockedId: string
  blocked: User
}

export type BlockUserResponse = TApiResponse & {
  data: Block
}

export type UnblockUserResponse = BlockUserResponse

export type BlockedUsersResponse = TApiResponse & {
  data: Block[]
}

export type IsUserAlreadyBlockedResponse = TApiResponse & {
  data: {
    isUserBlocked: boolean
  }
}
