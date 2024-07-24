import { Routes, Route } from "react-router-dom"
import "./App.scss"
import Layouts from "./components/Layouts"
import Home from "./components/Home"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          {/* <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Account />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App
