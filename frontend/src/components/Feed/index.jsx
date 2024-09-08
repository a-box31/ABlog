import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from "../../api/posts";
import './index.scss';

const Feed = () => {

    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await api.get("/blogs");
                const data = response.data
                setBlogs(data);
            } catch (e) {
                console.log(e);
            }
        };
        getBlogs();
    }, []);

    const blogState = () => {
      if (blogs === null || blogs === undefined) {
        return "Loading...";
      } else if (blogs.length === 0) {
        return "No Blogs Found";
      }
      return(
        <h2>
          There {blogs.length == 1 ? "is" : "are"} {blogs.length}{" "}
          {blogs.length == 1 ? "Blog" : "Blogs"}
        </h2>
      )
    };

    return (
      <>
        <div className='title-container'>
          <h1>Feed</h1>
        </div>
        <div className="blogs-container">
          <h2>
            {blogState()}
          </h2>
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog.id} className="blog">
                  <h3>{blog.title}</h3>
                  <div className="author">
                    <Link className="profile" to={"/profile/" + blog.owner_id}>
                      <img
                        src={blog.avatar}
                        className="avatar"
                        alt="avatar"
                      />
                      <div>{blog.username}</div>
                    </Link>
                  </div>
                  <div className="date">
                    Last updated: {Date(blog.updated_at)}
                  </div>
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
      </>
    );
}

export default Feed;