import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Image, Alert
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {  customeNavigateProp } from '../constants/constantTypes'
import SignUpHeader from '../components/login/SignUpHeader'
import { useSignUpMutation } from '../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../features/auth/authSlice'


const SignUpScreen = () => {

  const naviagtion = useNavigation<customeNavigateProp>()
  const dispatch = useDispatch()
  const [
    signUp,
    { data: signUpResponse,
      isLoading: signUpisLoading,
      isSuccess: signUpisSuccess,
      isError: signUpisError,
      error: signUpError
    }] = useSignUpMutation()

  useLayoutEffect(() => {
    naviagtion.setOptions({
      header: () => <SignUpHeader />
    })
  }, [])

  type isErrorType = {
    error: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword?: boolean;
    phone: boolean;
  }
  type signUpStateType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
  }
  type signUpStateRegEx = {
    name: RegExp,
    email: RegExp,
    password: RegExp,
    confirmPassword: RegExp,
    phone: RegExp
  }

  const initSignUpState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  }
  const initErorrState = {
    error: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
  }

  const [regex, setRegex] = useState<signUpStateRegEx>({
    name: /^[A-Za-z\s'-]+$/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=*!]*$/,
    confirmPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=*!]*$/,
    phone: /^\d{10}$/
  })
  const [signUpState, setSignUpState] = useState<signUpStateType>(initSignUpState)
  const [isError, setIsError] = useState<isErrorType>(initErorrState)



  type handleChanngeType = {
    name: 'name' | 'email' | 'password' | 'confirmPassword' | 'phone',
    value: string
  }
  const handleChange = ({ name, value }: handleChanngeType) => {
    setSignUpState(prev => ({
      ...prev,
      [name]: value
    }))

    // ! fix needed 
    // if (name === 'phone') {
    // console.log((name === 'phone' && value !== '') ? regex.phone.test(value) : !isError.phone)
    // }

    const isEmailValid = name === 'email' ? regex.email.test(value) : !isError.email;
    const isPasswordValid = name === 'password' ? regex.password.test(value) : !isError.password;
    const isConfirmPasswordValid = name === 'confirmPassword' ? initSignUpState.password === initSignUpState.confirmPassword : !isError.confirmPassword;
    const isPhoneValid = name === 'phone' ? regex.phone.test(value) : !isError.phone;
    const isNameValid = name === 'name' ? regex.name.test(value) : !isError.name;
    setIsError({
      name: !isNameValid,
      email: !isEmailValid,
      password: !isPasswordValid,
      confirmPassword: !isConfirmPasswordValid,
      phone: !isPhoneValid,
      error: !(isNameValid && isEmailValid && isPasswordValid),
    })
  }


  const handleLogin = async () => {
    const isEmailEmpty = signUpState.email.length === 0
    const isNameEmpty = signUpState.name.length === 0
    const isPasswordEmpty = signUpState.password.length === 0
    const isConfirmPasswordOk = (signUpState.confirmPassword.length === 0 || signUpState.confirmPassword !== signUpState.password)
    const isAnyError = isEmailEmpty || isNameEmpty || isPasswordEmpty || isConfirmPasswordOk || isError.error
    if (isAnyError) {
      setIsError(prev => ({
        ...prev,
        name: isNameEmpty,
        email: isEmailEmpty,
        password: isPasswordEmpty,
        confirmPassword: isConfirmPasswordOk,
        error: isAnyError
      }))
      console.log("login input error")
    } else {
      // console.log(signUpState.email.length)
      // console.log(signUpState)
      try {
        await signUp(signUpState).unwrap()
      } catch (error) {
        console.log(error)
      }
    }
  }


  // useEffect(() => {
  // console.log(isError)
  // console.log(signUpState)
  // }, [signUpState, handleLogin])


  useEffect(() => {
    if (signUpisSuccess) {
      console.log(signUpResponse)
      dispatch(setAuthData({
        provider: 'custom',
        user: signUpResponse.user,
        accessToken: signUpResponse.accessToken
      }))
      setSignUpState(initSignUpState)
      naviagtion.navigate('Main')
    }
    if (signUpError && 'data' in signUpError) {
      Alert.alert(
        'SignUp',
        JSON.stringify(signUpError.data?.message),
        [{
          text: 'OK',
          onPress: () => console.log("ok")
        }]
      )
    }
  }, [signUpisSuccess, signUpisError])



  return (
    <SafeAreaView className='flex justify-end items-center h-full bg-white'>

      <Image
        className='w-full h-[62%] absolute top-0'
        source={require('../images/signup.jpg')}
      />

      <View className='w-full h-auto bg-white  z-20 rounded-3xl pt-2'>

        <ScrollView className='w-full px-2 py-1 space-y-3 pb-5'>
          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.name ? "border-red-400" : "border-green-200"}`}
            placeholder='enter name'
            keyboardType='default'
            value={signUpState.name}
            onChangeText={(text) => handleChange({ name: 'name', value: text })}
          />
          {isError.name && <Text className='text-sm text-red-300 px-2'>invalid Name</Text>}


          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.email ? "border-red-400" : "border-green-200"}`}
            placeholder='enter email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={signUpState.email}
            onChangeText={(text) => handleChange({ name: 'email', value: text })}
          />
          {isError.email && <Text className='text-sm text-red-300 px-2'>invalid Email</Text>}

          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.password ? "border-red-400" : "border-green-200"}`}
            placeholder='enter password'
            secureTextEntry={true}
            autoCorrect={false}
            value={signUpState.password}
            onChangeText={(text) => handleChange({ name: "password", value: text })}
          />
          {isError.password && <Text className='text-sm text-red-300 px-2'>invalid Password</Text>}

          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.confirmPassword ? "border-red-400" : "border-green-200"}`}
            placeholder='confirm password'
            secureTextEntry={true}
            autoCorrect={false}
            value={signUpState.confirmPassword}
            onChangeText={(text) => handleChange({ name: "confirmPassword", value: text })}
          />
          {isError.confirmPassword && <Text className='text-sm text-red-300 px-2'>Password confirmation does not match the password</Text>}

          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError.phone ? "border-red-400" : "border-green-200"}`}
            placeholder='enter phone (optional)'
            keyboardType='number-pad'

            value={signUpState.phone}
            onChangeText={(text) => handleChange({ name: 'phone', value: text })}
          />
          {isError.phone && <Text className='text-sm text-red-300 px-2'>invalid Phone</Text>}

          <TouchableOpacity className={` bg-red-500 flex items-center justify-center p-3 rounded-xl ${isError.error && 'bg-gray-500 opacity-60 '}`}
            onPress={handleLogin}
            disabled={isError.error}
          >
            <Text className={`text-gray-100 text-xl font-semibold `}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SignUpScreen