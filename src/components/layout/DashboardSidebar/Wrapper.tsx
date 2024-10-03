'use client'

import React from 'react'

import { isCollapsed } from '@/lib/redux/features/sidebar/creatorSidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

type WrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-16 flex-col bg-background transition-all duration-200 ease-in-out lg:w-60',
        isSidebarCollapsed && 'lg:w-16'
      )}
    >
      {children}
    </aside>
  )
}

export default Wrapper
