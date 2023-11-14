import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import ListHeading from '../basic/ListHeading'
import { useNavigation } from '@react-navigation/native'
import SortModel from './SortModel'
import { useAddFavoriteResturantMutation, useGetAllResturantsQuery, useGetFavoriteRestaurantsQuery } from '../../features/posts/postApiSlice'
import { restaurantType } from '../../constants/constantTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setFavoriteRestaurant, setFavoriteRestaurants, setRestaurants, setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction, Dispatch } from 'redux'
import { IconFontawsm, IconIon, IconMatCom } from '../../constants/icons'
import { RootState } from '../../app/store'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'



const AllRestaurants = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [modelOpen, setModelOpen] = useState(false)
  const [restaurants, setRestaurantsState] = useState<restaurantType[]>()
  const [width, setWidth] = useState(Dimensions.get("window").width)

  const { favoriteResturantIds } = useSelector((state: RootState) => state.postSlice)

  const {
    data: favResturant,
    isLoading: favIsLoading,
    isError: favIsError,
    isSuccess: favIsSuccess
  } = useGetFavoriteRestaurantsQuery('')

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
    if (favResturant) {
      dispatch(setFavoriteRestaurants({ restaurantIds: favResturant.restaurantId }))
    }
  }, [isSuccess,favIsSuccess])


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
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaruantCard
              restaurant={item}
              dispatch={dispatch}
              navigation={navigation}
              isFav={Boolean(favoriteResturantIds?.includes(item.id))}
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
  navigation: DeliveryScreenNavigationProps,
  dispatch: Dispatch<AnyAction>,
  isFav: boolean
}

const RestaruantCard = ({ navigation, dispatch, restaurant, isFav }: restaruantCardType) => {
  const [isFavorite, setisFavorite] = useState(isFav)
  const { Restaurant_Name, Category, imageUrl, id} = restaurant


  const [addFavoriteResturant, {
    data: favRestaurants,
    isError,
    error,
    isSuccess,
  }] = useAddFavoriteResturantMutation()

  const handleNavigate = useCallback(() => {
    dispatch(setSelectedRestaurant(restaurant))
    navigation.navigate('RestaurantScreen', { restaurant })
  }, [id])

  const handleFavorite = useCallback(() => {
    setisFavorite((prev)=> !prev)
    addFavoriteResturant(restaurant.id)
  }, [restaurant.id])

  useEffect(() => {
    if (isSuccess) {
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


