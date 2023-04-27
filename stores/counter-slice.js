import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count++;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
  },
});

export default counterSlice;

export const counterAction = counterSlice.actions;
