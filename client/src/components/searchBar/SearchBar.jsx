import { useEffect, useState } from "react";
import "./searchBar.styles.css";
import { useDispatch } from "react-redux";
import { setCurrentPage, setVideogamesByName, setVideogamesSearch } from "../../redux/videoGameSlice";
import axios from 'axios';

function SearchBar (){

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setVideogamesByName(input));
        dispatch(setCurrentPage(1));
    }, [input, dispatch]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

 const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/videogames/search?name=${input}`);
        const mappedData = response.data.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                genres: game.genres ? game.genres.map((genre) => genre.name) : [],
                platforms: game.platforms ? game.platforms.map((platform) => platform.name) : [],
            };
        });
        dispatch(setCurrentPage(1));
        dispatch(setVideogamesSearch(mappedData));
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (
        <div className="search-bar">
            <input
                className="input-search"
                type="text"
                placeholder="search by name..."
                value={input}
                onChange={handleInputChange}
            />

            <button className="button-search" onClick={handleSearch}>Search</button>
        </div>
    )
  
}

export default SearchBar;