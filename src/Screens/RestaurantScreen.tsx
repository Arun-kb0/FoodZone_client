import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Touchable } from 'react-native'
import React, { useState } from 'react'
import { RestaruantType, restaurantType } from '../constants/constantTypes'
import RestaruantDetails from '../components/restaurant/RestaurantDetails'
import RestaurantDishes from '../components/restaurant/RestaurantDishes'
import ListHeading from '../components/basic/ListHeading'
import RestaurantMenu from '../components/restaurant/RestaurantMenu'
import RestaurantTopBar from '../components/restaurant/RestaurantTopBar'
import { IconMatCom } from '../constants/icons'
import Rating from '../components/basic/Rating'


type RestaurantScreen = {
  route: {
    params: {
      restaurant: restaurantType
    }
  }
}

const MenuList = ["alfam", "mandi", "noodiles", "chicken", "friedRice"]


const RestaurantScreen = ({ route }: RestaurantScreen) => {
  const { restaurant: {
    name, cuisine, deliveryDelay, imageUrl, _id,rating,distance }
  } = route.params

  const [isVisible, setisVisible] = useState(false)


  return (
    <SafeAreaView className='mt-10 relative'>
      <TouchableOpacity className={`absolute bottom-5 left-[45%] z-50 shadow-xl flex  justify-center items-center bg-gray-900 rounded-xl p-2 opacity-90`} onPress={() => setisVisible(!isVisible)} >
        <Text className='text-lg font-bold text-white'>Menu</Text>
        <IconMatCom name="silverware-fork-knife" size={30} color="white" />
      </TouchableOpacity>
      <RestaurantMenu
        items={MenuList}
        isVisible={isVisible}
        closeModel={setisVisible}
      />

      <RestaurantTopBar/>


      <ScrollView className='mt-10'>
        <View>

        </View>

        <RestaruantDetails
          _id={_id}
          name={name}
          cuisine={cuisine}
          deliveryDelay={deliveryDelay}
          imageUrl={imageUrl}
          rating={rating}
          distance={distance}
        />

        <View>
          <ListHeading title='Recomented' />
          <RestaurantDishes />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default RestaurantScreen