import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CustomThemeContext } from "../Context/ThemeContext";
import { UserContext } from "../Context/UserContext";

const Header = () => {
  const { customTheme } = useContext(CustomThemeContext);
  const { loggedin, logout } = useContext(UserContext);
  // console.log(customTheme);
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav
        className={"navbar navbar-expand-md navbar-" + customTheme.headerText}
        style={{
          backgroundColor: customTheme.headerColor,
        }}
      >
        {/* Container wrapper */}
        <div className="container">
          {/* Navbar brand */}
          <a className="navbar-brand me-2 my-2" href="/">
            <img
              src="digi_logo_flat.png"
              height={40}
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/managecertificates">
                  Manage Certificates
                </NavLink>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">
              {!loggedin ? (
                <Link to="/login" className="btn btn-dark px-3 me-2">
                  Login
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger px-3 me-2"
                  onClick={() => logout(() => {navigate('/login')})}
                >
                  Logout
                </button>
              )}
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
