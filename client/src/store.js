import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import taskReducer from "./slices/taskSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});
