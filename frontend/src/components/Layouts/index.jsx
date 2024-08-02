import "./index.scss";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const Layouts = ({ isLoggedIn }) => {
    return (
      <>
        <div className="page">
          <NavBar isLoggedIn={isLoggedIn} />
          <Outlet />
          <Footer />
        </div>
      </>
    );
}

export default Layouts;