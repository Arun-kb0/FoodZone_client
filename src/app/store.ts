import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice'
import postSlice from '../features/posts/postSlice';
import cartSlice from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    postSlice,
    cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  
  devTools:true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

