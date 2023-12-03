import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
import { AccessToken, Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import { FACEBOOK_AUTH_APP_ID } from '@env'
import { IconAntD } from '../../constants/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setAuthData } from '../../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { mmkvkeys, storage } from '../../constants/mmkvStorage';
import { useSocialProviderLoginMutation } from '../../features/auth/authApiSlice';
import {GOOGLE_ACCOUNT_NAME} from '@env'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator';
import { RootStackNavigationProp } from '../../navigation/RootNavigator';


const SocialLogin = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const dispatch = useDispatch()
  const { name, email, id, photo } = useSelector((state: RootState) => state.authSlice)

  const [
    socialProviderLogin , {
      isSuccess,isError,error
    }
  ] = useSocialProviderLoginMutation()

  Settings.setAppID(FACEBOOK_AUTH_APP_ID)
  GoogleSignin.configure({})

  const LoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userData = await GoogleSignin.signIn()
      const token = await GoogleSignin.getTokens()
      console.log("google auth")
      console.log(token,'\n')

      const user = {
        id : userData.user.id,
        name : userData.user.name,
        photo : userData.user.photo,
        email : userData.user.email,
      }
      dispatch(setAuthData({
        provider: 'google',
        user:user,
        accessToken: token.accessToken
      }))

      await socialProviderLogin(userData.user).unwrap()
      // console.log(userData)
    } catch (error: any) {
      console.log(error)
      if (error.code === statusCodes.IN_PROGRESS) {
        console.log("loading")
      }
    }
  }

  const LoginWithFB = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile"])
      if (result.isCancelled) {
        console.log("fb login Cancelled " + JSON.stringify(result))
      } else {
        console.log("fb login success")

        const userData = await Profile.getCurrentProfile()
        const token = await AccessToken.getCurrentAccessToken()
        const user = {
          id: userData?.userID,
          name: userData?.name,
          email: userData?.email,
          photo: userData?.imageURL,
        }
        dispatch(setAuthData({
          provider: 'meta',
          user: user,
          accessToken: token?.accessToken
        }))
        await socialProviderLogin(user).unwrap()
      }
    } catch (error) {
      console.log("login failed ")
      console.log(error)
    }
  }

  useEffect(() => {
    navigation.navigate('Main')
  },[isSuccess])



  // * console log
  useEffect(() => {
    isSuccess && console.log('add social user details in API success')
    isError && console.log('add social user details in API failed')
    console.log(name, email, id, photo)
    const data = storage.getString(mmkvkeys.accessToken)
    console.log("mmkv    ", data)
  }, [id,isSuccess,isError])


  return (
    <View className='flex-row items-center justify-center space-x-2'>
      <GoogleSigninButton
        onPress={LoginWithGoogle}
        disabled={false}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
      />

      <TouchableOpacity onPress={LoginWithFB}>
        <IconAntD name="facebook-square" size={46} color="#4267B2" />
      </TouchableOpacity>
    </View>
  )
}

export default SocialLogin