import { Link } from 'react-router-dom';
import LogoA from "../../assets/logo-a.png";
import './index.scss'

const Home = () => {
    return (
      <>
        <div className="home">
          <div className="title-container">
            <img src={LogoA} alt="Logo" />
            <h1>Blog</h1>
          </div>
          <section>
            <div className='home-grid'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
        </div>
      </>
    );
}

export default Home;