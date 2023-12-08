import {
  View, Text, SafeAreaView, Image, TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import SocialLogin from '../components/login/SocialLogin'
import Login from '../components/login/Login'
import { RootStackNavigationProp } from '../navigation/RootNavigator'
import { storage } from '../constants/mmkvStorage'

const LoginScreen = () => {

  const navigation = useNavigation<RootStackNavigationProp>()

  const handleSkip = () => {
    navigation.navigate('Main')
  }
  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen")
  }

  useEffect(() => {
    navigation.navigate('Main')
  }, [storage.contains('accessToken')])

  return (
    <SafeAreaView className='bg-white h-[100%] flex justify-end'>

      <TouchableOpacity className='absolute z-50 top-8 right-5 bg-gray-800 opacity-70 px-3 py-2 rounded-xl' onPress={handleSkip}>
        <Text className='text-gray-100 font-semibold text-lg '>Skip</Text>
      </TouchableOpacity>

      <Image
        className='w-full h-[60%] absolute top-0 z-0 '
        source={require('../images/login.jpg')}
      />
      
      <View className='flex items-center px-2 py-3 mt-5 space-y-2 rounded-t-3xl bg-white '>
        <Text className='text-2xl font-extrabold text-gray-700'>Food Delivery and Dining App</Text>
        <LoginTitle title='login' />

        <Login />

        <LoginTitle title='or' />
        <SocialLogin />

        <TouchableOpacity className='flex-row space-x-2 items-center justify-center' onPress={navigateToSignUp}>
          <Text className="text-gray-700 " >Dont have an account ?</Text>
          <Text className='text-lg text-red-600 font-semibold'>Sign up</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}


type loginTitlePropsType = {
  title: string
}

const LoginTitle = ({ title }: loginTitlePropsType) => (
  <View className='flex-row justify-center items-center space-x-3 py-2 my-2'>
    <View className=' bg-slate-200 shadow-2xl h-0.5 w-2/12 '></View>
    <Text className='text-lg tracking-widest  text-slate-700 font-semibold'>{title}</Text>
    <View className=' bg-slate-200 shadow-2xl h-0.5 w-2/12 '></View>
  </View>
)

export default LoginScreen

