import { useEffect, useState } from 'react'

/**
 * Returns a boolean indicating whether or not the code is running on the client-side
 * @returns {boolean}
 */
const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(typeof window !== 'undefined')
  }, [])

  return isClient
}

export default useIsClient
