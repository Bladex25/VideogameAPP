import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    videogamesfilter: [],
    allvideogames: [],
    videogameDetails: JSON.parse(localStorage.getItem('videogameDetails')) || {},
    genres: [],
    platforms: [],
    perPage: 15,
    currentPage: 1,
    order:"a-z",
    loading: true,

};

export const fetchVideoGameDetails = createAsyncThunk(
    'videoGames/fetchVideoGameDetails',
    async (id) => {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`)
        return response.data;
        
    }
)

export const fetchVideoGames = createAsyncThunk(
    'videoGames/fetchVideoGames',
    async () => {
        const response = await axios.get(`http://localhost:3001/videogames`)
        return response.data;
        
    }
)

const videoGamesSlice = createSlice({
    name: "videoGames",
    initialState,
    reducers: {
        setVideoGames(state, action) {
            state.videogamesfilter = action.payload
            state.allvideogames = action.payload
        },
        setGenres(state, action) {
            state.genres = action.payload
        },
        setPlatforms(state, action) {
            state.platforms = action.payload
        },
        setVideogamesByName(state, action) {
            const searchTerm = String(action.payload);
            state.videogamesfilter = state.allvideogames.filter(videogame => 
            videogame.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        },

        setCurrentPage(state, action){
            state.currentPage = action.payload
        },
       setOrder : (state, action) =>{
            state.order = action.payload

            if(action.payload === "a-z"){
                state.videogamesfilter.sort((a,b) =>{
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }
                )
            }
            else if (action.payload === "z-a"){
                state.videogamesfilter.sort((a,b) =>{
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                }
                )
            }
            else if(action.payload === "ratingAsc"){
                state.videogamesfilter.sort((a,b) =>{
                    if(a.rating > b.rating){
                        return 1;
                    }
                    if(b.rating > a.rating){
                        return -1;
                    }
                    return 0;
                }
                )
            }
            else if (action.payload === "ratingDesc"){
                state.videogamesfilter.sort((a,b) =>{
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if(b.rating > a.rating){
                        return 1;
                    }
                    return 0;
                }
                )
            }
        },
        setVideoGamesLocation(state, action) {
            if(action.payload === "db"){
            state.videogamesfilter = state.allvideogames.filter(videogame => 
            String(videogame.id).includes('-')
        )
        }
        else if(action.payload === "api"){
            state.videogamesfilter = state.allvideogames.filter(videogame => 
            !String(videogame.id).includes('-')
        )
        }
        else if(action.payload === "all"){
            state.videogamesfilter = state.allvideogames
        }
        
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setVideogamesSearch(state, action) {
            state.videogamesfilter = action.payload
        },

        setFilterGenres(state, action){
            state.videogamesfilter = state.allvideogames.filter(videogame =>
                videogame.genres.includes(action.payload))
        }

    },
  extraReducers: (builder) => {
    builder
    .addCase(fetchVideoGameDetails.fulfilled, (state, action) => {
        state.videogameDetails = action.payload;
    })
    .addCase(fetchVideoGames.fulfilled, (state, action) => {
        state.videogamesfilter = action.payload;
        state.allvideogames = action.payload;
        state.loading = false;
    });
}
})

export const { setVideoGames,setGenres, setPlatforms, setVideogamesByName, setCurrentPage, setOrder, setVideoGamesLocation, setLoading,setVideogamesSearch, setFilterGenres } = videoGamesSlice.actions;
export default videoGamesSlice.reducer;