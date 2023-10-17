import React, { FC } from 'react'

interface ButtonProps {
  icon?: React.ReactNode,
  bgColor?: string,
  bgHoverColor?: string,
  width?: string,
  color?: string
  size?: string
  text?: string
  borderRadius?: string
  

}

const Button: FC<ButtonProps> = ({ icon, bgColor, bgHoverColor,width, color, size, text, borderRadius }) => {
  return (
    <button
      type='button'
      style={{ backgroundColor: bgColor, color: color, borderRadius: borderRadius }}
      className={`text-${size} w-${width} p-3 hover:drop-shadow-xl `}
    >
      {text}
    </button>
  )
}

export default Button
