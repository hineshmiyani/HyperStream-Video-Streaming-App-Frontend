import { cn } from '@/lib/utils'

type LiveBadgeProps = {
  className?: string
}

const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-md border border-background bg-rose-500 px-1.5 text-center text-[10px] font-semibold uppercase tracking-wide',
        className
      )}
    >
      Live
    </div>
  )
}

export default LiveBadge
