// import Link from 'next/link'
// import React from 'react'
// import { buttonVariants } from './ui/button'
// import { Flame } from 'lucide-react'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import UserAccountnav from './UserAccountnav'

// const Navbar = async () => {
//   const session = await getServerSession(authOptions)
//   return (
//     <div
//       className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'
//     >
//       <div className="container flex items-center justify-between">
//         <Link href='/'>
//           <Flame />
//         </Link>
//         {session?.user ? (
//           <UserAccountnav />
//         ) : (
//           <Link className={buttonVariants()} href='/sign-in'>
//             Sign in
//           </Link>
//         )}
//       </div>
//     </div >
//   )
// }

// export default Navbar
'use client'

import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FC } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Bell, BellDot, ChevronDown, Menu, MessageSquare, ShoppingCart } from 'lucide-react';


interface NavButtonProps {
  title: string,
  customFunc: () => void,
  icon: React.ReactNode,
  color: string,
  dotColor?: string
}

const NavButton: FC<NavButtonProps> = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={() => customFunc()}
          style={{ color }}
          className="navbutton relative text-xl rounded-full p-3 hover:bg-light-gray"
          data-pr-tooltip={title}    >
          <span
            style={{ background: dotColor }}
            className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
          />
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, screenSize, setScreenSize } = useStateContext();


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize! <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  const currentColor = '#4ade80';


  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<Menu />} />
      <div className="flex">
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<ShoppingCart />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<MessageSquare />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<Bell />} />
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{' '}
            <span className="text-gray-400 font-bold ml-1 text-14">
              Admin
            </span>
          </p>
          <ChevronDown className="text-gray-400 text-14" />
        </div>
        {/* {isClicked.cart && (<Cart />)}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)} */}
      </div>
    </div>
  );
};

export default Navbar
