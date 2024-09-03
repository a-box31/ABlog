import React, { useState, useEffect } from "react";
import "./index.scss";

const SideBar = () => {
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
    <nav
      className={`sidebar ${isSidebarOpen ? "active" : ""}`}
      aria-label="Sidebar Navigation"
    >
      <div className="section">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/feed">Feed</a>
          </li>
        </ul>
      </div>
      <div className="section">
        <h3>Popular</h3>
        <ul>
          <li>Trending</li>
          <li>Top Rated</li>
          <li>New Releases</li>
        </ul>
      </div>
      <div className="section">
        <h3>My Network</h3>
        <ul>
          <li>My Profile</li>
          <li>My Subscribers</li>
          <li>My Subscriptions</li>
          <li>Suggestions</li>
        </ul>
      </div>
      <div className="settings-section">
        <ul>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
