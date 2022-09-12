import { Outlet } from "react-router-dom";
import { NavSide } from "../components/NavSide";

export function Dashboard() {
  return (
    <main className="h-full flex bg-zinc-300">
      <NavSide />
        <Outlet />
    </main>
  );
}
