import { NavLink } from "react-router-dom";
import LandingBar from "../landingBar/LandingBar";
import "./landing.styles.css";
import { FaGamepad } from 'react-icons/fa';


const Landing = () => {

    return (
        <div className="lading-container">
    
  <div className='left-half'>
    <LandingBar />
    <div className='landing-text'>
      <h1 className='landing-title'>Welcome to Games Dungeon</h1>
      <p className='landing-subtitle'>The ultimate destination for all gaming enthusiasts. Dive into our vast collection of video games spanning across various genres, platforms, and generations. Whether you're a fan of action-packed shooters, thrilling role-playing games, or relaxing puzzle games, we've got something for everyone. Explore, discover, and find your next favorite game right here at Videogames.</p>
        <NavLink to = "/home">
        <button type="button" className='banner-btn'>
          <span className='btn-icon'>
            <FaGamepad className='text-white' size={30} style={{ filter: "invert(100%)" }} />
          </span>
          <span className='btn-text'>Play now</span>
        </button>
        </NavLink>
    </div>
  </div>
  <div className='right-half'>
    
  </div>
</div> // Cierre del div con la clase 'container'
    )
}

export default Landing;