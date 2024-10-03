import { z } from 'zod'

const blockSchema = z.object({
  userId: z.string().optional(),
  otherUserId: z.string(),
})

export type BlockSchemaType = z.infer<typeof blockSchema>

export { blockSchema }
