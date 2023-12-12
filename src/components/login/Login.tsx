import {
  View, Text, TouchableOpacity, TextInput,Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../features/auth/authSlice'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'
import { RootStackNavigationProp } from '../../navigation/RootNavigator'


type isErrorType = {
  error: boolean;
  email: boolean;
  password: boolean;
}
type loginStateType = {
  email: string,
  password: string
}
type loginStateRegEx = {
  email: RegExp,
  password: RegExp
}


const Login = () => {

  const navigation = useNavigation<RootStackNavigationProp>()
  const dispatch = useDispatch()
  const [
    login, {
      data: loginData,
      isError: loginIsError,
      isSuccess: loginIsSuccess,
      isLoading: loginIsLoading,
      error: loginError,
    }
  ] = useLoginMutation()

  const initLoginState = {
    email: '',
    password: ''
  }
  const initErrorState = {
    error: false,
    email: false,
    password: false
  }

  const [regex, setRegex] = useState<loginStateRegEx>({
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=*!]*$/
  })
  const [loginState, setLoginState] = useState<loginStateType>(initLoginState)
  const [isError, setIsError] = useState<isErrorType>(initErrorState)



  type handleChangeType = {
    name: 'email' | 'password',
    value: string
  }
  const handleChange = ({ name, value }: handleChangeType) => {
    setLoginState(prev => ({
      ...prev,
      [name]: value
    }))

    const isEmailValid = name === 'email' ? regex.email.test(value) : !isError.email;
    const isPasswordValid = name === 'password' ? regex.password.test(value) : !isError.password;
    setIsError({
      email: !isEmailValid,
      password: !isPasswordValid,
      error: !(isEmailValid && isPasswordValid),
    })
  }

  const handleLogin = async () => {
    const isEmailEmpty = loginState.email.length === 0
    const isPasswordEmpty = loginState.password.length === 0
    const isAnyError = isEmailEmpty || isPasswordEmpty || isError.error

    if (isAnyError) {
      setIsError({
        email: isEmailEmpty,
        password: isPasswordEmpty,
        error: isAnyError,
      })
      console.log("login input error")
    } else {
      try {
        await login(loginState).unwrap()
        console.log("login success")
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
    if (loginIsSuccess) {
      dispatch(setAuthData({
        provider: 'custom',
        user: loginData?.user,
        accessToken: loginData?.accessToken,
        refreshToken: loginData?.refreshToken
      }))
      setLoginState(initLoginState)
      navigation.navigate('Main')
    }
    if (loginError && 'data' in loginError) {
      Alert.alert(
        'Login',
        JSON.stringify(loginError.data?.message),
        [{text: 'OK',}]
      )
    }
  },[loginIsError,loginIsSuccess])

  // useEffect(() => {
    // console.log(isError)
    // console.log(loginState)
    // console.log(storage.getString(mmkvkeys.refreshToken))
  // }, [loginState, handleLogin,dispatch])

  return (
    <View className='w-full px-2 py-1 space-y-3'>

      <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.email ? "border-red-400" : "border-green-200"}`}
        placeholder='enter email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={loginState.email}
        onChangeText={(text) => handleChange({ name: 'email', value: text })}
      />
      {isError.email && <Text className='text-sm text-red-300 px-2'>invalid Email</Text>}

      <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.password ? "border-red-400" : "border-green-200"}`}
        placeholder='enter password'
        secureTextEntry={true}
        autoCorrect={false}
        value={loginState.password}
        onChangeText={(text) => handleChange({ name: "password", value: text })}
      />
      {isError.password && <Text className='text-sm text-red-300 px-2'>invalid Password</Text>}

      <TouchableOpacity className={` bg-red-500 flex items-center justify-center p-3 rounded-xl ${isError.error && 'bg-gray-500 opacity-60 '}`}
        onPress={handleLogin}
        disabled={isError.error}
      >
        <Text className={`text-gray-100 text-xl font-semibold `}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login