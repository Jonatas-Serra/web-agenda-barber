import { Outlet } from 'react-router-dom'
import HeaderDash from '../components/HeaderDash'
import { NavSide } from '../components/NavSide'

export function Dashboard() {
  return (
    <main className="h-full flex bg-zinc-300">
      <NavSide />
      <div className="flex flex-col w-full">
        <HeaderDash />
        <Outlet />
      </div>
    </main>
  )
}
