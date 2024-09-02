import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoA from "../../assets/logo-a.png";
import api from "../../api/posts";
import { UserContext } from "../../App";
import "./index.scss";

const NavBar = () => {
  const [account, setAccount] = useState("Account");
  const { isLoggedIn } = useContext(UserContext);
  const [navActive, setNavActive] = useState(false); 

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await api.get("/myaccount");
        if (response.data) {
          setAccount(response.data.username);
        } else {
          setAccount("Account");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserName();
  }, []);

  const toggleNav = () => {
    setNavActive(!navActive); // Toggle the navigation visibility
  };

  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/" className="logo-link" aria-label="Home">
          <img src={LogoA} alt="Logo" />
          <h1>Blog</h1>
        </Link>
      </div>
      <div className={`nav-links ${navActive ? "active" : ""}`}>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/create" activeClassName="active-link">Create</NavLink>
              </li>
              <li className="account-dropdown">
                <NavLink to="/account" activeClassName="active-link">
                  {account}
                </NavLink>
                <ul className="dropdown-menu">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" activeClassName="active-link">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName="active-link">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleNav}>
        <div />
        <div />
        <div />
      </div>
    </nav>
  );
};

export default NavBar;
