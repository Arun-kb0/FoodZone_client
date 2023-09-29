import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useMemo } from 'react'
import ListHeading from '../basic/ListHeading'
import { AdjustmentsHorizontalIcon, ClockIcon, MinusCircleIcon } from 'react-native-heroicons/solid'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../../navigation/TabNavigator'

import SortModel from './SortModel'
import { useGetAllResturantsQuery } from '../../features/auth/posts/postApiSlice'

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

type customeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>


const AllRestaurants = () => {
  const navigation = useNavigation<customeNavigationProp>()
  const [modelOpen, setModelOpen] = useState(false)
const [restaurants, setRestaurants] = useState<any>()
  const { 
    data:allRestaruants,
    isLoading,
    isError,
    isSuccess
  } = useGetAllResturantsQuery('')

  // type allResturantItemType = typeof allRestaruants[0] | null
  type allResturantItemType = any
  
  useMemo(() => {
    if (isSuccess) {
      setRestaurants(allRestaruants?.restaurants)
    }
  }, [isSuccess])

  const handleNavigateToSort = () => {
    setModelOpen(!modelOpen)
  }

  return (
    <ScrollView className='mt-3'>

      <SortModel
        isVisible={modelOpen}
        closeModel={setModelOpen}
      />

      <ListHeading title='All restaruants' />

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >


        <View className='flex-row justify-center items-center w-full mx-4 mt-2 mb-3 space-x-3 '>

          <TouchableOpacity className='flex-row items-center py-2 px-5 bg-white rounded-xl shadow-lg space-x-1' onPress={handleNavigateToSort}
          >
            <AdjustmentsHorizontalIcon size={22} color="gray" />
            <Text className=' font-semibold '>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity className='py-2 px-5 bg-white rounded-xl '>
            <Text className=' font-semibold '>Nearest</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row py-2 px-5 bg-white rounded-xl space-x-1'>
            <Text className=' font-semibold '>Rating</Text>
            <Text className='text-gray-800'>4.0+</Text>
          </TouchableOpacity>

          <TouchableOpacity className='py-2 px-5 bg-white rounded-xl '>
            <Text className=' font-semibold '>PureVeg</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>


      <View className='flex justify-center items-center'>
        {isSuccess &&
          restaurants?.map((restaurant:allResturantItemType) => (
            <RestaruantCard
              key={restaurant._id}
              restaurantName={restaurant.name}
              restaurantType={restaurant.cuisine}
              deliveryDelay={restaurant.deliveryDelay}
              imageUrl={restaurant.imageUrl}
            />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default AllRestaurants




type restaruantCardType = {
  restaurantName: string,
  restaurantType: string
  deliveryDelay: string,
  imageUrl: string,
  kilometer?: number,

}

const RestaruantCard = ({ restaurantName, restaurantType, deliveryDelay, imageUrl }: restaruantCardType) => {

  return (
    <TouchableOpacity className='h-52 w-11/12 pb-2 bg-white rounded-2xl shadow-xl mb-4 space-x-4'>
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-4/6 rounded-t-2xl object-fill'
      />
      <Text className='text-lg font-semibold text-gray-700'>{restaurantName}</Text>

      <View className='flex-row items-center space-x-2'>
        <Text className='text-slate-500'>{restaurantType}</Text>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{restaurantType}</Text>
      </View>

      <View className='flex-row space-x-2 items-center'>
        <View className='flex-row space-x-1'>
          <ClockIcon size={22} color="gray" />
          <Text className='text-slate-500'>{`${deliveryDelay} min`}</Text>
        </View>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{`9 km`}</Text>
      </View>
    </TouchableOpacity>
  )
}


