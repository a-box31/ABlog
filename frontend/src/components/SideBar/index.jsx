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
    <nav className={`sidebar ${isSidebarOpen ? "active" : ""}`} aria-label="Sidebar Navigation">
      <div className="section">
        <ul>
          <li>
            <a href="/" aria-label="Home">Home</a>
          </li>
          <li>
            <a href="/feed" aria-label="Main Feed">Main Feed</a>
          </li>
          <li>
            <a href="/followers" aria-label="Followers Feed">Followers Feed</a>
          </li>
          <li>
            <a href="/following" aria-label="Following">Following</a>
          </li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Popular</h3>
        <ul>
          <li>
            <a href="/trending" aria-label="Trending">Trending</a>
          </li>
          <li>
            <a href="/top-rated" aria-label="Top Rated">Top Rated</a>
          </li>
          <li>
            <a href="/new-releases" aria-label="New Releases">New Releases</a>
          </li>
        </ul>
      </div>
      
      <div className="section">
        <h3>My Network</h3>
        <ul>
          <li>
            <a href="/my-followers" aria-label="My Followers">My Followers</a>
          </li>
          <li>
            <a href="/following" aria-label="Following">Following</a>
          </li>
          <li>
            <a href="/suggestions" aria-label="Suggestions">Suggestions</a>
          </li>
        </ul>
      </div>
      
      <div className="settings-section">
        <ul>
          <li>
            <a href="/settings" aria-label="Settings">Settings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
