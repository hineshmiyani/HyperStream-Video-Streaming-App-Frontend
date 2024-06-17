'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import LiveBadge from '@/components/common/LiveBadge'
import UserAvatar from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { isCollapsed } from '@/lib/redux/features/sidebar/sidebarSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

type UserItemProps = {
  username: string
  imageUrl: string
  isLive?: boolean
}

const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname()

  const isSidebarCollapsed = useAppSelector(isCollapsed)

  const href = `/${username}`
  const isActive = pathname === href

  return (
    <>
      <Button
        asChild
        variant="ghost"
        className={cn(
          'h-12 w-full',
          isSidebarCollapsed ? 'justify-center' : 'justify-start',
          isActive && 'bg-accent'
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              'flex w-full items-center gap-x-4',
              isSidebarCollapsed && 'justify-center'
            )}
          >
            <UserAvatar username={username} imageUrl={imageUrl} isLive={isLive} />

            {!isSidebarCollapsed && <p className="truncate">{username}</p>}

            {!isSidebarCollapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
        </Link>
      </Button>
    </>
  )
}

const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-2 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}

export { UserItemSkeleton }

export default UserItem
