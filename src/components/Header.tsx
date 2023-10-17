import React, { FC } from 'react'

interface HeaderProps {
  category: string,
  title: string
}

const Header: FC<HeaderProps> = ({ category, title }) => {
  return (
    <div className='mb-10'>
      <p className='text-gray-400'>
        {category}
      </p>
      <p className='text-3xl font-extrabold
        tracking-tight text-slate-900'>
        {title}
      </p>
    </div>
  )
}

export default Header
