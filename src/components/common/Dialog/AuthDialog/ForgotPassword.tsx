import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutationFactory } from '@/hooks/react-query'
import { sendPasswordRecoveryEmail } from '@/lib/apis/usersApis'
import { EmailSchemaType, emailSchema } from '@/lib/validators/userSchema'

const ForgotPassword = () => {
  const { mutateAsync } = useMutationFactory({
    mutationFn: sendPasswordRecoveryEmail,
  })

  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: EmailSchemaType) => {
    await mutateAsync(values)
  }

  return (
    <div className="bg-background">
      <div className="w-fit space-y-2">
        <DialogTitle className="text-xl font-medium tracking-normal text-primary transition-all duration-300 ease-in-out">
          Forgot Password
        </DialogTitle>
        <div className="h-[2px] w-full rounded-lg bg-primary transition-all duration-300 ease-in-out" />
      </div>

      <div className="rounded bg-card pb-4 pt-8 shadow-md">
        <p className="mb-5">
          Please enter your registered email address to receive a link to reset your password.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
