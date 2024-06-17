import React from 'react'

import Recommended, { RecommendedSkeleton } from '@/components/layout/Sidebar/Recommended'
import Toggle, { ToggleSkeleton } from '@/components/layout/Sidebar/Toggle'
import Wrapper from '@/components/layout/Sidebar/Wrapper'

const Sidebar = async () => {
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-2 pt-4 lg:pt-0">
        <Recommended />
      </div>
    </Wrapper>
  )
}

const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-16 flex-col border-r border-[#2d2e35] bg-background lg:w-60">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}

export { SidebarSkeleton }

export default Sidebar
