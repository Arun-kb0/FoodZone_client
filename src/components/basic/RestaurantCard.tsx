
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native'
import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect } from 'react'
import { useAddFavoriteRestaurantMutation,  } from '../../features/posts/postApiSlice'
import { restaurantType } from '../../constants/constantTypes'
import { setFavoriteRestaurant, setFavoriteRestaurants, setRestaurants, setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction, Dispatch } from 'redux'
import {  IconIon, IconMatCom } from '../../constants/icons'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'



type restaurantCardType = {
  restaurant: restaurantType
  navigation: DeliveryScreenNavigationProps,
  dispatch: Dispatch<AnyAction>,
  isFav: boolean,
}

export const RestaurantCard = ({ navigation, dispatch, restaurant, isFav }: restaurantCardType) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { Restaurant_Name, Category, imageUrl, id } = restaurant

  useEffect(() => {
    setIsFavorite(isFav)
  }, [isFav])

  const [addFavoriteRestaurant, {
    data: favRestaurants,
    isError,
    error,
    isSuccess,
  }] = useAddFavoriteRestaurantMutation()

  const handleNavigate = useCallback(() => {
    dispatch(setSelectedRestaurant(restaurant))
    navigation.navigate('RestaurantScreen', { restaurant })
  }, [id])

  const handleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev)
    addFavoriteRestaurant({ id: restaurant.id })
  }, [restaurant.id])

  useEffect(() => {
    if (isSuccess && favRestaurants) {
      dispatch(setFavoriteRestaurant({ restaurantId: favRestaurants.restaurantId }))
    } else if (isError) {
      console.log(error)
    }
  }, [isSuccess, isError])

  return (
    <TouchableOpacity className={` h-64 mx-3 pb-2 bg-white rounded-2xl shadow-xl mb-4 space-x-4 space-y-1`} onPress={handleNavigate}>
      <View className='h-4/6 w-full relative'>
        <TouchableOpacity className='absolute z-20 right-2 top-1' onPress={handleFavorite}>
          {isFavorite
            ? <IconIon name='heart' size={32} className={`text-red-500 `} />
            : <IconIon name='heart-outline' size={32} className={`text-gray-300`} />
          }
        </TouchableOpacity>

        <Image
          source={{ uri: imageUrl }}
          className='w-full h-full rounded-t-2xl object-fill'
        />
      </View>

      <Text className='text-lg font-semibold text-gray-700'>{Restaurant_Name}</Text>

      <View className='flex-row items-center space-x-2'>
        <Text className='text-slate-500'>{Category[0]}</Text>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
      </View>

      <View className='flex-row space-x-2 items-center'>
        <View className='flex-row space-x-1 justify-center items-center'>
          <IconMatCom name="timer" size={22} color={"gray"} />
          <Text className='text-slate-500'>{`${30} min`}</Text>
        </View>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{'12 km'}</Text>
      </View>
    </TouchableOpacity>
  )
}