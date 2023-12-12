import { apiSlice } from "../../app/api/apiSlice";
import {
  addFavoriteRestaurantResType, getAllRestaurantsQueryResType,
  getFavoriteRestaurantsResType,getMenuResType,
  getRestaurantByIdResType, getRestaurantDishesResType,
  restaurantType, searchDishInRestaurantsResType
} from "../../constants/constantTypes";

type getRestaurantDishesQueryParamsType = {
  restaurantId: string,
  page: number
}
type getAllRestaurantsQueryParamsType = {
  page: number
}
type addFavoriteRestaurantQueryParamType = Pick<restaurantType, 'id'>
type searchDishInRestaurantsQueryParamType = {
  searchInput: string,
  page: number
}
type getRestaurantByIdQueryParamType = {id:string}



export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getRecommendedRestaurant: builder.query<getAllRestaurantsQueryResType, void>({
      query: () => ({ url: "/restaurant/all" }),
      providesTags: ['RecommendedRestaurantPost']
    }),

    getAllRestaurants: builder.query<getAllRestaurantsQueryResType, getAllRestaurantsQueryParamsType>({
      query: ({ page }) => ({
        url: `/restaurant/all`,
        params: { page }
      }),
      providesTags: ['AllRestaurants']
    }),

    getMenu: builder.query<getMenuResType, void>({
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

    addFavoriteRestaurant: builder.mutation<addFavoriteRestaurantResType, addFavoriteRestaurantQueryParamType>({
      query: ({ id }) => ({
        url: '/restaurant/favorites',
        method: 'POST',
        body: {
          restaurantId: id
        }
      }),
    }),

    searchDishInRestaurants: builder.query<searchDishInRestaurantsResType, searchDishInRestaurantsQueryParamType>({
      query: ({ searchInput, page }) => ({
        url: '/restaurant/searchdish',
        params: { dishName: searchInput, page }
      })
    }),

    getRestaurantById: builder.query<getRestaurantByIdResType, getRestaurantByIdQueryParamType>({
      query: ({ id }) => ({
        url: '/restaurant/find',
        params: { restaurantId: id}
      })
    })

  })
})


export const {
  useGetRecommendedRestaurantQuery,
  useLazyGetAllRestaurantsQuery,
  useGetMenuQuery,
  useLazyGetRestaurantDishesQuery,
  useGetRestaurantDishesQuery,
  useAddFavoriteRestaurantMutation,
  useGetFavoriteRestaurantsQuery,
  useLazySearchDishInRestaurantsQuery,
  useLazyGetRestaurantByIdQuery
} = postApiSlice