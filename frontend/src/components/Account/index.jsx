import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/posts";
import Cookies from "js-cookie";
import "./index.scss";

const Account = () => {

  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("Account");

  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [bio, setBio] = useState();
  const [preview, setPreview] = useState(true);

  const [myBlogs, setMyBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAccountInfo();
    getUserBlogs();
  }, []);

  const getAccountInfo = async () => {
    try {
      const response = await api.get("/myaccount");
      if (response) {
        setAccount(response.data.username);
        setAvatar(response.data.avatar);
        setBio(response.data.bio);
      } else {
        setAccount("Account");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateMyAvatar = async (e) => {
    e.preventDefault();
    try {
      if (newAvatar === "") {
        alert("Please select an image to upload");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", newAvatar);
      const response = await api.put("/myaccount/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data);
      setAvatar(response.data);
      getAccountInfo();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMyBio = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/myaccount/bio", {
        bio: bio,
      });
      alert(response.data);
      getAccountInfo();
    } catch (err) {
      console.error(err);
    }
  };

  // ##########################################################################

  const getUserBlogs = async () => {
    try {
      const response = await api.get("/myaccount");
      const blogs = await api.get(`/users/${response.data.id}/blogs`);
      setMyBlogs(blogs.data);
    } catch (err) {
      console.error(err);
    }
  };


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

  const deleteAccount = async () => {
    try {
      if (password === "") {
        alert("Please enter your password to delete your account");
        return;
      }
      // delete the account
      const response = await api.delete("/myaccount", {
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
  };

  const togglePreview = () => {
    if(!preview) {  
      setPreview(true);
    } else {
      setPreview(false);
    }
  }

  return (
    <>
      <div className="name-container">
        <h1>@{account}</h1>
      </div>
      {preview ? (
        <div className="profile-container">
          <div className="edit-btn-container">
            <button onClick={togglePreview}>Edit</button>
          </div>
          <img src={avatar} alt="Avatar" className="avatar" />
          <p>{bio}</p>
        </div>
      ) : (
        <div className="profile-editor">
          <div className="preview-btn-container">
            <h2>Edit Profile</h2>
            <button onClick={togglePreview}>Preview</button>
          </div>
          <div className="avatar-editor">
            <img src={avatar} alt="Avatar" className="avatar" />
            <form onSubmit={updateMyAvatar}>
              <label htmlFor="avatar">
                Change Avatar:
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="avatar-input"
                  onChange={(e) => {
                    setNewAvatar(e.target.files[0]);
                  }}
                />
                <button type="submit">Update Avatar</button>
              </label>
            </form>
          </div>
          <div className="bio-editor">
            <form onSubmit={updateMyBio}>
              <label htmlFor="bio">
                Change Bio:
                <textarea
                  name="bio"
                  id="bio"
                  placeholder="Enter your bio here"
                  className="bio-input"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                >{bio}</textarea>
                <button type="submit">Update Bio</button>
              </label>
            </form>
          </div>
        </div>
      )}
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

      <div className="settings-container">
        <h2>Settings</h2>
        <div className="account-settings">
          <label htmlFor="logout">
            Click here to log out:
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </label>
          <div className="delete-account-container">
            <label htmlFor="password">
              Enter Password to Delete Account:
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </label>
            <button type="submit" onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
