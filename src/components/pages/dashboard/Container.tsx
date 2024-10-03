'use client'

import React, { useEffect } from 'react'

import useMediaQuery from '@/hooks/common/useMediaQuery'
import { isCollapsed, onCollapse, onExpand } from '@/lib/redux/features/sidebar/creatorSidebarSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  const isDesktopScreen = useMediaQuery('(min-width: 1024px)')

  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isDesktopScreen) {
      dispatch(onExpand())
    } else {
      dispatch(onCollapse())
    }
  }, [isDesktopScreen])

  return (
    <div className={cn('flex-1', isSidebarCollapsed ? 'ml-16' : 'ml-16 lg:ml-60')}>{children}</div>
  )
}

export default Container
