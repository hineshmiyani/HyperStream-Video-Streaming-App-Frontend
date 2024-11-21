'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutationFactory } from '@/hooks/react-query'
import { generateStreamConnection } from '@/lib/apis/streamApis'
import { getFromLocalStorage } from '@/lib/utils/storage'
import { UserResponse } from '@/types/userTypes'

const ConnectDialog = () => {
  const queryClient = useQueryClient()

  const closeButtonRef = React.useRef<HTMLButtonElement>(null)

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    select: (data) => (data as UserResponse)?.data,
    enabled: !!getFromLocalStorage('accessToken'),
  })

  const generateStreamConnectionMutation = useMutationFactory({
    mutationFn: generateStreamConnection,
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['stream', currentUser?.id],
      })
      closeButtonRef?.current?.click()
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate connection</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            {/* <SelectItem value="WHIP">WHIP</SelectItem> */}
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="h-4 w-4" />

          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>

        <div className="flex justify-end gap-5">
          <DialogClose>
            <Button variant="ghost" ref={closeButtonRef}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={generateStreamConnectionMutation?.isPending}
            onClick={() => generateStreamConnectionMutation?.mutate()}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectDialog
