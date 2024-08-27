import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layouts from "./components/Layouts";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Create from "./components/Create";
import "./App.scss";
import Cookies from "js-cookie";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSessionCookie = () => {
    const sessionID = Cookies.get("sessionID");
    if (sessionID) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    // initial check
    checkSessionCookie();
    // check every 5 seconds for the session cookie
    const intervalID = setInterval(checkSessionCookie, 1000);
    // cleanup
    return () => clearInterval(intervalID);
  }, []);
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts isLoggedIn={isLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="login" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path="register" element={<Register isLoggedIn={isLoggedIn} />} />

          <Route path="account">
            <Route index element={<Account />} />
            <Route path=":id" element={<Account/>} /> 
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App
