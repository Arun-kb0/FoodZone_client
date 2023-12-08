import {
  View, Text, ScrollView, TouchableOpacity, Image,
  FlatList, Dimensions, ActivityIndicator
} from 'react-native'
import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect } from 'react'
import ListHeading from '../basic/ListHeading'
import { useNavigation } from '@react-navigation/native'
import SortModel from './SortModel'
import { useAddFavoriteResturantMutation, useGetFavoriteRestaurantsQuery, useLazyGetAllResturantsQuery } from '../../features/posts/postApiSlice'
import { restaurantType } from '../../constants/constantTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setFavoriteRestaurant, setFavoriteRestaurants, setRestaurants, setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction, Dispatch } from 'redux'
import { IconFontawsm, IconIon, IconMatCom } from '../../constants/icons'
import { RootState } from '../../app/store'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'
import { RestaruantCard } from '../basic/RestaurantCard'

type allRestaurantsPropsType = {
  page: number
}
const AllRestaurants = ({ page }: allRestaurantsPropsType) => {

  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [modelOpen, setModelOpen] = useState(false)
  const [restaurants, setRestaurantsState] = useState<restaurantType[] | []>([])
  const [width, setWidth] = useState(Dimensions.get("window").width)

  const { favoriteResturantIds } = useSelector((state: RootState) => state.postSlice)

  const {
    data: favResturant,
    isLoading: favIsLoading,
    isError: favIsError,
    isSuccess: favIsSuccess
  } = useGetFavoriteRestaurantsQuery()

  const [getAllRestaurants,
    { data: allRestaruants,
      isLoading,
      isError,
      isSuccess,
      error,
      isFetching
    }
  ] = useLazyGetAllResturantsQuery()

  useEffect(() => {
    getAllRestaurants({ page }, true)
    console.log('all resturants page - ', page)
  }, [page])

  useEffect(() => {
    if (isSuccess && allRestaruants?.restaurants) {
      setRestaurantsState(prev => [
        ...prev,
        ...allRestaruants.restaurants
      ])
    }
  }, [isSuccess, allRestaruants])

  useEffect(() => {
    if (allRestaruants) {
      dispatch(setRestaurants(allRestaruants))
    }
    if (favResturant) {
      dispatch(setFavoriteRestaurants({ restaurantIds: favResturant.restaurantIds }))
      console.log('favResturant.restaurantIds ')
      console.log(favResturant.restaurantIds)
    }
  }, [isSuccess, favIsSuccess])

  const handleNavigateToSort = () => {
    setModelOpen(!modelOpen)
  }

  // * console logs
  useEffect(() => {
    if (isSuccess) {
      console.log('get all resturants success')
      console.log(typeof allRestaruants);
    }
    if (isError) {
      console.log('get all resturants failed')
      console.log(error);
    }
    if (isLoading) {
      console.log('get all resturants loading ...')
    }
    console.log('get all resturants query res')
    console.log(isSuccess, isError, isLoading)
  }, [isSuccess, isError, isLoading, error])

  return (
    <View className='flex items-center'>

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
              <RestaruantCard
                restaurant={item}
                dispatch={dispatch}
                navigation={navigation}
                isFav={Boolean(favoriteResturantIds?.includes(item.id))}
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
