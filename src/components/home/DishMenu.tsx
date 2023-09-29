import { View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import ListHeading from '../basic/ListHeading'
import { useGetMenuQuery } from '../../features/auth/posts/postApiSlice'
import { menuType } from '../../constants/constantTypes'


const dishMenuList = [
  {
    id: 1,
    dishName: 'Spaghetti',
    imageUrl: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    dishName: 'Paztha',
    imageUrl: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    dishName: 'Pizza',
    imageUrl: "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?b=1&s=612x612&w=0&k=20&c=ZcLXrogjpyc5froC5ZIP-0uepbhldATwmCbt3mzViGQ=",
  },
  {
    id: 4,
    dishName: 'Sushi',
    imageUrl: 'https://images.pexels.com/photos/7245465/pexels-photo-7245465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    dishName: 'Cake',
    imageUrl: 'https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=600',
  },

]

const DishMenu = () => {
  const [menu, setMenu] = useState<menuType[]>()

  const {
    data: menuList,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetMenuQuery('')

  useMemo(() => {
    if (menuList) {
      setMenu(menuList.menu)
    }
  }, [isSuccess])

  return (
    <View className='px-1 py-2 w-auto'>
      <ListHeading title='whats on yor mind ?' />

      <ScrollView className='mb-2'
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {isSuccess &&
          menu?.map((item) => (
            <DisItem
              key={item._id}
              dishName={item.dishName}
              imageUrl={item.imageUrl}
            />
          ))
        }
      </ScrollView>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {isSuccess &&
          menu?.map((item) => (
            <DisItem
              key={item._id}
              dishName={item.dishName}
              imageUrl={item.imageUrl}
            />
          ))
        }
      </ScrollView>

    </View>
  )
}

export default DishMenu




type dishItemType = {
  dishName: string,
  imageUrl: string
}

const DisItem = ({ dishName, imageUrl }: dishItemType) => {

  return (
    <TouchableOpacity className='mx-3'>
      <View className='flex justify-center items-center '>
        <Image
          source={{ uri: imageUrl }}
          className='w-20 h-20 rounded-full overflow-hidden'
        />
        <Text className='text-slate-600'>{dishName}</Text>
      </View>
    </TouchableOpacity>
  )
}