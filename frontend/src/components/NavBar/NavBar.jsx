import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  return (
    <nav className="navBar" aria-label="Primary navigation">
      <ul className="nav-list">
        <li className="brand">
          <Link to="/">React/Django JWT</Link>
        </li>
        <li>
          {user ? (
            <>
              <Link className="nav-link" to="/search">
                Find books
              </Link>
              <button type="button" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
