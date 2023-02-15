import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/room";
import chatReducer from "./slices/chat";
import authReducer from "./slices/auth";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { api } from "./queries/chatQueries";

export const store = configureStore({
  reducer: combineReducers({
    api: api.reducer,
    auth: authReducer,
    room: roomReducer,
    chat: chatReducer,
  }),

  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware);
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
