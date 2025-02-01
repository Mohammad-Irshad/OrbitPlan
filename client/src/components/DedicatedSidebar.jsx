import React from "react";
import { NavLink } from "react-router-dom";

const DedicatedSidebar = ({ text, navigateTo }) => {
  return (
    <div className="card mt-5  py-2 ps-1 border-success">
      <div className="card-body">
        {
          <nav className="nav flex-column">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-danger  fw-medium fst-italic"
                  : "nav-link text-black"
              }
            >
              <i className="fa-solid fa-table-columns"></i> Dashboard
            </NavLink>
            <NavLink
              to={`/${navigateTo}`}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-success  fw-medium fst-italic"
                  : "nav-link text-black"
              }
            >
              <i className="fa-solid fa-backward"></i> {text}
            </NavLink>
          </nav>
        }
      </div>
    </div>
  );
};

export default DedicatedSidebar;
