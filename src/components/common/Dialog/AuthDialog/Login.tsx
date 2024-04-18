'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { loginUser } from '@/lib/apis/usersApi'
import { addToLocalStorage } from '@/lib/utils/storage'
import { LoginSchemaType, loginSchema } from '@/lib/validators/userSchema'

type Props = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsShowForgotPassword: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setIsDialogOpen, setIsShowForgotPassword }: Props) => {
  const router = useRouter()

  const [isShowPassword, setIsShowPassword] = useState(false)

  const { mutateAsync } = useMutationFactory({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response?.data || {}

      addToLocalStorage('accessToken', accessToken)
      addToLocalStorage('refreshToken', refreshToken)

      router.refresh()
    },
  })

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: LoginSchemaType) => {
    await mutateAsync(values)

    setTimeout(() => {
      setIsDialogOpen(false)
    }, 500)
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={isShowPassword ? 'text' : 'password'} {...field} />
                    <button
                      type="button"
                      className="absolute right-4 top-[9px]"
                      onClick={() => setIsShowPassword((value) => !value)}
                    >
                      {isShowPassword ? (
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

          <div className="!mt-2 text-right text-sm font-semibold text-primary">
            <button
              type="button"
              className="hover:text-accent-foreground/90"
              onClick={() => setIsShowForgotPassword(true)}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
