import { useState } from "react";
import "./index.scss";
import api from "../../api/posts";

const Create = () => {
  const [title, setTitles] = useState();
  const [media, setMedia] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/create", {
        title,
        media,
        content,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <h1>Create</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                onChange={(e) => {
                  setTitles(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="media">
              Media:
              <input
                type="file"
                onChange={(e) => {
                  setTitles(e.target.value);
                }}
                accept="image/*"
              />
            </label>
          </div>
          <div>
            <label htmlFor="content">
              Content:
              <textarea name="" id="" cols="30" rows="10" 
                onChange={(e) => {
                  setContent(e.target.value);
                }}
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
