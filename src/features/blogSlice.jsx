import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: false,
  categories: [],
  current_category: null,
  currentAuthor: null,
  theme: [],
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loadData: (state, { payload: { data, url } }) => {
      state[url] = data;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchEnd: (state) => {
      state.loading = false
    },
  }
});

export const {
  fetchStart, loadData, fetchFail, fetchEnd
} = blogSlice.actions

export default blogSlice.reducer