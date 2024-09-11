import {useState} from 'react';
import api from "../../api/posts";
import LogoA from "../../assets/logo-a.png";
import './index.scss'

const Home = () => {

    const [search, setSearch] = useState('');

    const submit = async () => {
      try{
        if (search === "") {
          alert("Please enter a search term");
        }

        const response = await api.get(`/blogs?search=${search}`);
        const data = response.data;

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
              <input id="search" placeholder="Search" type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
              <button onClick={submit}>Search</button>
            </div>
          </section>
        </div>
      </>
    );
}

export default Home;