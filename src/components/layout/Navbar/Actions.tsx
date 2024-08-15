'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import AuthDialog from '@/components/common/Dialog/AuthDialog'
import UserDropDown from '@/components/layout/Navbar/UserDropDown'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/apis/usersApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { AuthDialogTabs } from '@/types/authTypes'

const Actions = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    select: (data) => data?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  if (isFetching) {
    return null
  }

  if (data) {
    return (
      <div className="flex w-1/3 items-center justify-end">
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
