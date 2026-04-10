import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

export default function Layout() {
  return (
    <div className="layout">
      <div className="nav-container">
        <div className="nav-header">
          <h1>Admin Dashboard</h1>
        </div>
        <nav className="navbar">
          <NavLink to="/" end>
            {({ isActive }) => (
              <span className={isActive ? "nav-active" : ""}>Home</span>
            )}
          </NavLink>

          <NavLink to="/about">
            {({ isActive }) => (
              <span className={isActive ? "nav-active" : ""}>About</span>
            )}
          </NavLink>

          <NavLink to="/contact">
            {({ isActive }) => (
              <span className={isActive ? "nav-active" : ""}>Contact</span>
            )}
          </NavLink>

          <NavLink to="/dashboard">
            {({ isActive }) => (
              <span className={isActive ? "nav-active" : ""}>Dashboard</span>
            )}
          </NavLink>
        </nav>
        <div className="nav-footer">
          <p>&copy; 2024 FitMash. All rights reserved.</p>
        </div>
      </div>
      

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}