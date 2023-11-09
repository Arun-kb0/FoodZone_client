import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PORT, IP_ADDRESS } from '@env'
import { storage, mmkvkeys } from '../../constants/mmkvStorage'
import { clearAuthData, setAuthData } from '../../features/auth/authSlice'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


interface customeResErrorType {
  data: {
    error: string
    message: string,
  }
}


const baseQuery = fetchBaseQuery({
  baseUrl: `http://${IP_ADDRESS}:${PORT}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = storage.getString(mmkvkeys.accessToken)
    const provider = storage.getString(mmkvkeys.tokenProvider)
    console.log(provider)
    if (token && provider) {
      headers.set("authorization", `Bearer ${token}`)
      headers.set('tokenprovider', provider)
    }
    return headers
  }
})


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any): Promise<any> => {
  console.log("baseQueryWithReauth  ")

  try {
    let result = await baseQuery(args, api, extraOptions)
    console.log('result ', result?.error)
    const provider = storage.getString(mmkvkeys.tokenProvider)

    const isGoogleTokenValid = provider === 'google' && await GoogleSignin.isSignedIn()
    console.log("isGoogleTokenValid ", isGoogleTokenValid)

    if (provider === 'custom' && result?.error?.status === 401) {
      console.log('sending refresh token')
      const refreshToken = storage.getString(mmkvkeys.refreshToken)
      const refreshResult = await baseQuery(`/auth/refresh?refreshToken=${refreshToken}`, api, extraOptions)
      console.log('refreshResult ', typeof (refreshResult))
      // console.log(refreshResult)
      const data = refreshResult?.data;

      if (data && typeof (data) === 'object' && 'accessToken' in data && typeof (data.accessToken) === 'string') {
        storage.set(mmkvkeys.accessToken, data.accessToken)
        result = await baseQuery(args, api, extraOptions)
        console.log('logged in with refresh token')
      } else {
        storage.delete(mmkvkeys.accessToken)
        storage.delete(mmkvkeys.refreshToken)
        api.dispatch(clearAuthData())
        console.log('logout')
      }
    } else if (provider === 'google' && result?.error?.status === 401) {
      console.log('google auth refresh')
      const accessToken = storage.getString(mmkvkeys.accessToken)
      if (accessToken) {
        const isExpiered = await GoogleSignin.isSignedIn()
        await GoogleSignin.clearCachedAccessToken(accessToken)
        await GoogleSignin.hasPlayServices()
        const userData = await GoogleSignin.signIn()
        const token = await GoogleSignin.getTokens()
        console.log("isExpiered", isExpiered)
        console.log("userData")
        console.log(userData)

        const user = {
          id: userData.user?.id,
          name: userData.user?.name,
          photo: userData.user?.photo,
          email: userData.user?.email,
        }
        api.dispatch(setAuthData({
          provider,
          user: user,
          accessToken: token.accessToken,
        }))
        console.log('accessToken length ', accessToken.length)
      }
    }
    return result

  } catch (error) {
    console.log(error);
  }

}




export const apiSlice = createApi({
  reducerPath: 'api',
  // baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, customeResErrorType, {}>,
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, customeResErrorType, {}>,
  tagTypes: [
    'RecomentedRestaruantPost', 'AllRestaurants', 'RestaurantDishes',
    'RestaurantMenu', 'FavoriteRestaurants', 'RestaurantDishes',
    'addFavoriteRestaurant',
  ],
  endpoints: builder => ({})
})



