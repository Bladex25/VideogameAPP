import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './components/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {setGenres, setLoading, setPlatforms, setVideoGames} from "./redux/videoGameSlice";
import Navbar from './components/navBar/NavBar';
import Detail from './components/detail/Detail';
import Create from './components/create/Create';
import Landing from './components/landing/Landing';


function App() {
    const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector((state) => state.videoGames.loading);
  
  useEffect(() => {
    async function fetchData(){
      dispatch(setLoading(true)); 
      const response = await axios.get(
        "http://localhost:3001/videogames"
      )
      dispatch(setLoading(false));
      const videoGames = response.data
      dispatch(setVideoGames(videoGames));
      const allPlatforms = [];
      videoGames.forEach(game => {
        game.platforms.forEach(platform => {
          const lowerCasePlatform = platform.toLowerCase();
          if(!allPlatforms.includes(lowerCasePlatform)){
            allPlatforms.push(lowerCasePlatform)
          }
        })
      })
      const platforms = [...new Set(allPlatforms)];
      dispatch(setPlatforms(platforms));
      const genres = await axios.get("http://localhost:3001/genres");
      dispatch(setGenres(genres.data));
    }
    fetchData();

  }, [dispatch]) 

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
  <div>
   {location.pathname !== '/' && <Navbar showSearchBar={location.pathname !== "/create"} showHomeButton={location.pathname !=="/home"} />}
     <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home  />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Create/>} />
     </Routes>
    </div>)
  
}

export default App;
