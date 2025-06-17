import { configureStore } from "@reduxjs/toolkit";
import { doneTodoReducer } from "./DoneTodoSlice";
import { onGoingTodoReducer } from "./OnGoingTodoSlice";
import { yetToStartTodoReducer } from "./YetToStartTodoSlice";

export enum Section {
  YetToStart = "YetToStart",
  OnGoing = "OnGoing",
  Done = "Done",
}

export const store = configureStore({
  reducer: {
    doneTodo: doneTodoReducer,
    onGoingTodo: onGoingTodoReducer,
    yetToStartTodo: yetToStartTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch