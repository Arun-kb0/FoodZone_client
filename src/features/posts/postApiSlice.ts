import { apiSlice } from "../../app/api/apiSlice";

type getRestaurantDishesQueryParamsType = {
  restaurantId: string,
  page: number
}


export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getRecomentedResuturant: builder.query({
      query: () => ({ url: "/restaurant/all" }),
      providesTags: ['RecomentedRestaruantPost']
    }),

    getAllResturants: builder.query({
      query: (page: number) => ({
        url: `/restaurant/all`,
        params: { page }
      }),
      providesTags: ['AllRestaurants']
    }),

    getMenu: builder.query({
      query: () => ({ url: '/dish/menu' }),
      providesTags: ['RestaurantMenu']
    }),

    getRestaurantDishes: builder.query({
      query: ({ restaurantId, page }: getRestaurantDishesQueryParamsType) => ({
        url: `/restaurant/dishes`,
        params: { restaurantId, page }
      }),
      providesTags: ['RestaurantDishes']
    }),

    getFavoriteRestaurants: builder.query({
      query: () => ({ url: '/restaurant/favorites' }),
      providesTags: ['FavoriteRestaurants']
    }),

    addFavoriteResturant: builder.mutation({
      query: (restaurantId: string) => ({
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
  useLazyGetAllResturantsQuery,
  useGetMenuQuery,
  useLazyGetRestaurantDishesQuery,
  useGetRestaurantDishesQuery,
  useAddFavoriteResturantMutation,
  useGetFavoriteRestaurantsQuery
} = postApiSlice