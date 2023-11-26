import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: [
    {
      id: "A001",
      name: "task 1",
    },
    {
      id: "A002",
      name: "task 2",
    },
  ],
  reducers: {
    addTaskRedux: (state, action) => {
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
export const { addTaskRedux, deleteTaskRedux, updateTaskRedux } =
  taskSlice.actions;

export default taskSlice.reducer;
