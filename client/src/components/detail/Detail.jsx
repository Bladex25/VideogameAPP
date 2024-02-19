import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchVideoGameDetails } from "../../redux/videoGameSlice";
import "./detail.styles.css";



function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const videoGame = useSelector((state) => state.videoGames.videogameDetails);
    console.log(videoGame);

     useEffect(() => {
        dispatch(fetchVideoGameDetails(id));
    }, [dispatch, id]);

    if (!videoGame) {
        return <div>Loading...</div>;
    }

    return (
        <div className="containe-detail">
            <h1 className="h1"> ID :{videoGame.id}</h1>
            <h1 className="title">{videoGame.name}</h1>
            <h2 className="description" dangerouslySetInnerHTML={{ __html: videoGame.description }} />
            <h2 className="genres" > Platforms:
            {videoGame.parent_platforms && typeof videoGame.parent_platforms[0] === 'object' ? 
            videoGame.parent_platforms.map((platform) =>(
            <div style={{color:'black'}} key={platform.platform.id}>{platform.platform.name}</div>
            )) : 
            videoGame.platforms && videoGame.platforms.map((platform, index) => (
            <div style={{color:'black'}} key={index}>{platform}</div>
            ))
            }
            </h2>
            <h3 className="second" >
                 Release Date: 
                {videoGame.released ? videoGame.released.split('T')[0] : 
                videoGame.releaseDate ? videoGame.releaseDate.split('T')[0] : 'N/A'}
            </h3>
            <h4 className="second" > Rating : {videoGame.rating}</h4>
            <div className="genres"> Genres: 
                {videoGame.genres && typeof videoGame.genres[0] === 'object' ? 
                videoGame.genres.map((genre) => (
            <div style={{color:'black'}} key={genre.id}>{genre.name}</div>
            )) : 
            videoGame.genres && videoGame.genres.map((genre, index) => (
            <div style={{color:'black'}} key={index}>{genre}</div>
            ))
            }
            </div>
            <img className='image-detail' src={videoGame.background_image ? videoGame.background_image : videoGame.image} alt="img not found" />
        </div>
    )
}   

export default Detail;