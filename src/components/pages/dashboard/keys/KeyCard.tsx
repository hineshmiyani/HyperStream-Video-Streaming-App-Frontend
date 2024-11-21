'use client'

import React, { useState } from 'react'

import CopyButton from '@/components/pages/dashboard/keys/CopyButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type KeyCardProps = {
  streamKey: string | null
}

const KeyCard = ({ streamKey }: KeyCardProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false)

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="w-24 shrink-0 font-semibold">Stream Key</p>

        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input
              type={isPasswordShow ? 'text' : 'password'}
              value={streamKey || ''}
              placeholder="Stream Key"
              disabled
            />
            <CopyButton value={streamKey || ''} />
          </div>

          <Button
            size="sm"
            variant="link"
            className="text-foreground"
            onClick={() => setIsPasswordShow((isPasswordShow) => !isPasswordShow)}
          >
            {isPasswordShow ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default KeyCard
