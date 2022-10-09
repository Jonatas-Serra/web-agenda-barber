import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/Auth'

interface User {
  name: string
  email: string
}

interface HeaderDashProps {
  handleMenu: () => void
  isHidden: boolean
}

const HeaderDash: React.FC<HeaderDashProps> = ({ handleMenu, isHidden }) => {
  const [Title, setTitle] = React.useState('Resume')
  const [IsOpen, setIsOpen] = React.useState(false)
  const { user } = useAuth() as { user: User }
  const { signOut } = useAuth()

  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case '/Dash/resume':
        setTitle('Resume')
        break
      case '/Dash/appointments':
        setTitle('Agenda')
        break
      case '/Dash/stylist':
        setTitle('Profissionais')
        break
      case '/Dash/services':
        setTitle('Serviços')
        break
      case '/Dash/products':
        setTitle('Produtos')
        break
      case '/Dash/finance':
        setTitle('Financeiro')
        break
      case '/Dash/settings':
        setTitle('Configurações')
        break
      default:
        setTitle('Resume')
        break
    }
  }, [location])

  return (
    <div className="flex flex-col w-full bg-zinc-900 h-[80px]">
      <div className="flex flex-row justify-between items-center h-full px-6">
        <h3 className="hidden sm:flex font-bold text-2xl text-center">
          {Title}
        </h3>
        <button
          onClick={() => {
            handleMenu()
          }}
          type="button"
          className={`${
            isHidden ? 'hidden' : ''
          } inline-flex items-center justify-center p-2 text-sm text-zinc-50 rounded-lg sm:hidden hover:bg-orange-500`}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={`relative ${IsOpen ? 'top-11' : ''}`}>
          <button
            onClick={() => setIsOpen(!IsOpen)}
            id="dropdownAvatarNameButton"
            data-dropdown-toggle="dropdownAvatarName"
            className="flex items-center text-sm font-medium text-zinc-50 rounded-full hover:text-orange-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-orange-500"
            type="button"
          >
            <img
              className="mr-2 w-12 h-12 rounded-full"
              src="https://img.freepik.com/premium-vector/vintage-barbershop-logo-template_441059-26.jpg?w=2000"
              alt="user photo"
            ></img>
            {user?.name}
            <svg
              className="w-4 h-4 mx-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              IsOpen ? '' : 'hidden'
            } relative top-2 left-11 z-10 w-44 divide-y rounded-xl  shadow bg-zinc-900 divide-gray-800`}
          >
            <ul className="w-full h-full text-sm text-zinc-50">
              <li className="hover:bg-zinc-700 rounded-xl">
                <Link
                  to={'settings'}
                  onClick={() => setIsOpen(false)}
                  className="text-center w-full block py-2 px-4  hover:text-orange-500"
                >
                  Configurações
                </Link>
              </li>
            </ul>
            <div className="py-1 rounded-xl outline-2 hover:bg-zinc-700 ">
              <button
                onClick={signOut}
                className="w-full block py-2 px-4 text-sm text-zinc-50  hover:text-orange-500"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderDash
