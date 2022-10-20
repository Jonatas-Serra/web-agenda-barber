import React from 'react'

const Settings: React.FC = () => {
  const [selectTab, setSelectTab] = React.useState('profile')
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center mt-4">
        <ul className="hidden bg-zinc-900 text-base font-medium text-center text-zinc-50 rounded-lg divide-x divide-zinc-500 shadow-sm sm:flex ">
          <li className="w-full flex items-center">
            <button
              onClick={() => setSelectTab('profile')}
              className={`flex w-32 p-4 justify-center ${
                selectTab === 'profile' ? 'bg-orange-400' : ''
              } rounded-l-lg`}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Perfil
            </button>
          </li>
          <li className="w-full flex items-center">
            <button
              onClick={() => setSelectTab('barber')}
              className={`flex w-48 p-4 justify-center ${
                selectTab === 'barber' ? 'bg-orange-400' : ''
              } rounded-r-lg`}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                ></path>
              </svg>
              Minha Barbearia
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Settings
