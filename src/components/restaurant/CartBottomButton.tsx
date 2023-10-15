import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { customeNavigateProp } from '../../constants/constantTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type cartBottomButtonType = {
  totalItems: number,
  totalPrice: number,
}

const CartBottomButton = ({ totalItems, totalPrice }: cartBottomButtonType) => {
  const navigation = useNavigation<customeNavigateProp>()
  const { selectedRestaurant } = useSelector((state: RootState) => state.postSlice)


  return (
    <TouchableOpacity className='absolute bottom-4 w-full bg-red-500 opacity-95 z-40 flex-row justify-center items-center py-3 rounded-t-xl '
      onPress={() => navigation.navigate('CheckoutScreen',
        { restaurantName: selectedRestaurant ? selectedRestaurant?.name : '' })}
    >
      
      <View>
        <Text className='text-lg font-semibold text-white'>Items in Cart {totalItems}</Text>
        <Text className='text-lg font-semibold text-white'>Total Price {totalPrice}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CartBottomButton