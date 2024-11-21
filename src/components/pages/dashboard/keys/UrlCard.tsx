'use client'

import CopyButton from '@/components/pages/dashboard/keys/CopyButton'
import { Input } from '@/components/ui/input'

type UrlCardProps = {
  serverUrl: string | null
}

const UrlCard = ({ serverUrl }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="w-24 shrink-0 font-semibold">Server URL</p>

        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input value={serverUrl || ''} placeholder="Server URL" disabled />
            <CopyButton value={serverUrl || ''} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrlCard
