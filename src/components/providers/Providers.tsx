import React from 'react'

import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import StoreProvider from '@/components/providers/StoreProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" forcedTheme="dark" storageKey="hyperstream-theme">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default Providers
