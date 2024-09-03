import { useContext } from "react";
import { Link } from "react-router-dom";
import LogoA from "../../assets/logo-a.png";
import "./index.scss";
import {UserContext} from "../../App";

const SideBar = () => {

    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);

    return (
      <div className="sidebar">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={LogoA} alt="A" />
            <h1>Blog</h1>
          </Link>
        </div>
        <div className="section">
          <ul>
            <li>
              <a href="/feed">Feed</a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/create">Create</a>
                </li>
                <li>
                  <a href="/account">Account</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="section">
          <h3>Popular</h3>
          <ul>
            <li>
              <a>Trending</a>
            </li>
            <li>
              <a>Top Rated</a>
            </li>
            <li>
              <a>New Releases</a>
            </li>
          </ul>
        </div>
        <div className="section">
          <h3>My Network</h3>
          <ul>
            <li>
              <a>My Profile</a>
            </li>
            <li>
              <a>My Subscribers</a>
            </li>
            <li>
              <a>My Subscriptions</a>
            </li>
            <li>
              <a>Suggestions</a>
            </li>
          </ul>
        </div>
        <div className="settings-section">
          <ul>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
            <p>
            Created by: <a href="https://www.abinthomas.net">Abin Thomas</a>
            </p>
            <p>©2024 ABlog</p>
        </div>
      </div>
    );
}

export default SideBar;
