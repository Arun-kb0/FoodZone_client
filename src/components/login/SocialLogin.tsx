import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
import { AccessToken, Settings, LoginManager, Profile } from 'react-native-fbsdk-next';
import { FACEBOOK_AUTH_APP_ID } from '@env'
import { IconAntD } from '../../constants/icons';


const SocialLogin = () => {
  Settings.setAppID(FACEBOOK_AUTH_APP_ID)


  GoogleSignin.configure({})
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userData = await GoogleSignin.signIn()
      // const userData = await GoogleSignin.getTokens()
      console.log(userData)
    } catch (error: any) {
      console.log(error)
      if (error.code === statusCodes.IN_PROGRESS) {
        console.log("loading")
      }
    }
  }

  const handleLoginWithFB = () => {

    const getProfile = () => {
      Profile.getCurrentProfile()
        .then((currentProfile) => {
          if (currentProfile) {
            console.log("get profile success")
            console.log(currentProfile)
          }
        })
    }

    const getToken = () => {
      AccessToken.getCurrentAccessToken()
        .then((data) => {
          console.log("get accesstoken success")
          console.log(data?.accessToken.toString())
        })
    }

    LoginManager.logInWithPermissions(["public_profile"])
      .then(function (result) {
        if (result.isCancelled) {
          console.log("fb login Cancelled " + JSON.stringify(result))
        } else {
          console.log("fb login success")
          console.log(result.grantedPermissions?.toString())
          getProfile()
          getToken()
        }
      },
        function (error) {
          console.log("login failed ")
          console.log(error)
        }
      )
  }


  return (
    <View className='flex-row items-center justify-center space-x-2'>
      <GoogleSigninButton
        onPress={signIn}
        disabled={false}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
      />

      {/* <FbLoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log(error)
            } else if (result.isCancelled) {
              console.log("fb login cancelled")
            } else {
              FbAccessToken.getCurrentAccessToken()
                .then((data) => {
                  console.log(data)
                })
            }
          }
        }
        onLogoutFinished={() => console.log("fb logout")}
      /> */}

      <TouchableOpacity onPress={handleLoginWithFB}>
        <IconAntD name="facebook-square" size={46} color="#4267B2" />
      </TouchableOpacity>


    </View>
  )
}

export default SocialLogin