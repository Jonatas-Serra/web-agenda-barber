import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/Auth'
import api from '../services/api'

interface UserAuth {
  _id: string
}
interface User {
  name: string
  email: string
  image_url: string
}

interface HeaderDashProps {
  handleMenu: () => void
  isHidden: boolean
}

const HeaderDash: React.FC<HeaderDashProps> = ({ handleMenu, isHidden }) => {
  const [Title, setTitle] = useState('Resumo')
  const [IsOpen, setIsOpen] = useState(false)
  const [barber, setBarber] = useState<User>({} as User)
  const { signOut } = useAuth()
  const user = useAuth().user as UserAuth
  const token = localStorage.getItem('@AgendaBarber:token')

  const location = useLocation()

  const getbarber = async () => {
    const response = await api.get(`barbers/${user._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setBarber(response.data)
  }

  useEffect(() => {
    getbarber()
    switch (location.pathname) {
      case '/Dash/resume':
        setTitle('Resumo')
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
    <div className="flex flex-col w-full bg-zinc-900 h-[80px] py-2">
      <div className="flex flex-row justify-between items-center h-full px-8 lg:px-10">
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
        <div className="flex items-center justify-center">
          <div className="mr-4 mt-7 text-orange-400">
            <button className="">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <div className="text-zinc-50 inline-flex justify-center relative -top-11 -right-3 items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                2
              </div>
            </button>
          </div>
          <div className={`flex-col justify-center items-center`}>
            <div className="flex">
              <button
                onClick={() => setIsOpen(!IsOpen)}
                className="flex items-center text-sm font-medium text-zinc-50 rounded-full hover:text-orange-500 md:mr-0 focus:ring-2 focus:ring-gray-100 dark:focus:ring-orange-500"
              >
                <img
                  className="mr-2 w-12 h-12 rounded-full"
                  src={barber?.image_url}
                  alt="user photo"
                ></img>
                {barber?.name}
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
            </div>
            <div className="relative">
              <div
                className={`flex-col ${
                  IsOpen ? '' : 'hidden'
                }  z-10 w-full divide-y rounded-xl mt-2 shadow bg-zinc-900 divide-gray-800 absolute  origin-top-right bg-white ring-1 ring-orange-500 focus:outline-none" `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
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
      </div>
    </div>
  )
}

export default HeaderDash
