'use client'

import { CheckCheck, Copy } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

type CopyButtonPros = {
  value: string | null
}

const CopyButton = ({ value }: CopyButtonPros) => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = () => {
    if (!value) return

    setIsCopied(true)
    navigator.clipboard.writeText(value)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const Icon = isCopied ? CheckCheck : Copy

  return (
    <Button variant="ghost" size="sm" onClick={onCopy} disabled={!value || isCopied}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}

export default CopyButton
