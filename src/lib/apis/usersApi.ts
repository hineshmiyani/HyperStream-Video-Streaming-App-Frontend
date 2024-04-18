import api from '@/lib/axios'
import {
  LoginSchemaType,
  ResetPasswordSchemaType,
  SignUpSchemaType,
} from '@/lib/validators/userSchema'
import { User, UserLoginResponse, UserResponse, UserSignUpResponse } from '@/types/userTypes'

const signUpUser = (payload: SignUpSchemaType): Promise<UserSignUpResponse> => {
  return api.post('/users/signup', payload)
}

const loginUser = (payload: LoginSchemaType): Promise<UserLoginResponse> => {
  return api.post('/users/login', payload)
}

const verifyEmail = (): Promise<UserResponse> => {
  return api.post('/users/verify-email')
}

const resendVerificationEmail = (payload: Pick<User, 'email'>): Promise<TApiResponse> => {
  return api.post('/users/resend-verification-email', payload)
}

const getCurrentUser = (): Promise<UserResponse> => {
  return api.get('/users/current-user')
}

const logoutUser = (): Promise<TApiResponse> => {
  return api.post('/users/logout')
}

const sendPasswordRecoveryEmail = (payload: Pick<User, 'email'>): Promise<TApiResponse> => {
  return api.post('/users/password-recovery-email', payload)
}

const resetPassword = (payload: ResetPasswordSchemaType): Promise<TApiResponse> => {
  return api.post('/users/reset-password', payload)
}

export {
  getCurrentUser,
  loginUser,
  logoutUser,
  resendVerificationEmail,
  resetPassword,
  sendPasswordRecoveryEmail,
  signUpUser,
  verifyEmail,
}
