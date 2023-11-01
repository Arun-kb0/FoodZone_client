import { apiSlice } from "../../app/api/apiSlice";

 
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData
      })
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body:userData
      })
    }),

    socialProviderLogin: builder.mutation({
      query: (userData) => ({
        url: '/auth/sociallogin',
        method: 'POST',
        body:userData
      })
    })
    
  })
})


export const {
  useSignUpMutation,
  useLoginMutation,
  useSocialProviderLoginMutation
} = authApiSlice