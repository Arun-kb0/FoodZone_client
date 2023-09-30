import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { ClockIcon } from 'react-native-heroicons/solid'

import ListHeading from '../basic/ListHeading'
import {  useNavigation } from '@react-navigation/native'
import { RestaruantType, customeNavigateProp, restaurantType } from '../../constants/constantTypes'
import { useGetRecomentedResuturantQuery } from '../../features/posts/postApiSlice'
import { useDispatch } from 'react-redux'
import { setSelectedRestaurant } from '../../features/posts/postSlice'


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
// ! fix needed

type RecommentedItemType = {
  // id: string,
  // restaurantName: string,
  // restaurantType: string,
  // deliveryDelay: string,
  // imageUrl: string,
  restaurant:restaurantType,
  setRestaurant: React.Dispatch<React.SetStateAction<restaurantType | undefined>>
}






const Recommended = () => {
  const dispatch = useDispatch()

  const navigate = useNavigation<customeNavigateProp>()
  const [restaurant, setRestaurant] = useState<restaurantType>()
  const [restaurants, setRestaurants] = useState<restaurantType[]>()

  const {
    data: recomentedResturants,
    isLoading, isError, isSuccess, error
  } = useGetRecomentedResuturantQuery('')

  useMemo(() => {
    if (isSuccess) {
      setRestaurants(recomentedResturants?.restaurants)
    }
  }, [isSuccess])
  
  useEffect(() => {
    if (restaurant) {
    }
  },[restaurant])


  useEffect(() => {
    if (restaurant) { 
      dispatch(setSelectedRestaurant(restaurant))
      navigate.navigate('RestaurantScreen', { restaurant })
    }
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
          restaurants?.map((restaurantObj: restaurantType) => (
            <RecommendedItem
              key={restaurantObj._id}
              // id={restaurant._id}
              // restaurantName={restaurant.name}
              // restaurantType={restaurant.cuisine}
              // deliveryDelay={restaurant.deliveryDelay}
              // imageUrl={restaurant.imageUrl}
              // handleNavigate={handleNavigate}
              restaurant={restaurantObj}
              setRestaurant={setRestaurant}
            />
          ))
        }

      </ScrollView>

    </View>
  )
}

export default Recommended





const RecommendedItem = ({ restaurant,setRestaurant }: RecommentedItemType) => {
  const { _id, name, cuisine, imageUrl, deliveryDelay, } = restaurant
  const nav = useCallback(() => {
    setRestaurant(restaurant)
  }, [_id])



  return (
    <TouchableOpacity className='w-52 h-28 mx-2 mb-2 bg-white rounded-2xl  shadow-xl flex-row ' onPress={nav}>
      <Image
        source={{ uri: imageUrl }}
        className='w-3/6 h-auto rounded-l-2xl'
      />
      <View className='flex justify-center w-3/6 overflow-hidden whitespace-no-wrap truncate px-2 py-1 space-y-2 '>
        <Text className='text-sm first-letter:{uppercase} text-gray-700 font-semibold '>{name}</Text>
        <Text className='text-xs text-gray-500  first-letter:{uppercase}'>{cuisine}</Text>

        <View className='flex-row space-x-1'>
          <ClockIcon size={20} color="gray" />
          <Text className='text-gray-500 text-xs'>{`${deliveryDelay} min`}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}
