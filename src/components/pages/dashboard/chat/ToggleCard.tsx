'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { useMutationFactory } from '@/hooks/react-query'
import { updateStream } from '@/lib/apis/streamApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

type ToggleCardProps = {
  label: string
  value: boolean
  field: FieldTypes
}

const ToggleCard = ({ label, value = false, field }: ToggleCardProps) => {
  const queryClient = useQueryClient()

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const updateStreamMutation = useMutationFactory(
    {
      mutationFn: updateStream,
    },
    {
      success: 'Chat settings updated.',
    }
  )

  const onChange = async () => {
    await updateStreamMutation.mutateAsync({ [field]: !value })
    await queryClient.fetchQuery({
      queryKey: ['stream', currentUser?.id],
    })
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="shrink-0 font-semibold">{label}</p>
        <div className="space-y-2">
          <Switch checked={value} onCheckedChange={onChange}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  )
}

const ToggleCardSkeleton = () => {
  return <Skeleton className="w-full rounded-xl p-10" />
}

export { ToggleCardSkeleton }

export default ToggleCard
