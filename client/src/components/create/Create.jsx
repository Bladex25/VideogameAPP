import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from './validateForm.js';
import "./create.styles.css";
import { fetchVideoGames } from "../../redux/videoGameSlice.js";
import { useNavigate } from "react-router-dom";

const Create = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const videoGamesGenres = useSelector((state) => state.videoGames.genres);
const videoGamesPlatforms = useSelector((state) => state.videoGames.platforms);
const [isGenresOpen, setIsGenresOpen] = useState(false);
const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
    
const [videoGame, setVideoGame] = useState({
    name:"",
    description:"",
    platforms:"",
    image:"",
    releaseDate:"",
    rating:"",
    genres: [],
});


const [errors, setErrors] = useState({});


const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newCreate = { ...videoGame, [name]: value };
    setVideoGame(newCreate);
    const validationErros = validateForm(newCreate);
    setErrors(validationErros);
    
    };


const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
        
        setVideoGame({ ...videoGame, genres: [...videoGame.genres, value] });
    } else {
        
        setVideoGame({
            ...videoGame,
            genres: videoGame.genres.filter(genre => genre !== value)
        });
    }
}

const handlePlaformsCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
       
        setVideoGame({ ...videoGame, platforms: [...videoGame.platforms, value] });
    } else {
        
        setVideoGame({
            ...videoGame,
            platforms: videoGame.platforms.filter(platform => platform !== value)
        });
    }

}

const handleSubmit = async (event) => {
    event.preventDefault();
    if(Object.keys(errors).length === 0){
        const gameData = {
            ...videoGame,
            rating: Number(videoGame.rating),
        };
        try {
        await axios.post("http://localhost:3001/videogames", gameData);
        alert("Video Game Created");
        dispatch(fetchVideoGames());
        navigate('/home');
        } catch (error){
            if (error.response && error.response.status === 400) {
                alert("The game already exists in the database");
            } else {
                alert("An error occurred while creating the game");
            }
        }

    } else {
        const errorMessages = Object.values(errors).join("\n");
        alert(`The Video Game could not be created due to the following errors: \n ${errorMessages}`)
    }
}

    return(
        <div className="conteiner-create">
            <form className="form-create">
                <h1 className="title-create">Create  A New Video Game</h1>
                <label className="label-create" >Name :</label>
                <input 
                    className="input-create"
                    type="text" 
                    name="name" 
                    autoComplete="off"
                    value={videoGame.name}
                    onChange={handleInputChange}
                    placeholder="Video Game Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <label className="label-create">Image:</label>
                <input 
                    className="input-create"
                    type="text" 
                    name="image" 
                    placeholder="Video Game Image (url)" 
                    value={videoGame.image}
                    onChange={handleInputChange}
                />
                {errors.image && <p className="error">{errors.image}</p>}
                <label className="label-create" >Released :</label>
                <input 
                    className="input-create"
                    type="date" 
                    name="releaseDate" 
                    value={videoGame.releaseDate}
                    onChange={handleInputChange}
                />
                {errors.releaseDate && <p className="error" >{errors.releaseDate}</p>}
                <label className="label-create" >Rating :</label>
                <input 
                    className="input-create"
                    type="number" 
                    name="rating"
                    step="0.1"
                    min="0"
                    value={videoGame.rating}
                    onChange={handleInputChange}
                />
                {errors.rating && <p className="error" >{errors.rating}</p>}
                <label className="label-create" >Genres :</label>
                 <button className="button-genre" onClick={(event) => {
                    event.preventDefault();
                    setIsGenresOpen(!isGenresOpen);
                    }}>
                    Select Genres
                </button>

                {isGenresOpen && videoGamesGenres.map((genre) => (
                <div key={genre.name}>
                <label style={{color: 'white'}}>
                <input
                type="checkbox"
                name="genres"
                value={genre.name}
                onChange={handleCheckboxChange}
                 />
                {genre.name}
                </label>
                </div>
                ))}

                <label className="label-create" >Platforms :</label>
                <button className="button-genre" onClick={(event) => {
                    event.preventDefault();
                    setIsPlatformsOpen(!isPlatformsOpen);
                }}>
                    Select Platforms
                </button>
            {isPlatformsOpen && videoGamesPlatforms.map((platform) => (
                <div key={platform}>
                    <label style={{color: 'white'}}>
                        <input
                            className="checkbox-create"
                            type="checkbox"
                            name="platforms"
                            value={platform}
                            onChange={handlePlaformsCheckboxChange}
                        />
                        {platform}
                    </label>
                </div>
            ))}
                
                <label className="label-create" > Description :</label>
                <textarea 
                className="input-description"
                name="description" 
                placeholder="Video Game Description"
                value={videoGame.description}
                onChange={handleInputChange}
                />
                {errors.description && <p className="error" >{errors.description}</p>}
                <button className="button-create" onClick={handleSubmit} disabled={!videoGame.name || !videoGame.description || !videoGame.image || videoGame.genres.length === 0 || videoGame.platforms.length === 0}>Create</button>
                
            </form>
        </div>
    )
}

export default Create;