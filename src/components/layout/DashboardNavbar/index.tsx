'use client'

import Actions from '@/components/layout/DashboardNavbar/Actions'
import Logo from '@/components/layout/DashboardNavbar/Logo'

const DashboardNavbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-between bg-background px-6 py-3 shadow-sm">
      <Logo />
      <Actions />
    </nav>
  )
}

export default DashboardNavbar
