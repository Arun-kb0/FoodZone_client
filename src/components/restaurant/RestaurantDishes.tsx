import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { PlusIcon } from 'react-native-heroicons/solid'
import Rating from '../basic/Rating'
import RestaurantMenu from './RestaurantMenu'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'


const dishMenuList = [
  {
    id: 1,
    dishName: 'Spaghetti',
    imageUrl: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    dishName: 'Paztha',
    imageUrl: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    dishName: 'Pizza',
    imageUrl: "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?b=1&s=612x612&w=0&k=20&c=ZcLXrogjpyc5froC5ZIP-0uepbhldATwmCbt3mzViGQ=",
  },
  {
    id: 4,
    dishName: 'Sushi',
    imageUrl: 'https://images.pexels.com/photos/7245465/pexels-photo-7245465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    dishName: 'Cake',
    imageUrl: 'https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=600',
  },

]
// ! move menu to restaruant screen 

const RestaurantDishes = () => {


  return (
    <View className='relative mt-2 mb-4' >

      {dishMenuList.map(dish => (
        <RestaruantDishItem
          key={dish.id}
          id={dish.id}
          name={dish.dishName}
          imageUrl={dish.imageUrl}
        />
      ))}

    </View>
  )
}

export default RestaurantDishes



type RestaruantDishItemType = {
  id: number,
  name: string,
  imageUrl: string
}

const RestaruantDishItem = ({ id, name, imageUrl }: RestaruantDishItemType) => {

  return (
    <View className='flex-row justify-between items-center my-1 rounded-xl bg-white mx-2 px-2 py-3'>
      <View className='space-y-2 overflow-hidden'>
        <Text className='text-lg font-semibold text-slate-600'>{name}</Text>

        <Rating stars={4} count={14} />

        <Text>165 $</Text>
        <Text>
          discription
        </Text>
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