import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../../api/posts";
import Blog from "../Blog";
import LogoA from "../../assets/logo-a.png";
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
                  <Blog blog={blog} key={blog.id}/>
                );
              })}
          </div>
        </div>
      </>
    );
}

export default Home;