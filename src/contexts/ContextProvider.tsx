'use client'
import React, { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';


const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}
type ActiveMenuSetter = ((prev: boolean) => boolean) | boolean;


// 创建一个 context
const StateContext = createContext({
  activeMenu: true,
  setActiveMenu: (activeMenu: ActiveMenuSetter) => { },
  isClicked: initialState,
  setIsClicked: (isClicked: typeof initialState) => { },
  handleClick: (clicked: string) => { },
  screenSize: 0,
  setScreenSize: (screenSize: number) => { },
  currentColor: '#03C9D7',
  currentMode: 'Light',
});


// 在一个组件中提供这个 context
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(0);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');

  const handleClick = (clicked: string) => {
    setIsClicked({ ...initialState, [clicked]: true })
  }

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)

