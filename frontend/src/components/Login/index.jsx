import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/posts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      alert(response.data);

      // redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (e) {
      console.error(e.message);
      alert(e.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
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
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" onClick={submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
