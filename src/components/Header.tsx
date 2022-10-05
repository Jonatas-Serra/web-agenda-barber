import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="flex w-full bg-zinc-900 items-center justify-center mb-4">
      <nav className="flex w-full mt-4 sm:py-4 sm:px-6 mx-auto items-center justify-around">
        <div className="min-w-[70px]">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="hidden lg:flex">
          <Link
            to="/"
            className="text-sm xl:text-lg mr-4 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80"
          >
            <a href="">Home</a>
          </Link>
          <li className=" text-sm xl:text-lg mr-4 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80">
            <a href="#howtowork">Como funciona</a>
          </li>
          <li className="text-sm xl:text-lg mr-4 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80">
            <a href="#about">Sobre</a>
          </li>
          <li className="text-sm xl:text-lg mr-4 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80">
            <a href="#partner">Seja um parceiro</a>
          </li>
          <li className="text-sm xl:text-lg mr-4 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80">
            <a href="">Contato</a>
          </li>
        </ul>
        <div className="flex-col justify-center sm:flex sm:flex-row md:ml-2 sm:justify-between min-w-[100px]">
          <div className="mb-4 sm:mb-0">
            <Link
              className="text-center text-xs py-2 h-2 px-4 sm:mb-0 xl:text-base font-extrabold bg-orange-500 sm:h-10 sm:py-3 sm:px-4 rounded-lg"
              to="/Login"
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              className="text-center text-xs py-2 h-2 px-4 xl:text-base font-extrabold bg-orange-500 sm:h-10 sm:py-3 sm:px-4 sm:ml-4 rounded-lg"
              to="/SignUp"
            >
              Ser parceiro
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
