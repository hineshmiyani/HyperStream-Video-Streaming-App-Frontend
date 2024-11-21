'use client'

import { useQuery } from '@tanstack/react-query'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import AuthDialog from '@/components/common/Dialog/AuthDialog'
import UserDropDown from '@/components/layout/Navbar/UserDropDown'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useIsClient from '@/hooks/common/useIsClient'
import { getCurrentUser } from '@/lib/apis/usersApis'
import { PagePath } from '@/lib/constants'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { AuthDialogTabs } from '@/types/authTypes'

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
    return <Skeleton className="ml-auto h-10 w-10 rounded-full" />
  }

  if (isFetching) {
    return <Skeleton className="ml-auto h-10 w-10 rounded-full" />
  }

  if (data) {
    return (
      <div className="flex w-1/3 items-center justify-end gap-4">
        <Button
          size="sm"
          variant="ghost"
          className="opacity-60 hover:bg-transparent hover:text-primary hover:opacity-100"
          asChild
        >
          <Link href={PagePath.DASHBOARD(data?.username)} className="flex items-center gap-2">
            <Clapperboard className="h-5 w-5" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
        </Button>
        <UserDropDown user={data} />
      </div>
    )
  }

  return (
    <div className="flex w-1/3 items-center justify-end">
      <div className="space-x-4">
        <AuthDialog defaultTab={AuthDialogTabs.Login}>
          <Button variant="ghost">Log In</Button>
        </AuthDialog>
        <AuthDialog defaultTab={AuthDialogTabs.SignUp}>
          <Button>Sign Up</Button>
        </AuthDialog>
      </div>
    </div>
  )
}

export default Actions
