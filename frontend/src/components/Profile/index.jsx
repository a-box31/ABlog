import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/posts";
import Cookies from "js-cookie";
import "./index.scss";

const Profile = () => {

  const {id} = useParams();

  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("Account");

  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [bio, setBio] = useState("");

  const [myBlogs, setMyBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserName();
    getUserAvatar();
    getUserBio();
    getUserBlogs();
  }, [id]);

  const getUserName = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      if (response) { 
        setAccount(response.data.username);
      } else {
        setAccount("Account");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserAvatar = async () => {
    try {
      const response = await api.get(`users/${id}/avatar`);
      setAvatar(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserBio = async () => {
    try {
      const response = await api.get(`/users/${id}/bio`);
      setBio(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const getUserBlogs = async () => {
    try {
      const response = await api.get(`/users/${id}/blogs`);
      setMyBlogs(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  // ##########################################################################

  const logout = async () => {
    // send a request to the server to delete the session
    const response = await api.delete(`/session`);
    alert(response.data);
    // remove the session cookie
    Cookies.remove("sessionID");
    // redirect to home
    navigate("/");
  };

  return (
    <>
      <div className="name-container">
        <h1>@{account}</h1>
      </div>
      <div className="profile-container">
        <img src={avatar} alt="Avatar" className="avatar" />
        <p>{bio}</p>
      </div>
      <div className="blogs-container">
        <h2>
          There {myBlogs.length == 1 ? "is" : "are"} {myBlogs.length}{" "}
          {myBlogs.length == 1 ? "Blog" : "Blogs"}
        </h2>
        <div>
          {myBlogs &&
            myBlogs.map((blog) => {
              return (
                <div key={blog.id} className="blog">
                  <h3>{blog.title}</h3>
                  <div className="date">{Date(blog.created_at)}</div>
                  {blog.media.includes("video") ? (
                    <video src={blog.media} controls></video>
                  ) : (
                    <img src={blog.media} alt="Picture" />
                  )}
                  <p>{blog.content}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Profile;
