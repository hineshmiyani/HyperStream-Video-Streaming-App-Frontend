'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import ToggleCard, { ToggleCardSkeleton } from '@/components/pages/dashboard/chat/ToggleCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getStreamByUserId } from '@/lib/apis/streamApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

const ChatPage = () => {
  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const { data: stream, isLoading: isStreamLoading } = useQuery({
    queryKey: ['stream', currentUser?.id],
    queryFn: () => getStreamByUserId(currentUser?.id as string),
    select: (data) => data?.data,
    enabled: !!currentUser?.id,
  })

  if (!stream) {
    return null
  }

  if (isStreamLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-10 w-[200px]" />
        <div className="space-y-4">
          {new Array(3).fill('-').map((_, i) => (
            <ToggleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>

      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="Enable chat" value={stream?.isChatEnabled} />
        <ToggleCard field="isChatDelayed" label="Delay chat" value={stream?.isChatDelayed} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream?.isChatFollowersOnly}
        />
      </div>
    </div>
  )
}

export default ChatPage
