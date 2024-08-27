import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from "../../api/posts";
import './index.scss';

const Home = () => {

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
      return "There are " + blogs.length + " blogs";
    };

    return (
      <>
        <div className='title-container'>
          <h1>Main Feed</h1>
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

                  <img src={blog.avatar} className="avatar" alt="author avatar" />
                  <div className="author">
                    <Link to={"account/"+blog.owner_id}>{blog.username}</Link>
                  </div>
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
      </>
    );
}

export default Home;