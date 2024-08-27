import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/posts";
import Cookies from "js-cookie";
import "./index.scss";

const Account = () => {

  const {id} = useParams();

  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("Account");
  const [editable, setEditable] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [bio, setBio] = useState("");

  const [myBlogs, setMyBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserName(id);
    getAvatar();
    getBio();
    getMyBlogs();
  }, [id]);

  const getUserName = async (id) => {
    try {
      const response = await api.get("/user", {
        params: {
          id: id,
        },
      });
      if (id) { 

        setAccount(response.data.username);
      } else {
        setAccount("Account");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAvatar = async () => {
    try {
      const response = await api.get("/avatar");
      setAvatar(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    try {
      if (newAvatar === "") {
        alert("Please select an image to upload");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", newAvatar);
      const response = await api.put("/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setNewAvatar("");
      getAvatar();
      alert(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBio = async () => {
    try {
      const response = await api.get("/bio");
      setBio(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBio = async (e) => {
    e.preventDefault();
    try {
      if (bio === "") {
        alert("Please enter a new bio to update");
        return;
      }
      const response = await api.put("/bio", {
        bio: bio,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  // ##########################################################################
  
  const getMyBlogs = async () => {
    try {
      const response = await api.get("/myblogs");
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

  const deleteAccount = async () => {
    try {
      if (password === "") {
        alert("Please enter your password to delete your account");
        return;
      }

      // delete the account
      const response = await api.delete("/user", {
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

  return (
    <>
      <div className="name-container">
        <h1>@{account}</h1>
      </div>
      {editable ? (
        <div className="profile-editor">
          <div className="avatar-editor">
            <img src={avatar} alt="Avatar" className="avatar" />
            <form onSubmit={updateAvatar}>
              <label htmlFor="Avatar">
                Select Avatar:
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => {
                    setNewAvatar(e.target.files[0]);
                  }}
                  accept="image/*"
                />
              </label>
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
          <div className="bio-editor">
            <form onSubmit={updateBio}>
              <label htmlFor="bio">
                Bio
                <textarea
                  name="bio"
                  className="bio-input"
                  id="bio"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </label>
              <button className="btn">Submit</button>
            </form>
          </div>
          <div className="finish-container">
            <button className="btn" onClick={toggleEdit}>
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          <img src={avatar} alt="Avatar" className="avatar" />
          <p>{bio}</p>

          <div className="edit-option">
            <button className="btn" onClick={toggleEdit}>
              Edit
            </button>
          </div>

        </div>
      )}
      <div className="blogs-container">
        <h2>Your Blogs</h2>
        <div>
          {myBlogs &&
            myBlogs.map((blog) => {
              return (
                <div key={blog.id} className="blog">
                  <h3>{blog.title}</h3>
                  <div className="date">{Date(blog.created_at)}</div>
                  { blog.media.includes("video") ? (
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
