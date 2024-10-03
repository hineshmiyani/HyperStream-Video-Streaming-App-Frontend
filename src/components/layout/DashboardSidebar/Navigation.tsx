'use client'

import { useQuery } from '@tanstack/react-query'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

import NavItem, { NavItemSkeleton } from '@/components/layout/DashboardSidebar/NavItem'
import { PagePath } from '@/lib/constants'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

const Navigation = () => {
  const pathname = usePathname()

  const { data: user } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {Array(4)
          .fill('_')
          .map((_, i) => (
            <NavItemSkeleton key={i} />
          ))}
      </ul>
    )
  }

  const routes = [
    {
      label: 'Stream',
      href: PagePath.DASHBOARD(user?.username),
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: PagePath.KEYS(user?.username),
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: PagePath.CHAT(user?.username),
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: PagePath.COMMUNITY(user?.username),
      icon: Users,
    },
  ]

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  )
}

export default Navigation
