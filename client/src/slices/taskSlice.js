import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const taskSlice = createSlice({
  name: "task",
  initialState: [
    {
      id: 1,
      name: "task 1",
    },
    {
      id: 2,
      name: "task 2",
    },
  ],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        name: action.payload.name,
      };
      state.push(newTask);
    },
    deleteTaskRedux: (state, action) => {
      return state.filter((x) => x.id !== action.payload.id);
    },
    updateTaskRedux: (state, action) => {
      const index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTaskRedux, updateTaskRedux } = taskSlice.actions;

export default taskSlice.reducer;
