'use client'

import Actions from '@/components/layout/Navbar/Actions'
import Logo from '@/components/layout/Navbar/Logo'
import Search from '@/components/layout/Navbar/Search'

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center bg-background px-6 py-3 shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default Navbar
