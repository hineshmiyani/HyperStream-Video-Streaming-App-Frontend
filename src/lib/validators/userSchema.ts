import { passwordRegex, usernameRegex } from '@/lib/regex'
import { z } from 'zod'

const baseUserSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter valid email.',
    })
    .trim()
    .toLowerCase(),
  username: z
    .string()
    .trim()
    .min(3, {
      message: 'Username must be at least 3 characters.',
    })
    .refine((username) => username.match(usernameRegex), {
      message: 'Username can only contain letters, numbers, and underscores.',
    }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .refine((password) => password.match(passwordRegex), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
})

const signUpSchema = baseUserSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match.`,
    path: ['confirmPassword'],
  })

const loginSchema = baseUserSchema
  .partial({
    username: true,
    email: true,
  })
  .refine((data) => data?.username || data?.email, {
    message: 'Either username or email is required',
  })

const emailSchema = baseUserSchema.pick({ email: true })

const resetPasswordSchema = baseUserSchema
  .pick({ password: true })
  .extend({
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match.`,
    path: ['confirmPassword'],
  })

export type SignUpSchemaType = z.infer<typeof signUpSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
export type EmailSchemaType = z.infer<typeof emailSchema>
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export { emailSchema, loginSchema, resetPasswordSchema, signUpSchema }
