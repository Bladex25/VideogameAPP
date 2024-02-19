import {configureStore} from "@reduxjs/toolkit"
import videoGamesReducer from "./videoGameSlice"


export default configureStore({
  reducer: {
    videoGames: videoGamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});