import { Stream } from '@/types/streamTypes'

export type User = {
  id: string
  username: string
  email: string
  displayName: string | null
  bio: string | null
  avatar: string | null
  coverImage: string | null
  googleId: string | null
  facebookId: string | null
  authProviders: ('GOOGLE' | 'FACEBOOK' | 'JWT')[]
  stream: Stream | null
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserLoginResponse = TApiResponse & {
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export type UserResponse = TApiResponse & {
  data: User
}

export type UsersResponse = TApiResponse & {
  data: User[]
}

export type UserSignUpResponse = TApiResponse & {
  data: Pick<User, 'id' | 'username' | 'email'>
}
