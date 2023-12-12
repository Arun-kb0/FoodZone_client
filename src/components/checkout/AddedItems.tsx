import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { IconFeather } from '../../constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { dishType } from '../../constants/constantTypes'
import { AnyAction, Dispatch } from 'redux'
import { addToCart, removeFromCart } from '../../features/cart/cartSlice'




const AddedItems = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.cartSlice)
  const { restaurants, selectedRestaurant, selectedDish } = useSelector((state: RootState) => state.postSlice)
  const [dishes, setDishes] = useState<dishType[]>()

  useEffect(() => {
    if (selectedDish && cartItems && selectedRestaurant) {
      const restaurantDishes = selectedDish[selectedRestaurant?.id]
      const filteredDishes = restaurantDishes?.filter((item) => (
        cartItems[item.id]
      ))
      setDishes(filteredDishes)
    }
  }, [restaurants, cartItems])


  return (
    <View className='h-auto bg-white p-1 rounded-xl shadow-xl '>
      {dishes && cartItems && selectedRestaurant &&
        <FlatList
          scrollEnabled={false}
          data={dishes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AddedItem
              id={item.id}
              name={item.dishName}
              price={item.price}
              count={cartItems[item.id]}
              restaurantId={selectedRestaurant.id}
              dispatch={dispatch}
            />
          )}
        />
      }
    </View>
  )
}

export default AddedItems


type addedItemType = {
  id: string
  name: string
  price: number,
  count: number,
  dispatch: Dispatch<AnyAction>,
  restaurantId: string
}

const AddedItem = ({ id, name, price, count, dispatch, restaurantId }: addedItemType) => {

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ id, price, restaurantId }))
  }, [id])
  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart({ id, price, restaurantId }))
  }, [id])

  return (
    <View className='flex-row justify-between items-center rounded-xl shadow-3xl px-3 py-2 bg-white space-x-2 my-1'>
      <View className='flex justify-center items-center'>
        <Text className='text-sm font-bold text-gray-900 '>{name}</Text>
        <Text className='text-sm font-semibold text-gray-900 '>{price} $</Text>
      </View>
      <View className='flex justify-center items-center'>
        <View className='flex-row justify-between items-center space-x-1 bg-red-400 px-1 rounded-lg '>
          <TouchableOpacity onPress={handleAddToCart}>
            <IconFeather name='plus' size={20} color="white" />
          </TouchableOpacity>
          <Text className='text-lg font-semibold text-white'>{count}</Text>
          <TouchableOpacity onPress={handleRemoveFromCart}>
            <IconFeather name='minus' size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text className='text-sm font-semibold text-gray-900 '>{count * price} $</Text>
      </View>
    </View>
  )
}