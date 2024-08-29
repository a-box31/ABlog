import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Layouts from "./components/Layouts";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Create from "./components/Create";
import "./App.scss";
import Cookies from "js-cookie";

export const UserContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  


  return (
    <>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path=":id" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
