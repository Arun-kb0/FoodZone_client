import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mmkvkeys, storage } from "../../constants/mmkvStorage";


type authState = {
  id: null | string,
  name: null | string,
  email: null | string,
  photo: null | string,
  phone: null | string
}

const initialState: authState = {
  id: null,
  name: null,
  email: null,
  photo: null,
  phone: null,
}

type setAuthDataPayloadType = {
  provider: 'meta' | 'google' | 'custom',
  accessToken: string | undefined | null,
  refreshToken?: string,
  user: {
    id: string | null | undefined,
    name?: string | undefined | null,
    givenName?:string | undefined | null
    photo?: string | undefined | null,
    imageUrl?: string | undefined | null,
    email: string |undefined | null,
    phone?:string | undefined | null
  }
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<setAuthDataPayloadType>) {
      const { provider, user, accessToken, refreshToken } = action.payload

      console.log('auth slice ')

      if (provider === 'google') {
        state.id = user.id ? user.id : null
        state.name = user.givenName ? user.givenName : null
        state.photo = user.photo  ? user.photo : null
        state.email = user.email ? user.email :null
        storage.set(mmkvkeys.tokenProvider, 'google')
      }

      if (provider === 'meta') {
        state.id = user.id ? user.id : null
        state.name = user.name ? user.name : null
        state.photo = user.photo ? user.photo : null
        state.email = user.email ? user.email : null
        storage.set(mmkvkeys.tokenProvider, 'meta')
      }

      if (provider === 'custom') {
        state.id = user.id ? user.id : null
        state.name = user.name ? user.name : null
        state.photo = user.imageUrl ? user.imageUrl : null
        state.email = user.email ? user.email : null
        state.phone = user.phone ? user.phone : null
        storage.set(mmkvkeys.tokenProvider, 'custom')
        refreshToken && storage.set(mmkvkeys.refreshToken, refreshToken)
      }

      accessToken
        ? storage.set(mmkvkeys.accessToken, accessToken)
        : console.warn('no access token')
      console.log(state)
    },

    clearAuthData(state) {
      state = initialState
      storage.clearAll()
    },


  }
})


export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer