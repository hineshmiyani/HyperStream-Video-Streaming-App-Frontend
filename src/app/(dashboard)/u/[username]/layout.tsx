'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

import DashboardNavbar from '@/components/layout/DashboardNavbar'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import Container from '@/components/pages/dashboard/Container'
import { getCurrentUserByUsername } from '@/lib/apis/usersApis'
import { PagePath } from '@/lib/constants'

type CreatorLayoutProps = {
  params: {
    username: string
  }
  children: React.ReactNode
}

const CreatorLayout = ({ params, children }: CreatorLayoutProps) => {
  const router = useRouter()

  const { data: userId, isFetching } = useQuery({
    queryKey: ['user', params?.username],
    queryFn: () => getCurrentUserByUsername(params?.username),
    select: (data) => data?.data?.id,
    enabled: !!params?.username,
  })

  if (!isFetching && !userId) {
    router.push(PagePath.HOME)
  }

  return (
    <div>
      <DashboardNavbar />
      <div className="flex h-full pt-[60px]">
        <DashboardSidebar />
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default CreatorLayout
