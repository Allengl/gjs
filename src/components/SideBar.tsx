
'use client'
import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Link from 'next/link';
import { BiLogoFirebase } from 'react-icons/bi';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [activeLinkName, setActiveLinkName] = useState<string>('expenseBill');


  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const isActive = false;


  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <BiLogoFirebase className="text-2xl"/> 
                <span>Alyx</span>
            </Link>
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link
                    href={`/${link.name}`}
                    key={link.name}
                    onClick={()=>{
                      handleCloseSideBar(),
                      setActiveLinkName(link.name)
                    }}
                    style={{ 
                      backgroundColor: activeLinkName === link.name ? '#f9f9fa' : '',
                    }}
                    className={(({ isActive }: { isActive: boolean }): string =>
                      isActive ? activeLink : normalLink
                    )({ isActive })}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.description}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
