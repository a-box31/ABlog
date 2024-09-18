import { useState } from "react";
import api from "../../../api/posts.js";
import "./index.scss";

const MyBlog = ({ blog }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [media, setMedia] = useState();
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const editBlog = async (e) => {
    e.preventDefault();
    try {
      console.log(title, content, media)
      if ( !title || !media || !content ) {
        alert("Please fill in all fields");
        return;
      }
      console.log("Error1")
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("media", media);
      const response = await api.put(`/blogs/${blog.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data);
      setTimeout(()=>{
        setIsEditing(false);
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isEditing ? (
        <form id="blog-editor" onSubmit={editBlog}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            Media:
            <input
              type="file"
              name="media"
              id="media"
              accept="image/*, video/*"
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="btn btn-update">Update Blog</button>
          <button className="btn btn-danger" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div key={blog.id} className="blog">
          <h3>{blog.title}</h3>
          <div className="date">Last updated: {blog.updated_at} </div>
          {blog.media.includes("video") ? (
            <video src={blog.media} controls></video>
          ) : (
            <img src={blog.media} alt="Picture" />
          )}
          <p>{blog.content}</p>
          <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
          {/* <button className="delete">Delete</button> */}
        </div>
      )}
    </>
  );
};

export default MyBlog;
