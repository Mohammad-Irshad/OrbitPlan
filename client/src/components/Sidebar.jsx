import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="card mt-5  py-2 ps-1 border-success">
      <div className="card-body">
        <nav className="nav flex-column">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-success  fw-medium fst-italic"
                : "nav-link text-black"
            }
          >
            <i className="fa-solid fa-table-columns"></i> Dashboard
          </NavLink>
          <NavLink
            to={"/projects"}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-success  fw-medium fst-italic"
                : "nav-link text-black"
            }
          >
            <i className="fa-solid fa-terminal me"></i> Projects
          </NavLink>
          <NavLink
            to={"/teams"}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-success  fw-medium fst-italic"
                : "nav-link text-black"
            }
          >
            <i className="fa-solid fa-people-group me"></i> Teams
          </NavLink>
          <NavLink
            to={"/reports"}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-success  fw-medium fst-italic"
                : "nav-link text-black"
            }
          >
            <i className="fa-solid fa-chart-line"></i> Reports
          </NavLink>
          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-success  fw-medium fst-italic"
                : "nav-link text-black"
            }
          >
            <i className="fa-solid fa-gear me-1"></i> Settings
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
