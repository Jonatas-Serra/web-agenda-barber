import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderDash from '../components/HeaderDash'
import NavSide from '../components/NavSide'

const Dash: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
    setIsHidden(!isHidden)
  }

  return (
    <main className="h-full flex bg-zinc-300">
      <div className={`${isOpenMenu ? 'flex' : 'hidden'} sm:flex`}>
        <NavSide handleMenu={handleMenu} />
      </div>

      <div className="flex flex-col w-full">
        <HeaderDash handleMenu={handleMenu} isHidden={isHidden} />
        <Outlet />
      </div>
    </main>
  )
}

export default Dash
