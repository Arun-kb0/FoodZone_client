import { View, Text, SafeAreaView, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLazySearchDishInRestaurantsQuery } from '../features/posts/postApiSlice'
import { RestaurantCard } from '../components/basic/RestaurantCard'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import DishMenu from '../components/home/DishMenu'
import { restaurantType } from '../constants/constantTypes'



type searchViewPropsType = {
  route: {
    params: {
      searchKey: string
    }
  }
}

const SearchView = ({ route }: searchViewPropsType) => {
  const { searchKey } = route.params

  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [width, setWidth] = useState(Dimensions.get("window").width)
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(1)
  const [restaurantsState, setRestaurantsState] = useState<restaurantType[] | []>([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Restaurants',
    })
  }, [navigation])


  useEffect(() => {
    console.log('\n\n realm res - ', restaurantsState)
  }, [restaurantsState])

  const [searchDishInRestaurantsQuery,
    { data: restaurantData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
    }
  ] = useLazySearchDishInRestaurantsQuery()

  useEffect(() => {
    searchDishInRestaurantsQuery({ searchInput: searchKey, page }, true)
  }, [page])

  const handlePage = () => {
    if (numOfPages >= page) {
      setPage(prev => prev + 1)
    }
    console.log('search view end  page - ', page)
  }

  useEffect(() => {
    if (restaurantData) {
      setRestaurantsState(prev => [...prev, ...restaurantData.restaurants])
      setNumOfPages(restaurantData.numberOfPages)
    }
  }, [isSuccess, restaurantData])


  return (
    <SafeAreaView>

      {restaurantsState &&
        < FlatList
          className=' h-auto pt-2 pb-10'
          contentContainerStyle={{
            width: width
          }}
          initialNumToRender={4}
          onEndReached={handlePage}
          data={restaurantsState}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              dispatch={dispatch}
              navigation={navigation}
              isFav={false}
            />
          )}
        ListFooterComponent={<EndComponent isFetching={isLoading ? false :isFetching} />}
        />
      }

      {isLoading &&
        <View className='w-full items-center mt-5'>
          <ActivityIndicator size='large' className='bg-white shadow-2xl rounded-full p-1 w-18' color='#dc2626' />
        </View>
      }
    </SafeAreaView>
  )
}

export default SearchView



type EndComponentPropType = { isFetching: boolean }
const EndComponent = ({ isFetching }: EndComponentPropType) => {
  return <View className='w-full items-center mt-5'>
    {isFetching &&
      <ActivityIndicator size='large' className='bg-white shadow-2xl rounded-full p-1 w-18' color='#dc2626' />
    }
  </View>
}


