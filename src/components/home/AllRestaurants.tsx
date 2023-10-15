import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import ListHeading from '../basic/ListHeading'
import { useNavigation } from '@react-navigation/native'
import SortModel from './SortModel'
import { useGetAllResturantsQuery } from '../../features/posts/postApiSlice'
import { customeNavigateProp, restaurantType } from '../../constants/constantTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurants, setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction, Dispatch } from 'redux'
import { IconFontawsm, IconMatCom } from '../../constants/icons'



const AllRestaurants = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation<customeNavigateProp>()

  const [modelOpen, setModelOpen] = useState(false)
  const [restaurants, setRestaurantsState] = useState<restaurantType[]>()
  const [width, setWidth] = useState(Dimensions.get("window").width)

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
      dispatch(setRestaurants(allRestaruants))
    }
  }, [isSuccess])


  const handleNavigateToSort = () => {
    setModelOpen(!modelOpen)
  }

  return (
    <View className='mt-3 flex items-center'>

      <SortModel
        isVisible={modelOpen}
        closeModel={setModelOpen}
      />

      <ListHeading title='All restaruants' />

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >

        <View className='flex-row justify-center items-center w-full mx-4 mt-2 mb-3 space-x-3 '>

          <TouchableOpacity className='flex-row items-center py-2 px-5 bg-white rounded-xl shadow-lg space-x-2' onPress={handleNavigateToSort}>
            <IconFontawsm name="sort" size={22} color='gray' />
            <Text className=' font-semibold '>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity className='py-2 px-5 bg-white rounded-xl '>
            <Text className=' font-semibold '>Nearest</Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row py-2 px-5 bg-white rounded-xl space-x-2'>
            <Text className=' font-semibold '>Rating</Text>
            <Text className='text-gray-800'>4.0+</Text>
          </TouchableOpacity>

          <TouchableOpacity className='py-2 px-5 bg-white rounded-xl '>
            <Text className=' font-semibold '>PureVeg</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {isSuccess &&
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            width: width
          }}
          getItemLayout={(data, index) => ({
            length: width, offset: 256 * index, index
          })}
          initialNumToRender={2}

          data={restaurants}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <RestaruantCard
              restaurant={item}
              dispatch={dispatch}
              navigation={navigation}
            />
          )}
        />
      }

    </View>
  )
}

export default AllRestaurants




type restaruantCardType = {
  restaurant: restaurantType
  navigation: customeNavigateProp,
  dispatch: Dispatch<AnyAction>
}

const RestaruantCard = ({ navigation, dispatch, restaurant }: restaruantCardType) => {
  const { name, cuisine, deliveryDelay, imageUrl, distance, _id } = restaurant



  const handleNavigate = useCallback(() => {
    dispatch(setSelectedRestaurant(restaurant))
    navigation.navigate('RestaurantScreen', { restaurant })
  }, [_id])

  return (
    <TouchableOpacity className={`h-64 mx-3 pb-2 bg-white rounded-2xl shadow-xl mb-4 space-x-4 space-y-1`} onPress={handleNavigate}>
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-4/6 rounded-t-2xl object-fill'
      />
      <Text className='text-lg font-semibold text-gray-700'>{name}</Text>

      <View className='flex-row items-center space-x-2'>
        <Text className='text-slate-500'>{cuisine}</Text>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
      </View>

      <View className='flex-row space-x-2 items-center'>
        <View className='flex-row space-x-1 justify-center items-center'>
          <IconMatCom name="timer" size={22} color={"gray"} />
          <Text className='text-slate-500'>{`${deliveryDelay} min`}</Text>
        </View>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{distance}</Text>
      </View>
    </TouchableOpacity>
  )
}


