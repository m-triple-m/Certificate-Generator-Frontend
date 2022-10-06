import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        {/* Container wrapper */}
        <div className="container">
          {/* Navbar brand */}
          <a className="navbar-brand me-2 my-2" href="https://mdbgo.com/">
            <img
              src="digi_logo_flat.png"
              height={32}
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: "1px" }}
            />
          </a>
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/generate">
                  Generator
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/templates">
                  Manage Templates
                </NavLink>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">
              <button type="button" className="btn btn-link px-3 me-2">
                Login
              </button>
              <button type="button" className="btn btn-primary me-3">
                Sign up for free
              </button>
              <a
                className="btn btn-dark px-3"
                href="https://github.com/mdbootstrap/mdb-ui-kit"
                role="button"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
};

export default Header;
