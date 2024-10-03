import React from 'react'

import Navigation from '@/components/layout/DashboardSidebar/Navigation'
import Toggle from '@/components/layout/DashboardSidebar/Toggle'
import Wrapper from '@/components/layout/DashboardSidebar/Wrapper'

const DashboardSidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}

export default DashboardSidebar
