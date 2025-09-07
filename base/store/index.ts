/// <reference types="redux-persist" />
import storage from "redux-persist/lib/storage"; // localStorage
import {  configureStore } from '@reduxjs/toolkit'
import { CART_LOCAL_STORAGE_KEY, ORDER_LOCAL_STORAGE_KEY, SESSION_LOCAL_STORAGE_KEY } from '../utils/constants';
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./slices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [SESSION_LOCAL_STORAGE_KEY, CART_LOCAL_STORAGE_KEY, ORDER_LOCAL_STORAGE_KEY],
    blacklist: []
    
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false, 
  })
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;