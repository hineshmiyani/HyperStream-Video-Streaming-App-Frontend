import { idSchema } from '@/lib/validators/common.schema'
import { z } from 'zod'

const followSchema = z.object({
  followerId: idSchema.optional(),
  followingId: idSchema,
})

export type FollowSchemaType = z.infer<typeof followSchema>

export { followSchema }
