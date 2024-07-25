import "./index.scss";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const Layouts = ({ isLoggedIn }) => {
    return (
      <>
        <NavBar isLoggedIn={isLoggedIn} />
        <section className="page">
          <Outlet />
        </section>
        <Footer />
      </>
    );
}

export default Layouts;