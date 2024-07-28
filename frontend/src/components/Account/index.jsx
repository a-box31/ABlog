import { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import api from '../../api/posts';
import Cookies from "js-cookie";

const Account = ({profilePicture, bio, posts, isLoggedIn }) => {

    const [ password, setPassword ] = useState("");
    const [ account, setAccount ] = useState("Account");

    const navigate = useNavigate()

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }

      const getUserName = async () => {
        try {
          const response = await api.get("/users");
          if (isLoggedIn) {
            setAccount(response.data.username);
          } else {
            setAccount("Account");
          }
        } catch (err) {
          console.error(err);
        }
      };

      getUserName();

    }, [isLoggedIn]);

    const logout = async () => {
        // send a request to the server to delete the session
        const response = await api.delete(`/session`);

        // remove the session cookie
        Cookies.remove("sessionID");

        // redirect to home
        navigate("/");
    }

    const deleteAccount = async () => {
      try{

        if(password === ""){
          alert("Please enter your password to delete your account");
          return;
        };
    
        // delete the account
        const response = await api.delete("/users", {
          data: {
            password: password,
          },
        });
        alert(response.data);

        // remove the session cookie    
        Cookies.remove("sessionID");
        // redirect to home
        navigate("/");

      } catch (err) {
          console.error(err);
      }
    }

    return (
      <>
        <h1>{account}</h1>
        <hr />
        <img src="" alt="Profile Picture" />
        <p>User Bio</p>
        <hr />
        <h2>Posts</h2>
        <hr />
        <h2>Settings</h2>
        <button className="logout" onClick={logout}>
          Logout
        </button>
        <div>
          <input type="password" name="password" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required/>
          <button type="submit" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
        <hr />
      </>
    );
}

export default Account;
