import React from "react";
import "../../assets/styles/components/header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const location = useLocation();
  return (
    <header>
      <div className="header-container">
        <div className="header__logo">
          <Link to="/">
            <img
              className="logo-img"
              src={logo}
              height="37"
              width="200"
              alt="logo"
            />
          </Link>
        </div>
        <nav className="nav">
          <Link
            className={`nav__link ${
              location.pathname === "/characters" && "nav-link-selected"
            }`}
            to="/characters"
          >
            CHARACTERS
          </Link>
          <Link
            className={`nav__link ${
              location.pathname === "/locations" && "nav-link-selected"
            }`}
            to="/locations"
          >
            LOCATIONS
          </Link>
          <Link
            className={`nav__link ${
              location.pathname === "/episodes" && "nav-link-selected"
            }`}
            to="/episodes"
          >
            EPISODES
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
