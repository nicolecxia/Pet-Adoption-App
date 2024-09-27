import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'post',
    initialState: {
        posts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        addPost: (state, action) => {
            state.posts.push(action.payload);
        },

        changeStatus: (state, action) => {
            const id = action.payload.id;
            const status = action.payload.adopted;

            const updatePosts = state.posts.map((post) => {
                if (post.id == id) {
                    post.adopted = status;
                }
                return post;
            }
            );
            state.posts = updatePosts;
        },

        deletePost: (state, action) => {
            const id = action.payload;

            const filterPosts = state.posts.filter(
                (post) => post.id !== id
            );
            state.posts = filterPosts;
        },

        changeLiked: (state, action) => {
            const id = action.payload.id;
            const liked = action.payload.liked;

            const updatePosts = state.posts.map((post) => {
                if (post.id == id) {
                    post.liked = liked;
                }
                return post;
            }
            );
            state.posts = updatePosts;
        }
    }
});

export const { setPosts, addPost, changeStatus, deletePost, changeLiked } = postsSlice.actions;
export default postsSlice.reducer;