import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    selectFilter: "ALL",
  },
  reducers: {
    addTodo: (state, action) => {
      const newJob = action.payload;
      state.todoList.push(newJob);
    },
    changeStatus: (state, action) => {
      const id = action.payload;
      const job = state.todoList.find((todo) => todo.id === id);
      if (job) {
        job.isDone = !job.isDone;
      }
    },
    deleteJob: (state, action) => {
      const id = action.payload;
      state.todoList = state.todoList.filter((todo) => todo.id !== id);
    },
    clearTodo: (state) => {
      state.todoList = state.todoList.filter((todo) => todo.isDone === false);
    },
    updateSelectFitler: (state, action) => {
      const value = action.payload;
      state.selectFilter = value;
    },
  },
  
});

export default todoSlice;

export const todoAction = todoSlice.actions;
