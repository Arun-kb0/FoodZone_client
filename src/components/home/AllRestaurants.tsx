import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import ListHeading from '../basic/ListHeading'
import { AdjustmentsHorizontalIcon, ClockIcon, MinusCircleIcon } from 'react-native-heroicons/solid'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import SortModel from './SortModel'
import { useGetAllResturantsQuery } from '../../features/posts/postApiSlice'
import { customeNavigateProp, restaurantType } from '../../constants/constantTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurants } from '../../features/posts/postSlice'





const AllRestaurants = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation<customeNavigateProp>()
  const [modelOpen, setModelOpen] = useState(false)
  const [restaurants, setRestaurantsState] = useState<restaurantType[]>()

  const {
    data: allRestaruants,
    isLoading,
    isError,
    isSuccess
  } = useGetAllResturantsQuery('')


  useMemo(() => {
    if (isSuccess) {
      setRestaurantsState(allRestaruants?.restaurants)
    }
  }, [isSuccess])

  useEffect(() => {
    if (allRestaruants) {
      dispatch(setRestaurants({ payload: allRestaruants }))
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
          restaurants?.map((restaurant: restaurantType) => (
            <RestaruantCard
              key={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              deliveryDelay={restaurant.deliveryDelay}
              imageUrl={restaurant.imageUrl}
              distance={restaurant.distance}
              rating={restaurant.rating}
            />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default AllRestaurants




type restaruantCardType = {
  name: string,
  cuisine: string,
  deliveryDelay: string,
  imageUrl: string,
  distance: string,
  rating: number,
}

const RestaruantCard = ({
  name, cuisine, deliveryDelay,
  imageUrl, distance, rating }: restaruantCardType) => {

  return (
    <TouchableOpacity className='h-52 w-11/12 pb-2 bg-white rounded-2xl shadow-xl mb-4 space-x-4'>
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-4/6 rounded-t-2xl object-fill'
      />
      <Text className='text-lg font-semibold text-gray-700'>{name}</Text>

      <View className='flex-row items-center space-x-2'>
        <Text className='text-slate-500'>{cuisine}</Text>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{cuisine}</Text>
      </View>

      <View className='flex-row space-x-2 items-center'>
        <View className='flex-row space-x-1'>
          <ClockIcon size={22} color="gray" />
          <Text className='text-slate-500'>{`${deliveryDelay} min`}</Text>
        </View>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{distance}</Text>
      </View>
    </TouchableOpacity>
  )
}


