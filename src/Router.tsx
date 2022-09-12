import { Routes, Route } from "react-router-dom";
import { Launch } from "./pages/Launch";
import { Login } from "./pages/Login";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dash";
import { Resume } from "./components/Resume";
import { Appointments } from "./components/Apointments";
import { Professions } from "./components/Professions";
import { Services } from "./components/Services";
import { Products } from "./components/Products";
import { Finance } from "./components/Finance";
import { Settings } from "./components/Settings";

export function Router() {
  return (
      <Routes>
          <Route path="/" element={<Launch />}/>
          <Route path="/Login/*" element={<Login />}/>
          <Route path="/SignIn/*" element={<SignIn />}/>
          <Route path="/Dash/" element={<Dashboard />}>
            <Route path="resume" element={<Resume />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="professions" element={<Professions />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="finance" element={<Finance />} />
            <Route path="settings" element={<Settings />} />
          </Route>
      </Routes>
  );
}