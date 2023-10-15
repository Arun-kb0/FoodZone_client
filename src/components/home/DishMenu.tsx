import { View, Text, ScrollView, Image, Touchable, TouchableOpacity, FlatList, Dimensions, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ListHeading from '../basic/ListHeading'
import { useGetMenuQuery } from '../../features/posts/postApiSlice'
import { menuType } from '../../constants/constantTypes'
import { NativeScrollEvent } from 'react-native'



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
      console.log(menuList.menu.length)
    }
  }, [isSuccess])

  // ! get req for 
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const scrollX = contentOffset.x;
    const width = contentSize.width;
    const screenWidth = layoutMeasurement.width;

    if (scrollX + screenWidth >= width) {
      console.log("dish menu end  ")
    }
  }


  return (
    <View className='px-1 py-2 w-auto '>
      <ListHeading title='whats on yor mind ?' />
      <ScrollView
        className={`my-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        onScroll={handleScroll}
      >

        {isSuccess && menu &&
          <FlatList
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            numColumns={Math.ceil(menu?.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={6}
            getItemLayout={(data, index) => ({
              length: 80, offset: 80 * index, index
            })}

            data={menu}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <DisItem
                dishName={item.dishName}
                imageUrl={item.imageUrl}
              />
            )}
          />
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
    <TouchableOpacity className='mx-3 my-2'>
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