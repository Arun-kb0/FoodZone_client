import { View, Text, ScrollView, Image, Touchable, TouchableOpacity, FlatList, Dimensions, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ListHeading from '../basic/ListHeading'
import { useGetMenuQuery } from '../../features/posts/postApiSlice'
import { menuType } from '../../constants/constantTypes'
import { NativeScrollEvent } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'
import { useDispatch } from 'react-redux'
import { setAllMenuItems } from '../../features/posts/postSlice'



const DishMenu = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [menu, setMenu] = useState<menuType[]>()

  const {
    data: menuList,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetMenuQuery()

  useEffect(() => {
    if (menuList) {
      setMenu(menuList.menu)
      dispatch(setAllMenuItems(menuList.menu))
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
                navigation={navigation}
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
  imageUrl: string,
  navigation: DeliveryScreenNavigationProps
}

const DisItem = ({ dishName, imageUrl, navigation }: dishItemType) => {

  const handleSearch = () => {
    navigation.navigate('SearchView', { searchKey: dishName })
  }


  return (
    <TouchableOpacity className='mx-3 my-2' onPress={handleSearch}>
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