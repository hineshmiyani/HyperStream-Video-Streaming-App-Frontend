'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect } from 'react'

import { useMutationFactory } from '@/hooks/react-query'
import { verifyEmail } from '@/lib/apis/usersApi'
import { addToLocalStorage } from '@/lib/utils/storage'

const VerifyEmail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  const socialLogin = searchParams.get('socialLogin')

  const mutation = useMutationFactory(
    {
      mutationFn: verifyEmail,
    },
    {
      success: socialLogin ? 'User logged in successfully.' : '',
    }
  )

  useLayoutEffect(() => {
    if (!accessToken || !refreshToken) return

    addToLocalStorage('accessToken', accessToken)
    addToLocalStorage('refreshToken', refreshToken)
    ;(async () => {
      await mutation.mutateAsync()
      setTimeout(() => {
        router.replace('/')
      }, 1500)
    })()
  }, [accessToken, refreshToken])

  return null
}

export default VerifyEmail
