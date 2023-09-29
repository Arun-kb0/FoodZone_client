import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { ClockIcon } from 'react-native-heroicons/solid'

import ListHeading from '../basic/ListHeading'
import {  useNavigation } from '@react-navigation/native'
import { RestaruantType, customeNavigateProp } from '../../constants/constantTypes'
import { useGetRecomentedResuturantQuery } from '../../features/auth/posts/postApiSlice'


const recomentedData = [
  {
    id: 1,
    restaurantName: "Restaurant A",
    restaurantType: "Italian",
    deliveryDelay: "10-20",
    imageUrl: "https://images.pexels.com/photos/17216084/pexels-photo-17216084/free-photo-of-croissants-and-fruit-behind.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    restaurantName: "Restaurant B",
    restaurantType: "Mexican",
    deliveryDelay: "40-50",
    imageUrl: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    restaurantName: "Restaurant C",
    restaurantType: "Japanese",
    deliveryDelay: "20-30",
    imageUrl: "https://images.pexels.com/photos/17593640/pexels-photo-17593640/free-photo-of-food-restaurant-spoon-drinks.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    restaurantName: "Restaurant x",
    restaurantType: "Japanese",
    deliveryDelay: "10-15",
    imageUrl: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]


type RecommentedItemType = {
  id: number,
  restaurantName: string,
  restaurantType: string,
  deliveryDelay: string,
  imageUrl: string,
  setRestaurant: React.Dispatch<React.SetStateAction<RestaruantType | undefined>>
}






const Recommended = () => {
  const navigate = useNavigation<customeNavigateProp>()
  const [restaurant, setRestaurant] = useState<RestaruantType>()
  const [restaurants, setRestaurants] = useState<any>()

  const {
    data: recomentedResturants,
    isLoading, isError, isSuccess, error
  } = useGetRecomentedResuturantQuery('')

  useMemo(() => {
    if (isSuccess) {
      setRestaurants(recomentedResturants?.restaurants)
    }
  },[isSuccess])

  // type recomentedResturantType = typeof recomentedResturants[0]
  type recomentedResturantType = any

  useEffect(() => {
    restaurant && navigate.navigate('RestaurantScreen', { restaurant })
  }, [restaurant])


  if (isLoading) {
    console.log("loading..")
  } else if (isError) {
    console.log("error")
    console.log(error)
  } else if (isSuccess) {
    console.log("success")
    console.log(restaurants?.length)
  }


  return (
    <View  className='px-1 py-2 w-auto'>

      <ListHeading title='Recomented for you' />

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {isSuccess &&
          restaurants?.map((restaurant: recomentedResturantType) => (
            <RecommendedItem
              key={restaurant._id}
              id={restaurant._id}
              restaurantName={restaurant.name}
              restaurantType={restaurant.cuisine}
              deliveryDelay={restaurant.deliveryDelay}
              imageUrl={restaurant.imageUrl}
              // handleNavigate={handleNavigate}
              setRestaurant={setRestaurant}
            />
          ))
        }

      </ScrollView>

    </View>
  )
}

export default Recommended





const RecommendedItem = ({ id, restaurantName, restaurantType, deliveryDelay, imageUrl, setRestaurant }: RecommentedItemType) => {
  const nav = useCallback(() => {
    setRestaurant({ id, restaurantName, restaurantType, deliveryDelay, imageUrl })
  }, [id])

  return (
    <TouchableOpacity className='w-52 h-28 mx-2 mb-2 bg-white rounded-2xl  shadow-xl flex-row ' onPress={nav}>
      <Image
        source={{ uri: imageUrl }}
        className='w-3/6 h-auto rounded-l-2xl'
      />
      <View className='flex justify-center w-3/6 overflow-hidden whitespace-no-wrap truncate px-2 py-1 space-y-2 '>
        <Text className='text-sm first-letter:{uppercase} text-gray-700 font-semibold '>{restaurantName}</Text>
        <Text className='text-xs text-gray-500  first-letter:{uppercase}'>{restaurantType}</Text>

        <View className='flex-row space-x-1'>
          <ClockIcon size={20} color="gray" />
          <Text className='text-gray-500 text-xs'>{`${deliveryDelay} min`}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}
