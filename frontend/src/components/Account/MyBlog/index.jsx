import { useState } from "react";
import "./index.scss";

const MyBlog = ({ blog }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [media, setMedia] = useState(blog.media);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content); 

  const editBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("media", media);
      const result = await api.put(`/blogs/${blog.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
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
              value={blog.title}
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
            <textarea value={blog.content} />
          </label>
          <button>Update Blog</button>
        </form>
      ) : (
        <div key={blog.id} className="blog">
          <h3>{blog.title}</h3>
          <div className="date">{Date(blog.created_at)}</div>
          {blog.media.includes("video") ? (
            <video src={blog.media} controls></video>
          ) : (
            <img src={blog.media} alt="Picture" />
          )}
          <p>{blog.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </>
  );
};

export default MyBlog;
