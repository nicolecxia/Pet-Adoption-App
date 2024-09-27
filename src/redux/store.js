import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import breedsReducer from "./breedsSlice";

export const store = configureStore({
    reducer: {
        post: postsReducer,
        breed: breedsReducer
    }
})