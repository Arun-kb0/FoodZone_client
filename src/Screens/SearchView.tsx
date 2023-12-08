import { View, Text, SafeAreaView, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLazySearchDishInResturantsQuery } from '../features/posts/postApiSlice'
import { RestaruantCard } from '../components/basic/RestaurantCard'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import DishMenu from '../components/home/DishMenu'
import { restaurantType } from '../constants/constantTypes'


import { Realm } from '@realm/react'
import { REALM_API_KEY, REALM_APP_ID } from '@env'


type searchViewPropsType = {
  route: {
    params: {
      searchKey: string
    }
  }
}

//  ! add cards and top stackbar
const SearchView = ({ route }: searchViewPropsType) => {
  const { searchKey } = route.params

  const dispatch = useDispatch()
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  const [width, setWidth] = useState(Dimensions.get("window").width)
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(1)
  const [resturantsState, setResturantsState] = useState<restaurantType[] | []>([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Restaurants',
    })
  }, [navigation])


  useEffect(() => {
    console.log('\n\n relam res - ', resturantsState)
  }, [resturantsState])

  const [searchDishInResturantsQuery,
    { data: restaurantData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
    }
  ] = useLazySearchDishInResturantsQuery()

  // ! dont remove 
  useEffect(() => {
    searchDishInResturantsQuery({ searchInput: searchKey, page }, true)
  }, [page])

  const handlePage = () => {
    if (numOfPages >= page) {
      setPage(prev => prev + 1)
    }
    console.log('search view end  page - ', page)
  }

  useEffect(() => {
    if (restaurantData) {
      setResturantsState(prev => [...prev, ...restaurantData.restuarnts])
      setNumOfPages(restaurantData.numberOfPages)
    }
  }, [isSuccess, restaurantData])


  return (
    <SafeAreaView>

      {resturantsState &&
        < FlatList
          className=' h-auto pt-2 pb-10'
          contentContainerStyle={{
            width: width
          }}
          initialNumToRender={4}
          onEndReached={handlePage}
          data={resturantsState}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaruantCard
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


