import "./index.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Layouts = () => {
    return (
      <div className="overlay">
        {/* <NavBar /> */}
        <Sidebar />
        <div className="page">
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    );
}

export default Layouts;