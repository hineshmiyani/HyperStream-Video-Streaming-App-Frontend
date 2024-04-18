'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { signUpUser } from '@/lib/apis/usersApi'
import { SignUpSchemaType, signUpSchema } from '@/lib/validators/userSchema'

type Props = {
  setIsSignUpSuccessful: Dispatch<SetStateAction<boolean>>
}

const SignUp = ({ setIsSignUpSuccessful }: Props) => {
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const queryClient = useQueryClient()

  const { isSuccess, mutateAsync } = useMutationFactory({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['signUpUser'], data)
    },
  })

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    setIsSignUpSuccessful(isSuccess)
  }, [isSuccess])

  const onSubmit = async (values: SignUpSchemaType) => {
    await mutateAsync(values)
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                {!fieldState?.error ? (
                  <FormDescription>
                    You&apos;ll need to verify that you own this email account.
                  </FormDescription>
                ) : null}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                {!fieldState?.error ? (
                  <FormDescription>This is your public display name.</FormDescription>
                ) : null}

                <FormMessage />
              </FormItem>
            )}
          />

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
                        setIsShowPassword((value) => ({ ...value, password: !value.password }))
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
                    Password must have at least 8 characters, including one uppercase letter, one
                    lowercase letter, one number, and one special character.
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
                    <Input type={isShowPassword.confirmPassword ? 'text' : 'password'} {...field} />
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
