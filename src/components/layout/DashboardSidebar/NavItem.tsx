'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { isCollapsed } from '@/lib/redux/features/sidebar/creatorSidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

type NavItemProps = {
  label: string
  icon: LucideIcon
  href: string
  isActive: boolean
}

const NavItem = ({ label, icon: Icon, href, isActive }: NavItemProps) => {
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  return (
    <Button
      variant="ghost"
      className={cn(
        'h-12 w-full',
        isSidebarCollapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('h-4 w-4', isSidebarCollapsed ? 'mr-0' : 'mr-2')} />
          {!isSidebarCollapsed ? <span>{label}</span> : null}
        </div>
      </Link>
    </Button>
  )
}

const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-2">
      <Skeleton className="min-h-12 min-w-12 rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}

export { NavItemSkeleton }

export default NavItem
