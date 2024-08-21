import {useState, useEffect} from 'react';
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

    const blogState = () =>{
      if(blogs === undefined){
        return "Loading...";
      } else if(blogs.length === 0){
        return "No Blogs Found";
      }
      return "There are " +blogs.length + " blogs";
    }

    return (
      <>
        <div>
          <h1>Check out the Blogs Below</h1>
        </div>
        <div className="blogs-container">
          <h2>
            {blogState}
          </h2>
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog.id} className="blog">
                  <h3>{blog.title}</h3>
                  <img src={blog.media} alt="Picture" />
                  <p>{blog.content}</p>
                </div>
              );
            })}
        </div>
      </>
    );
}

export default Home;