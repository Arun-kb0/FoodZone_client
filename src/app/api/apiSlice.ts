import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PORT, IP_ADDRESS } from '@env'


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${IP_ADDRESS}:${PORT}` }),
  // baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.50.157:3000` }),
  tagTypes: ['RecomentedRestaruantPost', 'AllRestaurants', 'RestaurantDishes', 'RestaurantMenu'],
  endpoints: builder => ({ })
})

