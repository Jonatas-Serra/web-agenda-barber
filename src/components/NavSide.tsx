import React from "react";

import { Logo } from "./Logo";
import { Link, useLocation } from 'react-router-dom';

export function NavSide() {
  const [ bg, setBg ] = React.useState('/Dash/resume');

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  }

  const handleSelect = () => {
    setBg(usePathname);
  };

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="h-screen flex flex-col py-4 px-3 bg-zinc-900">
        <div className="flex items-center py-4 justify-center mb-12">
          <Logo />
        </div>
        <div className="h-full flex flex-col justify-around">
          <ul className="space-y-2">
            <li>
                <Link
                id="resume"
                onClick={handleSelect}
                to="/Dash/resume"
                className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/resume' ? 'bg-orange-500' : ''}`}
                >
                  <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-white-100 transition duration-75 dark:text-white-100 group-hover:text-white-100 dark:group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                  </svg>
                  <span className="ml-3">Resumo</span>
                </Link>
            </li>
            <li>
                <Link id="appointments" onClick={handleSelect} to="/Dash/appointments" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/appointments' ? 'bg-orange-500' : ''}`}>
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 group-hover:text-white-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Agenda</span>
                  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-white-100 bg-zinc-700 rounded-full">3</span>
                </Link>
            </li>
            <li>
                <Link id="professions" onClick={handleSelect} to="/Dash/professions" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/professions' ? 'bg-orange-500' : ''}`}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 dark:text-white-100 group-hover:text-white-100 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Profissionais</span>
                  <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium  text-white-100 bg-zinc-700 rounded-full">Pro</span>
                </Link>
            </li>
            <li>
                <Link id="services" onClick={handleSelect} to="/Dash/services" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/services' ? 'bg-orange-500' : ''}`}>
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 group-hover:text-white-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Serviços</span>
                </Link>
            </li>
            <li>
                <Link id="products" onClick={handleSelect} to="/Dash/products" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/products' ? 'bg-orange-500' : ''}`}>
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 dark:text-white-100 group-hover:text-white-100 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Produtos</span>
                </Link>
            </li>
            <li>
                <Link id="finance" onClick={handleSelect} to="/Dash/finance" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/finance' ? 'bg-orange-500' : ''}`}>
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 group-hover:text-white-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Finanças</span>
                  <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium  text-white-100 bg-zinc-700 rounded-full">Pro</span>
                </Link>
            </li>
            <li>
                <Link id="settings" onClick={handleSelect} to="/Dash/settings" className={`flex items-center p-4 text-base font-normal text-white-100  rounded-lg hover:bg-orange-500 ${bg === '/Dash/settings' ? 'bg-orange-500' : ''}`}>
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 group-hover:text-white-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Configurações</span>

                </Link>
            </li>
          </ul>
          <ul>
            <li>
                <a className="flex items-center p-4 text-base font-normal text-white-100 rounded-lg hover:bg-orange-500">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white-100 transition duration-75 group-hover:text-white-100 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 text-white-100 whitespace-nowrap">Sair</span>
                </a>
            </li>
          </ul>
          </div>
      </div>
    </aside>
  );
}