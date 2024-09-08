import { Link } from 'react-router-dom';
import LogoA from "../../assets/logo-a.png";
import './index.scss'

const Home = () => {
    return (
      <>
        <div className="home">
          <header className="title-container">
            <img src={LogoA} alt="Logo" />
            <h1>Blog</h1>
          </header>
          <section className="home-grid">
            <div>Grid Item 1</div>
            <div>Grid Item 2</div>
            <div>Grid Item 3</div>
            <div>Grid Item 4</div>
          </section>
        </div>
      </>
    );
}

export default Home;