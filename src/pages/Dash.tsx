import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderDash from '../components/HeaderDash'
import NavSide from '../components/NavSide'
import api from '../services/api'
import { useAuth } from '../hooks/Auth'
import { useToast } from '../hooks/Toast'

const Dash: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { signOut } = useAuth()
  const { addToast } = useToast()

  const verifyToken = () => {
    const token = localStorage.getItem('token')

    if (token) {
      api.post('auth/check', { token }).then((response) => {
        if (!response.data.success) {
          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description: 'Faça login novamente',
          })
          setTimeout(() => {
            signOut()
          }, 2000)
        }
      })
    }
  }

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
    setIsHidden(!isHidden)
  }

  const handleHiddenSideMenu = () => {
    setIsOpenMenu(false)
    setIsHidden(false)
  }

  useEffect(() => {
    verifyToken()
  }, [])

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
