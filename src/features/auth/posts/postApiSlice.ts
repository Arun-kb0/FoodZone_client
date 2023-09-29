import { apiSlice } from "../../../app/api/apiSlice";


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
      providesTags:['RestaurantDishes']
    })


  })
})


export const {
  useGetRecomentedResuturantQuery,
  useGetAllResturantsQuery,
  useGetMenuQuery,

} = postApiSlice