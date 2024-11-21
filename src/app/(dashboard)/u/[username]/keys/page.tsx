'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import ConnectDialog from '@/components/common/Dialog/ConnectDialog'
import KeyCard from '@/components/pages/dashboard/keys/KeyCard'
import UrlCard from '@/components/pages/dashboard/keys/UrlCard'
import { getStreamByUserId } from '@/lib/apis/streamApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

const KeysPage = () => {
  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const { data: stream } = useQuery({
    queryKey: ['stream', currentUser?.id],
    queryFn: () => getStreamByUserId(currentUser?.id as string),
    select: (data) => data?.data,
    enabled: !!currentUser?.id,
  })

  if (!stream) {
    return null
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectDialog />
      </div>

      <div className="space-y-4">
        <UrlCard serverUrl={stream?.serverUrl} />
        <KeyCard streamKey={stream?.streamKey} />
      </div>
    </div>
  )
}

export default KeysPage
