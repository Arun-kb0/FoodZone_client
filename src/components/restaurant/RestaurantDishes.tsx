import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useMemo, Dispatch, useCallback } from 'react'
import Rating from '../basic/Rating'
import { useLazyGetRestaurantDishesQuery } from '../../features/posts/postApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { dishType } from '../../constants/constantTypes'
import { setSelectedDish } from '../../features/posts/postSlice'
import { AnyAction } from 'redux'
import { addToCart, removeFromCart } from '../../features/cart/cartSlice'
import { IconFeather } from '../../constants/icons'


type RestaurantDishesPropsType = {
  page: number
}
const RestaurantDishes = ({ page }: RestaurantDishesPropsType) => {
  const dispatch = useDispatch()
  const [numOfPages, setNumOfPages] = useState(1)
  const [dishes, setDishes] = useState<dishType[] | []>([])
  const { selectedRestaurant } = useSelector((state: RootState) => state.postSlice)
  const { cartItems } = useSelector((state: RootState) => state.cartSlice)

  const [
    getRestaurantDishes,
    { data: dishData,
      isLoading,
      isError,
      isSuccess,
      error }
  ] = useLazyGetRestaurantDishesQuery()

  useEffect(() => {
    if (isSuccess && dishData?.dishes?.dishes) {
      setDishes(prev => [...prev, ...dishData?.dishes.dishes])
      dispatch(setSelectedDish({ dishes: dishData?.dishes.dishes }))
      setNumOfPages(dishData.numberOfPages)
    }
  }, [isSuccess, dishData])

  useEffect(() => {
    if (numOfPages <= page) {
      getRestaurantDishes({
        restaurantId: selectedRestaurant?.id || '',
        page
      }, true)
      console.log('restaurants dishes page - ', page)
    }
  }, [page])

  return (
    <View>

      {isSuccess && selectedRestaurant &&
        <View className='relative mt-2 mb-24 w-full h-auto' >
          <FlatList
            scrollEnabled={false}
            data={dishes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <RestaruantDishItem
                id={item.id}
                name={item.dishName}
                imageUrl={item.imageUrl}
                description={item.description}
                price={item.price}
                rating={item.rating}
                itemCount={cartItems && cartItems[item.id]}
                dispatch={dispatch}
                restaurantId={selectedRestaurant.id}
              />
            )}
          />
        </View>
      }

      {isLoading &&
        <ActivityIndicator className='bg-white shadow-2xl rounded-full p-1' size='large' color='#dc2626' />
      }
    </View>
  )
}

export default RestaurantDishes



type RestaruantDishItemType = {
  id: string,
  name: string,
  imageUrl: string,
  description: string,
  price: number,
  rating: number,
  itemCount: number | null,
  restaurantId: string
  dispatch: Dispatch<AnyAction>
}

const RestaruantDishItem = ({
  id, name, imageUrl, description, price,
  rating, dispatch, itemCount = 0, restaurantId }: RestaruantDishItemType) => {

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ id, price, restaurantId }))
  }, [id])
  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart({ id, price, restaurantId }))
  }, [id])


  return (
    <View className='flex-row justify-between items-center my-1 rounded-xl bg-white mx-2 px-2 py-3 space-x-2'>

      <View className='space-y-1  overflow-hidden w-7/12'>
        <Text className='text-lg font-semibold text-slate-600'>{name}</Text>
        <Rating stars={Math.floor(rating)} count={14} />
        <Text>{price} $</Text>
        <View className='h-auto w-full'>
          <Text className='mt-1 whitespace-pre-line text-slate-700'>{description}</Text>
        </View>
      </View>

      <View className='relative p-1 w-6/12'>
        <Image
          className='w-32 h-32 rounded-xl '
          source={{ uri: imageUrl }}
        />

        {itemCount === null || itemCount === 0
          ? <TouchableOpacity className='absolute bottom-2  left-7 bg-red-300  opacity-80 w-20 h-10 rounded-lg flex justify-center items-center  ' onPress={handleAddToCart}>
            <View className='flex-row  justify-center items-center space-x-1'>
              <Text className='text-lg font-semibold text-gray-800' > Add</Text>
              <IconFeather name='plus' size={15} color="#1e293b" />
            </View>
          </TouchableOpacity>

          : <View className='absolute bottom-2  left-7 bg-red-400 opacity-95 w-20 h-10 rounded-lg flex justify-center items-center  '>
            <View className='flex-row justify-between items-center space-x-3'>
              <TouchableOpacity onPress={handleRemoveFromCart}>
                <IconFeather name='minus' size={20} color="white" />
              </TouchableOpacity>
              <Text className='text-lg font-semibold text-white'>{itemCount}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <IconFeather name='plus' size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>

    </View>
  )
}