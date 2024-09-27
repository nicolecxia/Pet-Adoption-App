import { createSlice } from "@reduxjs/toolkit";

export const breedsSlice = createSlice({
    name: 'breed',
    initialState: {
        breeds: []
    },
    reducers: {
        setBreeds: (state, action) => {
            state.breeds = action.payload;
        },

    }
});

export const { setBreeds } = breedsSlice.actions;
export default breedsSlice.reducer;