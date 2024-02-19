
import "./home.styles.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { setCurrentPage, setFilterGenres, setGenres, setOrder, setVideoGamesLocation} from "../../redux/videoGameSlice";
import StarRating from "../star";
import { useEffect, useState, useMemo } from "react";


function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const videogamesArray = useSelector((state) => state.videoGames.videogamesfilter);
    const genres = useSelector((state) => state.videoGames.genres)

   
    const perPage = useSelector((state) => state.videoGames.perPage);
    const currentPage = useSelector((state) => state.videoGames.currentPage);


    const toltalPages = Math.ceil(videogamesArray.length / perPage);
    const starIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;
    const paginatedVideoGames = videogamesArray.slice(starIndex, endIndex);

    const handleGotopage =  async (page) => {
      setLoading(true);
        dispatch(setCurrentPage(page));
        
    }
    
    useEffect(() => {
      if(loading){
        setLoading(false);
      }
    }, [currentPage, loading, dispatch])
   
   const isUUID = (id)  => {
   const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
 }
// const allVideoGames = useSelector((state) => state.videoGames.allvideogames);
   const videoGamesDB = useMemo(() => videogamesArray.filter(game => isUUID(game.id)), [videogamesArray]);
   console.log(videoGamesDB)
// const apiGames = useMemo(() => allVideoGames.filter(game => !isUUID(game.id)), [allVideoGames]); Esto es del codigo anterior

  const handleOrder = ({ target }) => {
    const order = target.value;
    dispatch(setOrder(order));
    dispatch(setCurrentPage(1));
  };

const handleFilter = async ({target}) => {
    const filter = target.value;
    dispatch(setVideoGamesLocation(filter))
    dispatch(setCurrentPage(1));
  }

const handleFilterGenres = ({target}) => {
  const filter = target.value
  dispatch(setFilterGenres(filter))

}

 return (
  <div className="container">
    {loading ? (
      <div>Loading...</div>
    ) : (
      <>
        <div>
          <select onChange={handleFilterGenres}>{genres.map(g => {
            return (
            <option key={g.id} value={g.name}>{g.name}</option>)
            
          })}</select>
          <button className="button-31" onClick={handleFilter} value="all">Show all</button>
          <button className="button-31" onClick={handleOrder} value="a-z">A-Z</button>
          <button className="button-31" onClick={handleOrder} value="z-a">Z-A</button>
          <button className="button-31" onClick={handleOrder} value="ratingAsc">Rating Asc</button>
          <button className="button-31" onClick={handleOrder} value="ratingDesc">Rating Desc</button>
          <button className="button-31" onClick={handleFilter} value="db">Create</button>
          <button className="button-31" onClick={handleFilter} value="api">API</button>
        </div>

         
        
        <div className="pagination-container">
           <button
          onClick={() => handleGotopage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
          {Array.from({ length: toltalPages}, (_, index) => {
            const pageNumber = index + 1;
            return(
              <button
                disabled={pageNumber === currentPage}
                key={index}
                onClick={() => handleGotopage(pageNumber)}
              >
                <span>{pageNumber}</span>
              </button>
            )
          })}
          <button onClick={() => handleGotopage(currentPage + 1)} disabled={currentPage === toltalPages}>
            {">>"}
          </button>
        </div>
      
        <div className="card-container">
          {paginatedVideoGames.map((videogame, index) => {
            return(
              <Card
                key={index}
                id={videogame.id}
                name={videogame.name}
                image={videogame.image}
                platforms={videogame.platforms}
                description={videogame.description}
                releaseDate={videogame.released}
                rating={videogame.rating}
                genres={videogame.genres}
              >
                <StarRating rating={videogame.rating} />
              </Card>
            )
          })}
        </div>
      </>
    )}
  </div>
);
        
}

export default Home;