import { apiSlice } from "../../app/api/apiSlice";


export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getRecomentedResuturant: builder.query({
      query: () => ({ url: "/restaurant/all" }),
      providesTags:['RecomentedRestaruantPost']
    }),

    getAllResturants: builder.query({
      query: (page: number) => ({
        url: `/restaurant/all`,
        params:{page:page}
      }),
      providesTags:['AllRestaurants']
    }),

    getMenu: builder.query({
      query: () => ({ url: '/dish/menu' }),
      providesTags:['RestaurantMenu']
    }),

    getRestaurantDishes: builder.query({
      query: (restaurantId: string) => ({ url: `/restaurant/dishes?restaurantId=${restaurantId}` }),
      providesTags: ['RestaurantDishes']
    }),

    getFavoriteRestaurants: builder.query({
      query: () => ({ url: '/restaurant/favorites' }),
      providesTags: ['FavoriteRestaurants']
    }),

    addFavoriteResturant: builder.mutation({
      query: (restaurantId:string) => ({
        url: '/restaurant/favorites',
        method: 'POST',
        body: {
          restaurantId
        }
      }),
    }),

  })
})


export const {
  useGetRecomentedResuturantQuery,
  useGetAllResturantsQuery,
  useLazyGetAllResturantsQuery,
  useGetMenuQuery,
  useGetRestaurantDishesQuery,
  useAddFavoriteResturantMutation,
  useGetFavoriteRestaurantsQuery
} = postApiSlice