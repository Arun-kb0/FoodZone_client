import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import React from 'react'
import Avatar from '../components/basic/Avatar'
import { MapPinIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import Search from '../components/home/Search'
import Recomented from '../components/home/Recomented'
import ListHeading from '../components/basic/ListHeading'
import AllRestaruants from '../components/home/AllRestaurants'
import DishMenu from '../components/home/DishMenu'



const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className='mt-8' >

        <Search />

        <View className='flex-row justify-between bg-yellow-200 w-full space-x-2 px-2 py-3 h-36'>
          <View>
            <View className='flex-row' >
              <MapPinIcon size={22} color='red' />
              <Text className='text-lg font-semibold px-2'>Home</Text>
              <ChevronDownIcon size={22} color='black' />
            </View>
            <Text className='text-sm '>address (h) puliyanmp o adad</Text>
          </View>
          <Avatar />
        </View>

        <Recomented />
        <DishMenu />
        <AllRestaruants/>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen