import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { useMutationFactory } from '@/hooks/react-query'
import { resendVerificationEmail } from '@/lib/apis/usersApi'
import { UserSignUpResponse } from '@/types/userTypes'

const VerifyEmail = () => {
  const { data: singUpData } = useQuery({
    queryKey: ['signUpUser'],
  })

  const { email } = (singUpData as UserSignUpResponse)?.data || {}

  const { mutate, isPending } = useMutationFactory({
    mutationFn: resendVerificationEmail,
  })

  const handleResendVerificationEmail = async () => {
    mutate({ email })
  }

  return (
    <div className="bg-background">
      <div className="w-fit space-y-2">
        <DialogTitle className="text-xl font-medium tracking-normal text-primary transition-all duration-300 ease-in-out">
          Verify Email
        </DialogTitle>
        <div className="h-[2px] w-full rounded-lg bg-primary transition-all duration-300 ease-in-out" />
      </div>

      <div className="rounded bg-card pb-4 pt-8 shadow-md">
        <p className="mb-5">
          Welcome! We&apos;ve just sent a verification email to your registered email address.
        </p>
        <p className="mb-8">
          Haven&apos;t received the email? Check your spam folder or use the button below to resend
          it.
        </p>
        <Button type="button" onClick={handleResendVerificationEmail} disabled={isPending}>
          Resend Verification Email
        </Button>
      </div>
    </div>
  )
}

export default VerifyEmail
