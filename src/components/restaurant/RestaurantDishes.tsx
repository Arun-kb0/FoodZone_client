import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { PlusIcon } from 'react-native-heroicons/solid'
import Rating from '../basic/Rating'
import RestaurantMenu from './RestaurantMenu'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useGetDisheInResturantQuery } from '../../features/auth/posts/postApiSlice'



const RestaurantDishes = () => {

  const {
    data: dishes,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetDisheInResturantQuery('')

  type dishType = typeof dishes[0]

  return (
    <View className='relative mt-2 mb-4' >

      {dishes?.map((dish: dishType) => (
        <RestaruantDishItem
          key={dish.id}
          id={dish.id}
          name={dish.dishName}
          imageUrl={dish.imageUrl}
          description={dish.description}
          price={dish.price}
          rating={dish.rating}

        />
      ))}

    </View>
  )
}

export default RestaurantDishes



type RestaruantDishItemType = {
  id: number,
  name: string,
  imageUrl: string,
  description: string,
  price: number,
  rating: number

}


const RestaruantDishItem = ({ id, name, imageUrl, description, price, rating }: RestaruantDishItemType) => {

  return (
    <View className='flex-row justify-between items-center my-1 rounded-xl bg-white mx-2 px-2 py-3'>
      <View className='space-y-1 overflow-hidden'>
        <Text className='text-lg font-semibold text-slate-600'>{name}</Text>
        <Rating stars={Math.floor(rating)} count={14} />
        <Text>{price} $</Text>
        <View className='h-auto w-56'>
          <Text className='mt-1 whitespace-pre-line text-slate-700'>{description}</Text>
        </View>
      </View>

      <View className='relative p-1'>
        <Image
          className='w-32 h-32 rounded-xl '
          source={{ uri: imageUrl }}
        />
        <TouchableOpacity className='absolute bottom-2  left-7 bg-red-300  opacity-90 w-20 h-10 rounded-lg flex justify-center items-center  '>
          <View className='flex-row  justify-center items-center space-x-1'>
            <Text className='text-lg font-semibold text-gray-800'>Add</Text>
            <PlusIcon size={22} color="#1e293b" />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}