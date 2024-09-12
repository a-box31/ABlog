import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoA from "../../assets/logo-a.png";
import "./index.scss";
import { UserContext } from "../../App";

const SideBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (isSidebarOpen && e.touches[0].clientX < startX - 50) {
        setIsSidebarOpen(false);
      } else if (!isSidebarOpen && e.touches[0].clientX > startX + 50) {
        setIsSidebarOpen(true);
      }
    };

    const handleTouchEnd = () => {
      setStartX(0);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSidebarOpen, startX]);

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "active" : ""}`}
      aria-label="Sidebar Navigation"
    >
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={LogoA} alt="A" />
          <h1>Blog</h1>
        </Link>
      </div>
      <div className="section">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/create">Create</NavLink>
              </li>
              <li>
                <NavLink to="/account">Account</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
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
            <Link to="/account/#settings">Settings</Link>
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
};

export default SideBar;
