import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/room";
import chatReducer from "./slices/chat";

export const store = configureStore({
  reducer: combineReducers({
    room: roomReducer,
    chat: chatReducer,
  }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
