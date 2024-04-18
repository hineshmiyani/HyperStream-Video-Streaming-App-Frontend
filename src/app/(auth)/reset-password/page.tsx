'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutationFactory } from '@/hooks/react-query'
import { resetPassword } from '@/lib/apis/usersApi'
import { ResetPasswordSchemaType, resetPasswordSchema } from '@/lib/validators/userSchema'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryToken = searchParams.get('recoveryToken')

  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const { mutateAsync } = useMutationFactory({
    mutationFn: resetPassword,
  })

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: recoveryToken || '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    await mutateAsync(values)

    setTimeout(() => {
      router.replace('/')
    }, 1500)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-5">
      <Card className="w-full max-w-[390px] sm:max-w-[500px]">
        <CardHeader>
          <CardTitle>Set New Password</CardTitle>
          <CardDescription>Please set your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={isShowPassword.password ? 'text' : 'password'} {...field} />
                        <button
                          type="button"
                          className="absolute right-4 top-[9px]"
                          onClick={() =>
                            setIsShowPassword((value) => ({
                              ...value,
                              password: !value.password,
                            }))
                          }
                        >
                          {isShowPassword.password ? (
                            <EyeOffIcon size={20} className="cursor-pointer opacity-60" />
                          ) : (
                            <EyeIcon size={20} className="cursor-pointer opacity-60" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    {!fieldState?.error ? (
                      <FormDescription>
                        Password must have at least 8 characters, including one uppercase letter,
                        one lowercase letter, one number, and one special character.
                      </FormDescription>
                    ) : null}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isShowPassword.confirmPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-[9px]"
                          onClick={() =>
                            setIsShowPassword((value) => ({
                              ...value,
                              confirmPassword: !value.confirmPassword,
                            }))
                          }
                        >
                          {isShowPassword.confirmPassword ? (
                            <EyeOffIcon size={20} className="cursor-pointer opacity-60" />
                          ) : (
                            <EyeIcon size={20} className="cursor-pointer opacity-60" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
