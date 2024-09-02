import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/posts";
import "./index.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  

  // function to submit the form
  const submit = async (e) => {
    e.preventDefault();

    // check if any field is empty
    if (!email || !password || !username) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await api.post("/register", {
        username: username,
        email: email,
        password: password,
      });

      alert(`Registration successful! Please login to continue.`);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    } catch (e) {
      console.error(e.message);
      alert(e.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" onClick={submit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
