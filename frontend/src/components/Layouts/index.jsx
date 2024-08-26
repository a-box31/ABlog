import "./index.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Layouts = ({ isLoggedIn }) => {
    return (
      <>
        <div className="page">
          <NavBar isLoggedIn={isLoggedIn} />
          <Sidebar />
          <Outlet />
          <Footer />
        </div>
      </>
    );
}

export default Layouts;