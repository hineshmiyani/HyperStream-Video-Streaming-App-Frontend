'use client'

import { FollowingSkeleton } from '@/components/layout/Sidebar/Following'
import { RecommendedSkeleton } from '@/components/layout/Sidebar/Recommended'
import { ToggleSkeleton } from '@/components/layout/Sidebar/Toggle'
import useIsClient from '@/hooks/common/useIsClient'
import { isCollapsed } from '@/lib/redux/features/sidebar/sidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

type WrapperProps = {
  children: React.ReactNode
}
const Wrapper = ({ children }: WrapperProps) => {
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const isClient = useIsClient()

  // Renders a skeleton UI for the sidebar if the component is being rendered on the server side.
  if (!isClient) {
    return (
      <aside className="fixed left-0 z-50 flex h-full w-16 flex-col bg-background transition-all duration-200 ease-in-out lg:w-60">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

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
