'use client'
import React, { use } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Settings } from 'lucide-react'

const TooltipComponent = () => {
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-6 bottom-6" style={{ zIndex: '1000' }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button type="button" className="text-3xl text-white p-3 hover:drop-shadow-xl 
          hover:bg-light-gray" style={{ background: '#4ade80', borderRadius: '50%' }} >
                <Settings/>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default TooltipComponent
