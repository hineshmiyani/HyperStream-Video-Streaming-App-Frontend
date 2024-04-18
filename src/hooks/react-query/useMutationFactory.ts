import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { useEffect, useId } from 'react'
import { toast } from 'sonner'

type ToastMessages = {
  loading: string
  success: string
  error: string
}

const useMutationFactory = <
  TData extends TApiResponse,
  TError extends TApiError,
  TVariables = void,
  TContext = unknown,
>(
  { onSuccess, onError, ...options }: UseMutationOptions<TData, TError, TVariables, TContext>,
  toastMessages?: Partial<ToastMessages>
) => {
  const toastId = useId()

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onSuccess: (...args) => {
      if (onSuccess) {
        onSuccess(...args)
      }

      const [data] = args

      toast.success(toastMessages?.success ?? data?.message, { id: toastId })
    },
    onError: (...args) => {
      if (onError) {
        onError(...args)
      }

      const [error] = args

      toast.error(error?.error?.name || 'Error', {
        description: toastMessages?.error ?? error?.error?.message,
        id: toastId,
      })
    },
  })

  const { isPending } = mutation

  useEffect(() => {
    if (!isPending) return

    toast.loading(toastMessages?.loading ?? 'Processing your request, please wait...', {
      id: toastId,
    })
  }, [isPending])

  return mutation
}

export default useMutationFactory
