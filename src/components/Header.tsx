import { Link } from 'react-router-dom';
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="py-4 flex items-center justify-around bg-zinc-900 ">
      <Logo />
      <nav className="flex mx-6 md:mx-10 lg:mx-14">
        <ul className="hidden md:flex md:mr-10 text-xl ">
          <Link to="/" className="mr-8 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80"><a href="">Home</a></Link>
          <li className="mr-8 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80"><a href="">Como funciona</a></li>
          <li className="mr-8 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80"><a href="">Sobre</a></li>
          <li className="mr-8 hover:text-orange-500 transition-colors duration-500 disabled:opacity-80"><a href="">Contato</a></li>
        </ul>
        <Link className="ml-8 text-center text-base font-extrabold bg-orange-400 w-28 p-2 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50" to="/LoginClient">Login</Link>
      </nav>
    </header>
  );
}
