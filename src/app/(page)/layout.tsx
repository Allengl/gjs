import { ToolTipComponent } from '@/components'
import NavAndSide from '@/components/NavAndSide'
import React from 'react'

export const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavAndSide>
        {children}
      </NavAndSide>
      {/* <ToolTipComponent /> */}
    </div>
  )
}

export default PagesLayout
