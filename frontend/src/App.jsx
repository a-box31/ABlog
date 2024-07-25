import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import Layouts from "./components/Layouts"
import Home from "./components/Home"
import Login from "./components/Login"
import "./App.scss";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts isLoggedIn={isLoggedIn} />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="login" element={<Login />} />
          {/* <Route path="account" element={<Account />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App
