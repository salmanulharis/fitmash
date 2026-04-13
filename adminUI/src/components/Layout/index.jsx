import { NavLink, Outlet } from "react-router-dom";
import DashboardIcon from "../../assets/Icons/DashboardIcon";
import TenantsIcon from "../../assets/Icons/TenantsIcon";
import TagIcon from "../../assets/Icons/TagIcon";
import SyncIcon from "../../assets/Icons/SyncIcon";
import CardIcon from "../../assets/Icons/CardIcon";
import ChartLineIcon from "../../assets/Icons/ChartLineIcon";
import GearIcon from "../../assets/Icons/GearIcon";
import "./style.css";

export default function Layout() {
  return (
    <div className="layout">
      <div className="nav-container">
        <div className="nav-header">
          <h1>Fitmash</h1>
        </div>
        <div className="navbar-container">
          <nav className="navbar">
            <NavLink to="/" end>
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <DashboardIcon />
                  Dashboard
                </span>
              )}
            </NavLink>

            <NavLink to="/tenants">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <TenantsIcon />
                  Tenants(Gyms)
                </span>
              )}
            </NavLink>

            <NavLink to="/saas-plans">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <TagIcon />
                  Saas Plans
                </span>
              )}
            </NavLink>

            <NavLink to="/subscriptions">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <SyncIcon />
                  Subscriptions
                </span>
              )}
            </NavLink>

            <NavLink to="/payments">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <CardIcon />
                  Payments
                </span>
              )}
            </NavLink>

            <NavLink to="/analytics">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <ChartLineIcon />
                  Analytics
                </span>
              )}
            </NavLink>
            <NavLink to="/settings">
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  <GearIcon />
                  Settings
                </span>
              )}
            </NavLink>
          </nav>
        </div>
        
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