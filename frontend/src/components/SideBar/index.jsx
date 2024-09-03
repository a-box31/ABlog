import { Link } from "react-router-dom";
import "./index.scss";

const SideBar = () => {
    return (
      <div className="sidebar">
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
      </div>
    );
}

export default SideBar;
