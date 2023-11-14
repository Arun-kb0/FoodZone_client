import { View, Text } from 'react-native'
import React from 'react'
import { IconAntD, IconMatCom } from '../../constants/icons';


type restaurantDetailsPropsType = {
  id: string;
  name: string;
  cuisine: string;
  deliveryDelay: string;
  imageUrl: string;
  distance: string;
  rating: string;
}



const RestaurantDetails = ({ name, cuisine, deliveryDelay, imageUrl, rating, distance }: restaurantDetailsPropsType) => {

  return (
    <View className='flex items-center justify-center  bg-white space-y-2'>
      <Text className='text-xl font-bold '>{name}</Text>
      <Text className='text-sm text-slate-400 '>{cuisine}</Text>

      <View className='flex-row items-center justify-center '>
        <View className='flex-row justify-center items-center bg-green-600 rounded-lg py-1 px-2  '>
          <Text className='text-sm text-white font-semibold '>{rating} </Text>
          <IconAntD name="star" size={17} color={"white"} />
        </View>
        <Text className='text-sm text-slate-600 '> Rating </Text>
      </View>

      <View className='flex-row  justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-lg my-1'>
        <IconMatCom name="timer" size={22} color={"gray"} />
        <Text className='text-slate-500 text-sm'>{deliveryDelay} min</Text>
        <View className='bg-gray-500 p-0.5 rounded-full '></View>
        <Text className='text-slate-500 text-sm'>{distance}</Text>
        <View className='bg-gray-500 w-0.5  py-1.5  '></View>
        <Text className='text-slate-500 text-sm'>{'location'}</Text>
      </View>
    </View>
  )
}

export default RestaurantDetails