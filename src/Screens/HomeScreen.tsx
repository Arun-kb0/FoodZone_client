import {
  SafeAreaView, View, Text, ScrollView, NativeSyntheticEvent,
  NativeScrollEvent, TouchableOpacity
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Avatar from '../components/basic/Avatar'
import Search, { SearchHeader } from '../components/home/SearchHeader'
import Recomented from '../components/home/Recomented'
import AllRestaruants from '../components/home/AllRestaurants'
import DishMenu from '../components/home/DishMenu'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { IconEntypo, IconFontisto } from '../constants/icons'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import { useGetAllResturantsQuery, useLazyGetAllResturantsQuery } from '../features/posts/postApiSlice'



const HomeScreen = () => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  const [isTrasparent, setisTrasparent] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchHeader
        placeholder='Search Resturant and Dishes'
        isTrasparent={isTrasparent}
      />
    })
  }, [isTrasparent])

  return (
    <SafeAreaView>

      <ScrollView className='mt-24 h-auto' >

        <View className='flex-row justify-between items-center bg-yellow-200 w-full space-x-3 px-4 pb-3 h-32 '>
          <View className='w-10/12'>
            <View className='flex-row' >
              <IconFontisto name="map-marker-alt" size={22} color="red" />
              <Text className='text-lg font-semibold px-2'>Home</Text>
              <TouchableOpacity>
                <IconEntypo name='chevron-down' size={30} color={'#334155'} />
              </TouchableOpacity>
            </View>
            <Text className='text-sm '>address (h) puliyanmp o karakkattuparambil ,anga,aly</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
            <Avatar />
          </TouchableOpacity>
        </View>

        <Recomented />
        <DishMenu />
        <AllRestaruants />

      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen