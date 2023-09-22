import { View, Text } from 'react-native'
import { ClockIcon, StarIcon } from 'react-native-heroicons/solid'
import React from 'react'
import { RestaruantType } from '../../constants/constantTypes'



const RestaurantDetails = ({ restaurantName, restaurantType, deliveryDelay, imageUrl }:RestaruantType) => {
  
  return (
    <View className='flex items-center justify-center  bg-white space-y-2'>
      <Text className='text-xl font-bold '>{restaurantName}</Text>
      <Text className='text-sm text-slate-400 '>{restaurantType}</Text>

      <View className='flex-row items-center justify-center '>
        <View className='flex-row justify-center items-center bg-green-600 rounded-lg py-1 px-2  '>
          <Text className='text-sm text-white font-semibold '> 3.7 </Text>
          <StarIcon size={20} color="white" />
        </View>
        <Text className='text-sm text-slate-600 '> Rating </Text>
      </View>

      <View className='flex-row  justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-lg my-1'>
        <ClockIcon size={20} color='gray' />
        <Text className='text-slate-500 text-sm'>{deliveryDelay} min</Text>
        <View className='bg-gray-500 p-0.5 rounded-full '></View>
        <Text className='text-slate-500 text-sm'>9 km</Text>
        <View className='bg-gray-500 w-0.5  py-1.5  '></View>
        <Text className='text-slate-500 text-sm'>location</Text>
      </View>
    </View>
  )
}

export default RestaurantDetails