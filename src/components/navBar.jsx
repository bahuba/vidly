import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-fixed-top navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <b>Vidly</b>
      </a>

      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/customers">Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/rentals">Rentals</NavLink>
          </li>
          {!props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Register</NavLink>
              </li>
            </React.Fragment>
          )}
          {props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/profile">{props.user.name}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
