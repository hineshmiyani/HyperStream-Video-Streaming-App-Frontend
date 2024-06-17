import { VariantProps, cva } from 'class-variance-authority'

import LiveBadge from '@/components/common/LiveBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
}

const UserAvatar = ({ username, imageUrl, isLive, showBadge, size }: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative flex gap-4">
      <Avatar
        className={cn(
          isLive && 'border border-background ring-2 ring-rose-500',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback className="uppercase">
          {username.at(0)}
          {username.at(-1)}
        </AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}

export { UserAvatarSkeleton }

export default UserAvatar
