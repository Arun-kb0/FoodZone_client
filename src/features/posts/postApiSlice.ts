import { apiSlice } from "../../app/api/apiSlice";
import { addFavoriteResturantResType, getAllRestaurantsQueryResType, getFavoriteRestaurantsResType, getRestaurantDishesResType, restaurantType } from "../../constants/constantTypes";

type getRestaurantDishesQueryParamsType = {
  restaurantId: string,
  page: number
}
type getAllResturantsQueryParamsType = {
  page: number
}
type addFavoriteResturantPropType = Pick<restaurantType, 'id'>




export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getRecomentedResuturant: builder.query<getAllRestaurantsQueryResType, void>({
      query: () => ({ url: "/restaurant/all" }),
      providesTags: ['RecomentedRestaruantPost']
    }),

    getAllResturants: builder.query<getAllRestaurantsQueryResType, getAllResturantsQueryParamsType>({
      query: ({ page }: getAllResturantsQueryParamsType) => ({
        url: `/restaurant/all`,
        params: { page }
      }),
      providesTags: ['AllRestaurants']
    }),

    getMenu: builder.query({
      query: () => ({ url: '/dish/menu' }),
      providesTags: ['RestaurantMenu']
    }),

    getRestaurantDishes: builder.query<getRestaurantDishesResType, getRestaurantDishesQueryParamsType>({
      query: ({ restaurantId, page }: getRestaurantDishesQueryParamsType) => ({
        url: `/restaurant/dishes`,
        params: { restaurantId, page }
      }),
      providesTags: ['RestaurantDishes']
    }),

    getFavoriteRestaurants: builder.query<getFavoriteRestaurantsResType, void>({
      query: () => ({ url: '/restaurant/favorites' }),
      providesTags: ['FavoriteRestaurants']
    }),

    addFavoriteResturant: builder.mutation<addFavoriteResturantResType, addFavoriteResturantPropType>({
      query: ({id}) => ({
        url: '/restaurant/favorites',
        method: 'POST',
        body: {
          restaurantId:id
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