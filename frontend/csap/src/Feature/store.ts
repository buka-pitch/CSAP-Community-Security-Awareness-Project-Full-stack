import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import UserReducer from "./User/UserSlice";
import CourseReducer from "./Course/CourseSlice";
import AdminStatsReducer from "./Admin/AdminStatsSlice";
// import thunk from "redux-thunk";

const rootPersistConfig = {
  key: "root",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, UserReducer),
  course: persistReducer(rootPersistConfig, CourseReducer),
  admin: persistReducer(userPersistConfig, AdminStatsReducer),
});

export const persistedReducer = rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
