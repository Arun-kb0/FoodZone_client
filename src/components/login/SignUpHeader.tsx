import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import BackButton from '../basic/BackButton'

const SignUpHeader = () => {

  return (
    <View className='absolute z-50 w-full pt-10 pb-2 px-1 flex-row items-center justify-around'>
      <View className='pl-2'>
        <BackButton />
      </View>
      <View className='flex-row justify-center items-center w-full'>
        <Text className='text-2xl font-bold text-gray-700 '>Sign Up</Text>
      </View>
    </View>
  )
}

export default SignUpHeader