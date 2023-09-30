import { apiSlice } from "../../app/api/apiSlice";


export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getRecomentedResuturant: builder.query({
      query: () => ({ url: "/restaurant/all" }),
      providesTags:['RecomentedRestaruantPost']
    }),

    getAllResturants: builder.query({
      query: () => ({ url: "/restaurant/all" }),
      providesTags:['AllRestaurants']

    }),

    getMenu: builder.query({
      query: () => ({ url: '/dish/menu' }),
      providesTags:['RestaurantMenu']
    }),

    getRestaurantDishes: builder.query({
      query: (restaurantId: string) => ({ url: `/restaurant/dishes?restaurantId=${restaurantId}` }),
      // providesTags['RestaurantDishes']
    })


  })
})


export const {
  useGetRecomentedResuturantQuery,
  useGetAllResturantsQuery,
  useGetMenuQuery,
  useGetRestaurantDishesQuery

} = postApiSlice