'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import Hint from '@/components/common/Hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { isCollapsed, onCollapse, onExpand } from '@/lib/redux/features/sidebar/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

const Toggle = () => {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const label = isSidebarCollapsed ? 'Expand' : 'Collapse'

  return (
    <>
      {isSidebarCollapsed ? (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button className="h-auto p-2" variant="ghost" onClick={() => dispatch(onExpand())}>
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold">For you</p>

          <div className="ml-auto">
            <Hint label={label} side="right" asChild>
              <Button className="h-auto p-2" variant="ghost" onClick={() => dispatch(onCollapse())}>
                <ArrowLeftFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        </div>
      )}
    </>
  )
}

const ToggleSkeleton = () => {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}

export { ToggleSkeleton }

export default Toggle
