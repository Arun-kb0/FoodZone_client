import {
  View, Text, SafeAreaView, Image, TouchableOpacity,
  TextInput, TextInputChangeEventData, NativeSyntheticEvent
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { customeNavigateProp } from '../constants/constantTypes'



// ! google auth setup
const LoginScreen = () => {
  const navigation = useNavigation<customeNavigateProp>()
  const [phoneNum, setPhoneNum] = useState<number>()
  const [isError, setIsError] = useState(false)
  
  const handleSkip = () => {
    navigation.navigate('Main')
  }
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPhoneNum(parseInt(e.nativeEvent.text))
      setIsError(false)
  }

  const handlePhoneNumSignUp = () => {
    const phoneRegex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
    if (phoneRegex.test(`${phoneNum}`)) {
      console.log('phone number is valid')
      console.log(phoneNum)
    } else {
      console.warn('phone number is not valid')
      setIsError(true)
    }
  }

  useEffect(() => {
    // console.log('useEffect')
    // console.log(phoneNum)
    console.log(isError)
  }, [phoneNum, isError])


  
  
  return (
    <SafeAreaView className='bg-white h-[100%]'>
      <View className='relative w-full h-[50%] overflow-hidden object-cover'>
        <TouchableOpacity className='absolute z-50 top-8 right-5 bg-gray-800 opacity-70 px-3 py-2 rounded-xl  ' onPress={handleSkip}>
          <Text className='text-gray-100 font-semibold text-lg '>Skip</Text>
        </TouchableOpacity>
        <Image
          className='w-full h-full'
          source={require('../images/login.jpg')}
        />
      </View>

      <View className='flex items-center px-2 py-3'>
        <Text className='text-2xl font-extrabold text-gray-900'>Food Delivery and Dining App</Text>
        <LoginTitle title='login or sign up' />

        <View className='w-full px-2 py-1 space-y-3'>
          <TextInput className={`w-full border border-opacity-20 rounded-xl p-3 text-lg ${isError ? "border-red-400" : "border-green-200"}`}
            placeholder='enter phone number'
            keyboardType='numeric'
            onChange={handleChange}
          />
          {isError && <Text className='text-sm text-red-300 px-2'>invalid phone number</Text>}
          <TouchableOpacity className={` bg-red-500 flex items-center justify-center p-3 rounded-xl `} onPress={handlePhoneNumSignUp}>
            <Text className={`text-gray-100 text-xl font-semibold `}>continue</Text>
          </TouchableOpacity>
        </View>

        <LoginTitle title='or' />
        <TouchableOpacity className='bg-red-500 flex items-center justify-center p-3 rounded-xl '>
          <Text className='text-gray-100 text-xl font-semibold '>google auth</Text>
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
    <Text className='text-lg tracking-widest  text-slate-800 font-semibold'>{title}</Text>
    <View className=' bg-slate-200 shadow-2xl h-0.5 w-2/12 '></View>
  </View>
)

export default LoginScreen