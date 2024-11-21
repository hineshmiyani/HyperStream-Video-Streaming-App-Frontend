export type Stream = {
  id: string
  name: string
  thumbnailUrl: string | null
  ingressId: string | null
  serverUrl: string | null
  streamKey: string | null
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
