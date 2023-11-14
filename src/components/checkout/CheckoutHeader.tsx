import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import BackButton from '../basic/BackButton'

const CheckoutHeader = () => {
  const { selectedRestaurant } = useSelector((state: RootState) => state.postSlice)

  return (
    <View className='absolute z-50 bg-white w-full pt-10 pb-2 px-1 flex-row items-center justify-around'>
      <View className='pl-2'>
        <BackButton />
      </View>
      <View className='flex-row justify-center items-center w-full'>
        <Text className='text-xl font-semibold '>{selectedRestaurant ? selectedRestaurant?.Restaurant_Name : ''}</Text>
      </View>
    </View>
  )
}

export default CheckoutHeader