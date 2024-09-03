import "./index.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";

const Layouts = () => {
    return (
      <div className="overlay">
        <Sidebar />
        <div className="page">
          <Outlet />
        </div>
      </div>
    );
}

export default Layouts;