import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CheckoutHeader from '../components/checkout/CheckoutHeader'
import { IconEntypo, IconMatCom } from '../constants/icons'
import ListHeading from '../components/basic/ListHeading'
import AddedItems from '../components/checkout/AddedItems'
import MoreSettings from '../components/checkout/MoreSettings'
import BillSummary from '../components/checkout/BillSummary'
import Tip from '../components/checkout/Tip'
import DeliveryInstructions from '../components/checkout/DeliveryInstructions'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'


type checkoutScreenType = {
  route: {
    params: {
      restaurantName: string
    }
  }
}

const CheckoutScreen = ({ route }: checkoutScreenType) => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  const { selectedRestaurant } = useSelector((state: RootState) => state.postSlice)
  const { restaurantCart } = useSelector((state: RootState) => state.cartSlice)

  

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CheckoutHeader />,
    })
  }, [selectedRestaurant && selectedRestaurant.id])


  useEffect(() => {
    if (!selectedRestaurant) {
      navigation.goBack()
    }
  },[])


  return (
    <View className='mt-24 relative'>

      <ScrollView className='mx-3 mb-28 h-auto ' showsVerticalScrollIndicator={false}>
        {selectedRestaurant &&
          <View className='mb-10'>

            <View className='bg-white rounded-xl flex-row space-x-2 px-4 py-3 shadow-xl '>
              <IconMatCom name="timer" size={22} color={"green"} />
              <Text className='text-sm font-semibold '>Delivery in {'30 min'}</Text>
            </View>

            {/* items added */}
            <ListHeading title="item's added" />
            <AddedItems />

            {/* more settings  */}
            <MoreSettings />

            {/* bill summary */}
            <ListHeading title='bill summary' />
            <BillSummary
              selectedRestaurant={selectedRestaurant}
              total={restaurantCart ? restaurantCart[selectedRestaurant.id].total : 0}
            />

            {/* tip */}
            <ListHeading title='before you place order' />
            <Tip />

            {/* delivery instruction */}
            <DeliveryInstructions />

            {/* your details */}
            <View className='flex-row justify-between items-center bg-white px-3 py-4 rounded-xl my-3 '>
              <View>
                <Text className='font-semibold text-lg '>Your details</Text>
                <Text className='text-gray-500'>user Address</Text>
              </View>
              <TouchableOpacity>
                <IconEntypo name='chevron-right' size={30} color={'#334155'} />
              </TouchableOpacity>
            </View>

            {/* order for someone */}
            <View className='flex-row justify-between items-center bg-white px-3 py-4 rounded-xl my-3 '>
              <View>
                <Text className='font-semibold text-lg '>Order for someone else</Text>
                <Text className='text-gray-500'>Add reviver details for hassle free delivery</Text>
              </View>
              <TouchableOpacity>
                <IconEntypo name='chevron-right' size={30} color={'#334155'} />
              </TouchableOpacity>
            </View>
          </View>
        }
      </ScrollView>

      {/* payment and delivery address */}
      <View className='absolute bottom-0 px-4 py-4 bg-res-500 bg-white shadow-2xl w-full rounded-t-2xl space-y-2'>
        <View className='flex-row  justify-between items-center w-full border-b '>
          <View>
            <Text className='font-semibold text-lg '>Delivery at Work</Text>
            <Text className='text-gray-500'>address</Text>
          </View>
          <TouchableOpacity>
            <Text className='text-red-400 font-semibold'>Change</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-between'>
          <View>
            <Text>select payment method</Text>
          </View>
          <TouchableOpacity className='bg-red-400 px-5 py-3 rounded-xl '>
            <Text className='text-white text-lg font-semibold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  )
}

export default CheckoutScreen