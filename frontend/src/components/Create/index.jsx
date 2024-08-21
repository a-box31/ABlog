import { useState } from "react";
import "./index.scss";
import api from "../../api/posts";

const Create = () => {
  const [title, setTitle] = useState();
  const [media, setMedia] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("media", media);
      const result = await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="title-container">
        <h1>Create</h1>
      </div>
      <div className="create-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="media">
              Media:
              <input
                type="file"
                name="media"
                id="media"
                onChange={(e) => {
                  setMedia(e.target.files[0]);
                }}
                accept="image/*"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="content">
              Content:
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                required
              ></textarea>
            </label>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default Create;
