export type Stream = {
  id: string
  name: string
  thumbnailUrl?: string
  ingressId?: string
  serverUrl?: string
  streamKey?: string
  isLive: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export type StreamResponse = TApiResponse & {
  data: Stream
}
