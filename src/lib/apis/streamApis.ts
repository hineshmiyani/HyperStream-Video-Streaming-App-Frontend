import api from '@/lib/axios'
import { Stream, StreamResponse } from '@/types/streamTypes'

const getStreamByUserId = (userId: string): Promise<StreamResponse> => {
  return api.get(`/streams/u/${userId}`)
}

const updateStream = (payload: Partial<Stream>): Promise<StreamResponse> => {
  return api.put(`/streams/update-stream`, payload)
}

const generateStreamConnection = (): Promise<StreamResponse> => {
  return api.put(`/streams/generate-stream-connection`)
}

export { generateStreamConnection, getStreamByUserId, updateStream }
