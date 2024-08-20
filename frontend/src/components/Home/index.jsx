import {useState, useEffect} from 'react';
import api from "../../api/posts";
import './index.scss';

const Home = () => {

    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await api.get("/blogs");

                const data = await response.json();
                console.log(data);
                setBlogs(data);
            } catch (e) {
                console.log(e);
            }
        };

        getBlogs();
    }, []);

    return (
      <>
        <div>
          <h1>Check out the Blogs Below</h1>
        </div>
        <div className="blogs-container">
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog.id}>
                  <h2>{blog.title}</h2>
                  <img src={blog.media} alt="Blog" />
                  <p>{blog.content}</p>
                </div>
              );
            })}
        </div>
      </>
    );
}

export default Home;