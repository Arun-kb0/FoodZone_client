import {
  View, Text, ScrollView, TouchableOpacity, Image,
  FlatList, Dimensions, ActivityIndicator
} from 'react-native'
import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect } from 'react'
import ListHeading from '../basic/ListHeading'
import { useNavigation } from '@react-navigation/native'
import SortModel from './SortModel'
import { useAddFavoriteRestaurantMutation, useGetFavoriteRestaurantsQuery, useLazyGetAllRestaurantsQuery } from '../../features/posts/postApiSlice'
import { restaurantType } from '../../constants/constantTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setFavoriteRestaurant, setFavoriteRestaurants, setRestaurants, setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction, Dispatch } from 'redux'
import { IconFontawsm, IconIon, IconMatCom } from '../../constants/icons'
import { RootState } from '../../app/store'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'
import { RestaurantCard } from '../basic/RestaurantCard'

type allRestaurantsPropsType = {
  page: number
}
const AllRestaurants = ({ page }: allRestaurantsPropsType) => {

  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [modelOpen, setModelOpen] = useState(false)
  const [restaurants, setRestaurantsState] = useState<restaurantType[] | []>([])
  const [width, setWidth] = useState(Dimensions.get("window").width)

  const { favoriteRestaurantIds } = useSelector((state: RootState) => state.postSlice)
  
  const {
    data: favRestaurant,
    isLoading: favIsLoading,
    isError: favIsError,
    isSuccess: favIsSuccess
  } = useGetFavoriteRestaurantsQuery()

  const [getAllRestaurants,
    { data: allRestaurants,
      isLoading,
      isError,
      isSuccess,
      error,
      isFetching
    }
  ] = useLazyGetAllRestaurantsQuery()

  useEffect(() => {
    getAllRestaurants({ page }, true)
    console.log('all restaurants page - ', page)
  }, [page])

  useEffect(() => {
    if (isSuccess && allRestaurants?.restaurants) {
      setRestaurantsState(prev => [
        ...prev,
        ...allRestaurants.restaurants
      ])
    }
  }, [isSuccess, allRestaurants])

  useEffect(() => {
    if (allRestaurants) {
      dispatch(setRestaurants(allRestaurants))
    }
    if (favRestaurant) {
      dispatch(setFavoriteRestaurants({ restaurantIds: favRestaurant.restaurantIds }))
      console.log('favRestaurant.restaurantIds ')
      console.log(favRestaurant.restaurantIds)
    }
  }, [isSuccess, favIsSuccess])

  const handleNavigateToSort = () => {
    setModelOpen(!modelOpen)
  }

  // * console logs
  useEffect(() => {
    if (isSuccess) {
      console.log('get all restaurants success')
      console.log(typeof allRestaurants);
    }
    if (isError) {
      console.log('get all restaurants failed')
      console.log(error);
    }
    if (isLoading) {
      console.log('get all restaurants loading ...')
    }
    console.log('get all restaurants query res')
    console.log(isSuccess, isError, isLoading)
  }, [isSuccess, isError, isLoading, error])

  return (
    <View className='flex items-center'>

      <SortModel
        isVisible={modelOpen}
        closeModel={setModelOpen}
      />

      <ListHeading title='All restaurants' />

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

      <View className='pb-32 flex-1' >
        {isSuccess &&
          <FlatList
            className=' h-auto'
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
              <RestaurantCard
                restaurant={item}
                dispatch={dispatch}
                navigation={navigation}
                isFav={Boolean(favoriteRestaurantIds?.includes(item.id))}
              />
            )}
            ListFooterComponent={<EndComponent isFetching={isFetching} />}
          />
        }

        {isLoading &&
          <ActivityIndicator size='large' className='bg-white shadow-2xl rounded-full p-1' color='#dc2626' />
        }
      </View>

    </View>
  )
}

export default AllRestaurants



type EndComponentPropType = { isFetching: boolean }
const EndComponent = ({ isFetching }: EndComponentPropType) => {
  return <View className='w-full items-center mt-5'>
    {isFetching &&
      <ActivityIndicator size='large' className='bg-white shadow-2xl rounded-full p-1 w-18' color='#dc2626' />
    }
  </View>
}
