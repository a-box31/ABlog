import { Link } from 'react-router-dom';
import LogoA from "../../assets/logo-a.png";
import './index.scss'

const Home = () => {
    return (
      <>
        <div className="home">
          <div className="hero">
            <div className="logo">
              <img src={LogoA} />
              <h1>Blog</h1>
            </div>
            <p>Discover the best blogs here.</p>
            <p>Share your knowledge with the world.</p>
            <p>Create your own blog and subscribe to others</p>
            <Link to="/feed" className="btn">
              Feed
            </Link>
          </div>
        </div>
      </>
    );
}

export default Home;