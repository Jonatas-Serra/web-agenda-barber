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

  const handleHiddenSideMenu = () => {
    setIsOpenMenu(false)
    setIsHidden(false)
  }

  return (
    <main className="h-screen flex bg-zinc-300">
      <div className={`${isOpenMenu ? 'flex' : 'hidden'} sm:flex`}>
        <NavSide
          handleMenu={handleMenu}
          isHidden={isHidden}
          handleHiddenSideMenu={handleHiddenSideMenu}
        />
      </div>

      <div
        className={`${
          isHidden ? 'hidden' : 'flex flex-col w-full'
        }  h-full overflow-y-auto`}
      >
        <HeaderDash handleMenu={handleMenu} isHidden={isHidden} />
        <Outlet />
      </div>
    </main>
  )
}

export default Dash
