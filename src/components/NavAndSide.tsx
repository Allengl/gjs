'use client'
import React from 'react'
import { Navbar, Sidebar } from '.';
import { useStateContext } from '@/contexts/ContextProvider';
import { FC } from 'react';

interface NavAndSideProps {
  children?: React.ReactNode
}

const NavAndSide: FC<NavAndSideProps> = ({ children }) => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className={`fixed top-0 left-0 h-full ${activeMenu ? 'w-72' : 'w-0'} transition-all duration-200 dark:bg-secondary-dark-bg bg-white`}>
        <Sidebar />
      </div>

      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
        }
      >
        <div className="fixed md:static top-0 left-0 w-full z-10 bg-main-bg dark:bg-main-dark-bg navbar">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default NavAndSide
