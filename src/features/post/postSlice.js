import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";




export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);

    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  // {
  //   id: 1,
  //   title: "learning redux toolkit",
  //   content: "Good understanding",
  //   date: sub(new Date(), { minutes: 10 }).toISOString(),
  //   reactions: {
  //     thumpsUp: 0,
  //     wow: 0,
  //     heart: 0,
  //   },
  // },
  // {
  //   id: 2,
  //   title: " redux store",
  //   content: "Basic content",
  //   date: sub(new Date(), { minutes: 5 }).toISOString(),
  //   reactions: {
  //     thumpsUp: 0,
  //     wow: 0,
  //     heart: 0,
  //   },
  // },
  posts: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};



const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumpsUp: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          //adding data and reactions
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            (post.date = sub(new Date(), { minutes: min++ }).toISOString()),
              (post.reactions = {
                thumpsUp: 0,
                wow: 0,
                heart: 0,
              });
            return post;
          });
          //add fetched posts to array

          state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        });
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
