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

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [userBlogs, setUserBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
    getUserBlogs();
    getUserFollowers();
    getUserFollowing();
  }, [id]);

  const getUserProfile = async () => {
    try{
      const response = await api.get(`/users/${id}`);
      if(response){
        setAccount(response.data.username);
        setAvatar(response.data.avatar);
        setBio(response.data.bio);
      } else {
        setAccount("Account");
      }
    }catch(err){
      console.error(err);
    }
  }

  const getUserBlogs = async () => {
    try {
      const response = await api.get(`/users/${id}/blogs`);
      setUserBlogs(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  // ##########################################################################

  const getUserFollowers = async () => {
    try {
      const response = await api.get(`/users/${id}/followers`);
      const user = await api.get("/myaccount");
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].user_id == user.data.id) {
          setIsFollowing(true);
          break;
        }
      }
      setFollowers(response.data.length);
    } catch (err) {
      console.error(err);
    }
  }

  const getUserFollowing = async () => {
    try {
      const response = await api.get(`/users/${id}/following`);
      setFollowing(response.data.length);
    } catch (err) {
      console.error(err);
    }
  }

  const follow = async () => {
    try {
      const response = await api.post(`/users/${id}/follow`);
      alert(response.data);
      getUserFollowers();
    } catch (err) {
      console.error(err);
      alert(err.response.data);
    }
  }

  const unfollow = async () => {
    try {
      const response = await api.post(`/users/${id}/unfollow`);
      alert(response.data);
      getUserFollowers();
      setIsFollowing(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="name-container">
        <h1>@{account}</h1>
      </div>
      <div className="profile-container">
        <img src={avatar} alt="Avatar" className="avatar" />
        <p>{bio}</p>
        <div className="following">
          {following} Following
        </div>
        <div className="followers">
          {followers} {followers == 1 ? "Follower" : "Followers"}
        </div>
        <div className="follow-btn">
          {isFollowing ? (
            <button onClick={unfollow}>Unfollow</button>
          ) : (
            <button onClick={follow}>Follow</button>
          )}
        </div>
      </div>
      <div className="blogs-container">
        <h2>
          There {userBlogs.length == 1 ? "is" : "are"} {userBlogs.length}{" "}
          {userBlogs.length == 1 ? "Blog" : "Blogs"}
        </h2>
        <div>
          {userBlogs &&
            userBlogs.map((blog) => {
              return (
                <div key={blog.id} className="blog">
                  <h3>{blog.title}</h3>
                  <div className="date">{Date(blog.updated_at)}</div>
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
