import { View, Text } from 'react-native'
import React from 'react'
import BackButton from '../basic/BackButton'

const UserHeader = () => {
  return (
    <View className='absolute z-50 bg-transparent  w-full pt-10 pb-2 px-1 flex-row items-center justify-around' >
      <View className='pl-2'>
        <BackButton />
      </View>
      <View className='flex-row justify-center items-center w-full'>
        <Text className='text-xl font-semibold '></Text>
      </View>
    </View>
  )
}

export default UserHeader