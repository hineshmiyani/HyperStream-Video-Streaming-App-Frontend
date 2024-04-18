import React from 'react'

import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" storageKey="hyperstream-theme">
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}

export default Providers
