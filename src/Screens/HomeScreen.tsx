import {
  SafeAreaView, View, Text, ScrollView, NativeSyntheticEvent,
  NativeScrollEvent, TouchableOpacity
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Avatar from '../components/basic/Avatar'
import Search from '../components/home/Search'
import Recomented from '../components/home/Recomented'
import AllRestaruants from '../components/home/AllRestaurants'
import DishMenu from '../components/home/DishMenu'
import { useNavigation } from '@react-navigation/native'
import { IconEntypo, IconFontisto } from '../constants/icons'



const HomeScreen = () => {
  const navigation = useNavigation()
  const [isTrasparent, setisTrasparent] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Search placeholder='Search Resturant and Dishes' />,
      headerStyle: {
        backgroundColor: isTrasparent ? 'transparent' : "#fef08a",
      }
    })
  }, [isTrasparent])

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // const scrollY = e.nativeEvent.contentOffset.y
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent
    const scrollY = contentOffset.y
    const height = contentSize.height
    const screenHeight = layoutMeasurement.height

    scrollY > 100
      ? setisTrasparent(true)
      : setisTrasparent(false)
    
    if (scrollY + screenHeight >= height) {
      console.log("home screen end ")
    }
    
  }

  return (
    <SafeAreaView>
      <ScrollView className='' onScroll={handleScroll}>

        <View className='flex-row justify-between items-center bg-yellow-200 w-full space-x-3 px-4 pb-3 h-32'>
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
          <Avatar />
        </View>

        <Recomented />
        <DishMenu />
        <AllRestaruants />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen