import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../../api/posts";
import LogoA from "../../assets/logo-a.png";
import './index.scss'

const Home = () => {

    const [search, setSearch] = useState('');

    const [blogs, setBlogs] = useState();

    const blogState = () => {
      if (blogs === null || blogs === undefined) {
        return "Please enter a search term...";
      } else if (blogs.length === 0) {
        return "No Blogs Found";
      }
      return (
        <h2>
          There {blogs.length == 1 ? "is" : "are"} {blogs.length}{" "}
          {blogs.length == 1 ? "Blog" : "Blogs"}
        </h2>
      );
    };

    const submit = async () => {
      try{
        if (search === "") {
          alert("Please enter a search term");
          return;
        }

        const response = await api.get(`/blogs?search=${search}`);
        const data = response.data;
        setBlogs(data);

      } catch(err){
        console.log(err)
      }
    }

    return (
      <>
        <div className="home">
          <header className="title-container">
            <img src={LogoA} alt="Logo" />
            <h1>Blog</h1>
          </header>
          <section className="content-section">
            <div className="search-container">
              <input
                id="search"
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button onClick={submit}>Search</button>
            </div>
          </section>
          <div className="blogs-container">
            <h2>{blogState()}</h2>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <div key={blog.id} className="blog">
                    <h3>{blog.title}</h3>
                    <div className="author">
                      <Link
                        className="profile"
                        to={"/profile/" + blog.owner_id}
                      >
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
        </div>
      </>
    );
}

export default Home;