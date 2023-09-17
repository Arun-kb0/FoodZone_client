import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import React from 'react'
import Avatar from '../components/basic/Avatar'
import { MapPinIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import Search from '../components/home/Search'

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView className='mt-8' >

        <Search />

        <View className='flex-row justify-between bg-yellow-200 w-full space-x-2 px-2 py-3 h-36'>
          <View>
            <View className='flex-row' >
              <MapPinIcon size={22} color='red' />
              <Text className='text-lg font-semibold px-2'>Home</Text>
            </View>
            <Text className='text-sm '>address (h) puliyanmp o adad</Text>
            <ChevronDownIcon size={22} color='black' />
          </View>
          <Avatar />
        </View>

       
        
        <View >
          <Text>Recomented</Text>
        </View>
        <View >
          <Text>Whats on your mind</Text>
        </View>
        <View >
          <Text>all resturants</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default Home