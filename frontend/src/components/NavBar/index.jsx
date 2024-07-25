import LogoA from '../../assets/logo-a.png';
import { Link } from "react-router-dom";
import "./index.scss";

const NavBar = ({ isLoggedIn }) => {

    return (
      <>
        <div className="navigation">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={LogoA} alt="A" />
              <h1>Blog</h1>
            </Link>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link to="#">Account</Link>
                </li>
              ) : (
                <li>
                  <Link to="login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    );
}

export default NavBar;  