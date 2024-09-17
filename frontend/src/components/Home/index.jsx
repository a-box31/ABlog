import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../../api/posts";
import LogoA from "../../assets/logo-a.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar as starRating} from "@fortawesome/free-solid-svg-icons";
import './index.scss'

const Home = () => {

    const [search, setSearch] = useState('');
    const [blogs, setBlogs] = useState();
    
    const blogState = () => {
      if (blogs === null || blogs === undefined) {
        return <h2>Please enter a search term...</h2>;
      } else if (blogs.length === 0) {
        return <h2>No Blogs Found</h2>;
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

    function createRating(blog) {
      let ratings = [];
      for (let i = 0; i < 5; i++) {
        if (i < blog.ratings) {
          ratings.push(
            <FontAwesomeIcon
              key={i}
              icon={starRating}
              color="#FFD700"
              onClick={(ratings) => {
                se
              }}
            />
          );
        } else {
          ratings.push(
            <FontAwesomeIcon
              key={i}
              icon={starRating}
              color="#FFFFFF"
            />
          );
        }
      }
      return ratings;
    };

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
            {blogState()}
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
                    <div className="ratings-box">
                      { 
                        createRating(blog).map((rating) => {
                          return rating;
                        })
                      }
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
}

export default Home;