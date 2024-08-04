import { useState } from "react";
import "./index.scss";

const Create = () =>{

    const [title, setTitles] = useState();
    const [media, setMedia] = useState();
    const [content, setContent] = useState();

    return (
      <>
        <div>
          <h1>Create</h1>
        </div>
        <div>
          <form>
            <div>
              <label htmlFor="title">
                Title:
                <input type="text" />
              </label>
            </div>
            <div>
              <label htmlFor="media">
                Media:
                <input type="file" />
              </label>
            </div>
            <div>
              <label htmlFor="content">
                Content:
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </label>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </>
    );
}

export default Create;