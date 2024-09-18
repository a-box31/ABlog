import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const Blog = ({ blog }) => {

  const [rating, setRating] = useState(blog.rating);


  return (
    <div key={blog.id} className="blog">
      <h3>{blog.title}</h3>
      <div className="author">
        <Link className="profile" to={"/profile/" + blog.owner_id}>
          <img src={blog.avatar} className="avatar" alt="avatar" />
          <div>{blog.username}</div>
        </Link>
      </div>
      <div className="date">
        Last updated: {new Date(blog.updated_at).toLocaleString()}
      </div>
      {blog.media.includes("video") ? (
        <video src={blog.media} controls></video>
      ) : (
        <img src={blog.media} alt="Picture" />
      )}
      <p>{blog.content}</p>
      <div className="ratings-box">
        <span className="rating">{blog.rating}</span>
      </div>
    </div>
  );
};

export default Blog;
