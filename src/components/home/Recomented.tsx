import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useCallback, useEffect, useMemo, Dispatch } from 'react'
import ListHeading from '../basic/ListHeading'
import { useNavigation } from '@react-navigation/native'
import { restaurantType } from '../../constants/constantTypes'
import { useGetRecomentedResuturantQuery } from '../../features/posts/postApiSlice'
import { useDispatch } from 'react-redux'
import { setSelectedRestaurant } from '../../features/posts/postSlice'
import { AnyAction } from 'redux'
import { IconMatCom } from '../../constants/icons'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'



const Recommended = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

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

  
  // ! add get restaurants call with page num
  const handleGetRecomented = (info : {distanceFromEnd: number}) => {
    console.log("end", info)
  }

  return (
    <View className='px-1 py-2 w-auto'>

      <ListHeading title='Recomented for you' />

      {isSuccess &&
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          getItemLayout={(data, index) => ({
            length: 208, offset: 448 * index, index
          })}
          initialNumToRender={2}
          onEndReached={handleGetRecomented}

          data={restaurants}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <RecommendedItem
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

export default Recommended




type RecommentedItemType = {
  restaurant: restaurantType,
  dispatch: Dispatch<AnyAction>,
  navigation: DeliveryScreenNavigationProps
}



const RecommendedItem = ({ restaurant, dispatch, navigation }: RecommentedItemType) => {
  const { _id, name, cuisine, imageUrl, deliveryDelay, } = restaurant
  const handleNavigate = useCallback(() => {
    dispatch(setSelectedRestaurant(restaurant))
    navigation.navigate('RestaurantScreen', { restaurant })
  }, [_id])

  return (
    <TouchableOpacity className='w-52 h-28 mx-2 mb-2 bg-white rounded-2xl  shadow-xl flex-row ' onPress={handleNavigate}>
      <Image
        source={{ uri: imageUrl }}
        className='w-3/6 h-auto rounded-l-2xl'
      />
      <View className='flex justify-center w-3/6 overflow-hidden whitespace-no-wrap truncate px-2 py-1 space-y-2 '>
        <Text className='text-sm first-letter:{uppercase} text-gray-700 font-semibold '>{name}</Text>
        <Text className='text-xs text-gray-500  first-letter:{uppercase}'>{cuisine}</Text>

        <View className='flex-row space-x-1 justify-start items-center'>
          <IconMatCom name="timer" size={20} color={"gray"} />
          <Text className='text-gray-500 text-xs'>{`${deliveryDelay} min`}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}
