import { Suspense } from 'react'

import Navbar from '@/components/layout/Navbar'
import Sidebar, { SidebarSkeleton } from '@/components/layout/Sidebar'
import Container from '@/components/pages/home/Container'

type BrowseLayoutProps = {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-[60px]">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default BrowseLayout
