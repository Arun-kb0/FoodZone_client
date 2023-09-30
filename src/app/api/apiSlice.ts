import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.28.157:3000" }),
  tagTypes: ['RecomentedRestaruantPost', 'AllRestaurants', 'RestaurantDishes', 'RestaurantMenu'],
  endpoints: builder => ({ })
})

