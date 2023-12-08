import {
  SafeAreaView, View, Text, ScrollView, NativeSyntheticEvent,
  NativeScrollEvent, TouchableOpacity, SectionList
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Avatar from '../components/basic/Avatar'
import { SearchHeader } from '../components/home/SearchHeader'
import Recomented from '../components/home/Recomented'
import AllRestaruants from '../components/home/AllRestaurants'
import DishMenu from '../components/home/DishMenu'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import Address from '../components/home/Address'



const HomeScreen = () => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  const [isTrasparent, setisTrasparent] = useState(false)
  const [page, setPage] = useState(1)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchHeader
        placeholder='Search Resturant and Dishes'
        isTrasparent={isTrasparent}
      />
    })
  }, [isTrasparent])

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent
    const scrollY = contentOffset.y
    const height = contentSize.height
    const screenHeight = layoutMeasurement.height

    scrollY > 100
      ? setisTrasparent(true)
      : setisTrasparent(false)

    if (scrollY + screenHeight >= height - 20) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView className='mt-24 h-auto'
        nestedScrollEnabled={true}
        onScroll={handleScroll}
      >

        <Address />
        <Recomented />
        <DishMenu />
        <AllRestaruants page={page} />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen