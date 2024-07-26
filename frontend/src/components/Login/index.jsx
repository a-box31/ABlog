import { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      alert('Please fill all the fields');
      return;
    }

    try {
      const response = axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form action="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required/>
        </div>
        <button type="submit" onClick={submit} >Login</button>
      </form>
    </div>
  )
}

export default Login;