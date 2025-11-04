import { configureStore, createSlice } from "@reduxjs/toolkit";

const helloSlice = createSlice({
  name: "hello",
  initialState: { message: "Hello Redux!" },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = helloSlice.actions;
export default helloSlice.reducer;