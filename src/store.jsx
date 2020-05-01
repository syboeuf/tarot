import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import rootReducer from "./reducers"
// import logger from "redux-logger"

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()/*, logger*/],
  })

  export default store