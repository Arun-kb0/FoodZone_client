import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent, GestureResponderEvent } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { restaurantType } from '../constants/constantTypes'
import RestaruantDetails from '../components/restaurant/RestaurantDetails'
import RestaurantDishes from '../components/restaurant/RestaurantDishes'
import ListHeading from '../components/basic/ListHeading'
import RestaurantMenu from '../components/restaurant/RestaurantMenu'
import RestaurantTopBar from '../components/restaurant/RestaurantTopBar'
import { IconMatCom } from '../constants/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CartBottomButton from '../components/restaurant/CartBottomButton'
import { useNavigation } from '@react-navigation/native'
import Search from '../components/home/SearchHeader'
import DishSearch from '../components/restaurant/DishSearch'


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
    Restaurant_Name, Category, imageUrl, id, Delivery_Rating }
  } = route.params

  const [isVisible, setisVisible] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)


  const { selectedRestaurant } = useSelector((state: RootState) => state.postSlice)
  const { restaurantCart } = useSelector((state: RootState) => state.cartSlice)

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => isSearchOpen
        ? <DishSearch placeholder={`Search Dishes in ${Restaurant_Name}`} />
        : <RestaurantTopBar setIsSearchOpen={setIsSearchOpen} />,
    })
  }, [isSearchOpen])


  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const scrollY = contentOffset.y;
    const height = contentSize.height;
    const screenHeight = layoutMeasurement.height;

    scrollY > 100
      ? setIsSearchOpen(true)
      : setIsSearchOpen(false)

    if (scrollY + screenHeight >= height) {
      console.log("restaurant screen end of list ")
    }
  }

  useEffect(() => {
    if (restaurantCart && selectedRestaurant
      && restaurantCart[selectedRestaurant?.id] !== undefined) {
      setTotalCount(restaurantCart[selectedRestaurant?.id].count)
    }
  }, [restaurantCart && selectedRestaurant && restaurantCart[selectedRestaurant.id]])

  if (!selectedRestaurant) {
    navigation.goBack()
  }


  // ! add get restaurants call with page num
  const handleGetRestaurants = () => {
    console.log("call get resturants from restaurants screen")
  }


  return (
    <SafeAreaView className={`mt-14 relative h-[96%] `} >

      <TouchableOpacity className={`absolute left-[45%] z-50 shadow-xl flex  justify-center items-center bg-gray-900 rounded-xl p-2 opacity-90 ${totalCount > 0 ? "bottom-[13%]" : "bottom-8"}`} onPress={() => setisVisible(!isVisible)} >
        <Text className='text-lg font-bold text-white'>Menu</Text>
        <IconMatCom name="silverware-fork-knife" size={30} color="white" />
      </TouchableOpacity>
      {selectedRestaurant &&
        <RestaurantMenu
          items={selectedRestaurant?.Category}
          isVisible={isVisible}
          closeModel={setisVisible}
        />
      }
      {selectedRestaurant && restaurantCart && totalCount > 0 &&
        <CartBottomButton
          totalItems={totalCount}
          totalPrice={restaurantCart[selectedRestaurant.id]?.total}
        />
      }


      <ScrollView className='mt-10' onScroll={handleScroll} >

        <RestaruantDetails
          id={id}
          name={Restaurant_Name}
          cuisine={Category[0]}
          deliveryDelay={'30'}
          imageUrl={imageUrl}
          rating={Delivery_Rating}
          distance={'12'}
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