'use client'

import { useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import UserDropDown from '@/components/layout/DashboardNavbar/UserDropDown'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useIsClient from '@/hooks/common/useIsClient'
import { getCurrentUser } from '@/lib/apis/usersApis'
import { PagePath } from '@/lib/constants'
import { getFromLocalStorage } from '@/lib/utils/storage'

const Actions = () => {
  const isClient = useIsClient()

  const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    select: (data) => data?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  // If we are on the server side, we don't want to render the UserDropDown because it will
  // cause a hydration error. Instead, we render a skeleton so that the user knows that
  // something is loading.
  if (!isClient) {
    return <Skeleton className="h-10" />
  }

  if (isFetching) {
    return <Skeleton className="h-10" />
  }

  if (data) {
    return (
      <div className="flex items-center justify-end gap-4">
        <Button
          size="sm"
          variant="ghost"
          className="opacity-60 hover:bg-transparent hover:text-primary hover:opacity-100"
          asChild
        >
          <Link href={PagePath.HOME} className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            <span>Exit</span>
          </Link>
        </Button>
        <UserDropDown user={data} />
      </div>
    )
  }
}

export default Actions
