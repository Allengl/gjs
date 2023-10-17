'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, CircleDollarSign, Home, User2, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';

const buttons = [
  {
    id: 'home',
    icon: <Home />,
    text: 'Home',
  },
  {
    id: 'transactions',
    icon: <ArrowLeftRight />,
    text: 'Transactions',
  },
  {
    id: 'accounts',
    icon: <User2 />,
    text: 'Accounts',
    submenus: [
      {
        id: 'submenu1',
        text: 'Submenu 1',
      },
      {
        id: 'submenu2',
        text: 'Submenu 2',
      },
    ],
  },
  {
    id: 'tax',
    icon: <CircleDollarSign />,
    text: 'Tax',
    submenus: [
      {
        id: 'submenu1',
        text: 'Submenu 1',
      },
      {
        id: 'submenu2',
        text: 'Submenu 2',
      },
    ],
  },
];

const AsideLayout = () => {
  const [activeButton, setActiveButton] = useState<string>('');
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    // 在组件加载时，根据当前页面路径来设置初始的 activeButton 状态
    const button = buttons.find((btn) => `/${btn.id}` === currentPath);
    if (button) {
      setActiveButton(button.id);
    } else {
      setActiveButton('home');
    }
  }, [currentPath]);

  const handleButtonClick = (buttonId: string) => {
    if (buttons.some((btn) => btn.id === buttonId && btn.submenus && btn.submenus.length > 0)) {
      if (openSubmenus.includes(buttonId)) {
        // 子菜单已经打开，关闭它
        setOpenSubmenus(openSubmenus.filter((submenuId) => submenuId !== buttonId));
      } else {
        // 打开子菜单
        setOpenSubmenus([...openSubmenus, buttonId]);
      }
    } else {
      // 如果点击的是没有子菜单的按钮，保持其他子菜单关闭
      setOpenSubmenus([]);
    }
    // router.push(`/${buttonId}`);
  };

  return (
    <aside className="sticky h-screen w-1/6 bg-gray-100 text-gray-800 p-4">
      <div className="flex items-center mb-4 space-x-1">
        <img
          src="https://i.postimg.cc/66kPCQ8J/gl.png"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-lg font-medium">Acme</h1>
      </div>
      <nav className="space-y-2">
        {buttons.map((button) => (
          <div key={button.id}>
            <button
              className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg text-gray-500 ${activeButton === button.id ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
              onClick={() => handleButtonClick(button.id)}
            >
              {button.submenus ? (
                <div className="flex items-center">
                  {openSubmenus.includes(button.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div className="w-4 h-4" /> {/* 占位空间 */}
                  {button.icon}
                  <span className="text-sm ml-2 font-medium">{button.text}</span>
                </div>
              ) : (
                <>
                  <div className="w-6 h-6" /> {/* 占位空间 */}
                  {button.icon}
                  <span className="text-sm ml-2 font-medium">{button.text}</span>
                </>
              )}
            </button>
            {button.submenus && openSubmenus.includes(button.id) && (
              <div className="pl-16 mt-2 space-y-2">
                {button.submenus.map((submenu) => (
                  <button
                    key={submenu.id}
                    className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg text-gray-500 ${activeButton === submenu.id ? 'bg-gray-200' : 'hover:bg-gray-200'
                      }`}
                    onClick={() => handleButtonClick(submenu.id)}
                  >
                    {submenu.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AsideLayout;
