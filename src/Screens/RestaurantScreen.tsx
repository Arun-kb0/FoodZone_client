import { View, Text, SafeAreaView, ScrollView, TouchableOpacity ,Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react'
import { RestaruantType } from '../constants/constantTypes'
import RestaruantDetails from '../components/restaurant/RestaurantDetails'
import RestaurantDishes from '../components/restaurant/RestaurantDishes'
import ListHeading from '../components/basic/ListHeading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RestaurantMenu from '../components/restaurant/RestaurantMenu'


// ! redux setup & update resturant data in redux
type RestaurantScreen = {
  route: {
    params: {
      restaurant: RestaruantType
    }
  }
}

const MenuList = ["alfam", "mandi", "noodiles", "chicken", "friedRice"]


const RestaurantScreen = ({ route }: RestaurantScreen) => {
  const { restaurant: {
    restaurantName, restaurantType, deliveryDelay, imageUrl, id }
  } = route.params

  const [isVisible, setisVisible] = useState(false)
  


  return (
    <SafeAreaView className='mt-10 relative'>
        <TouchableOpacity className={`absolute bottom-5 left-[45%] z-50 shadow-xl flex  justify-center items-center bg-gray-900 rounded-xl p-2 opacity-90`} onPress={() => setisVisible(!isVisible)} >
          <Text className='text-lg font-bold text-white'>Menu</Text>
          <Icon name="silverware-fork-knife" size={30} color="white" />
        </TouchableOpacity>
        <RestaurantMenu
          items={MenuList}
          isVisible={isVisible}
          closeModel={setisVisible}
      />
      
      <ScrollView>


        <View>

        </View>

        <RestaruantDetails
          id={id}
          restaurantName={restaurantName}
          restaurantType={restaurantType}
          deliveryDelay={deliveryDelay}
          imageUrl={imageUrl}
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