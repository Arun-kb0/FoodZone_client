import { Text, FlatList, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { Dispatch, useEffect, useLayoutEffect, useState } from 'react'
import ItemSeparator from '../components/basic/ItemSeparator'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../navigation/RootNavigator'
import SearchBar from '../components/search/SearchBar'
import { useQuery, useRealm } from '@realm/react'
import { autocompleteType, menuType, restaurantType } from '../constants/constantTypes'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import postSlice, { setSelectedRestaurant } from '../features/posts/postSlice'
import { AnyAction } from 'redux'
import { IconEntypo } from '../constants/icons'
import { useLazyGetRestaurantByIdQuery } from '../features/posts/postApiSlice'
import { enableFreeze } from 'react-native-screens'


type searchScreenPropsType = {
  route: {
    params?: {
      placeholder?: string;
    };
  };
};


const autocompleteObjects: autocompleteType[] = [
  {
    id: '28186b9a-f528-4508-9421-0c19fd8b9893',
    Restaurant_Name: 'Restaurant 1',
    Category: ['Burger', 'Pizza'],
  },
  {
    id: 'a6f996e8-5360-4ba3-ad62-e674c7f1157b',
    Restaurant_Name: 'Restaurant 2',
    Category: ['Burger', 'Pizza'],
  },
  {
    id: 'dcd118d8-713c-4a03-b650-59acc852910f',
    Restaurant_Name: 'Restaurant 3',
    Category: ['Burger', 'Pizza'],
  },
  {
    id: 'cde1b006-beb0-4f32-9855-a09f13093af0',
    Restaurant_Name: 'Restaurant 4',
    Category: ['Burger', 'Pizza'],
  },
  {
    id: '07cb5b77-7fc8-46f2-89e5-ff0d553c3754',
    Restaurant_Name: 'Restaurant 5',
    Category: ['Burger', 'Pizza'],
  },
];



// ! fix searching

const SearchScreen = ({ route }: searchScreenPropsType) => {
  const placeholder = route.params?.placeholder
  const navigation = useNavigation<RootStackNavigationProp>()
  const navigationDelivery = useNavigation<DeliveryScreenNavigationProps>()
  const dispatch = useDispatch()

  const [autocomplete, setAutocomplete] = useState<autocompleteType[] | []>([])
  const [searchInput, setSearchInput] = useState('')
  const [menuList, setMenuList] = useState<menuType[] | []>([])

  const { menu } = useSelector((state: RootState) => state.postSlice)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchBar
          placeholder={placeholder}
          setAutocomplete={setAutocomplete}
          setSearchTextInScreen={setSearchInput}
        />
      )
    })
  }, [])

  const [getRestaurantById,
    { data: restaurantData,
      isLoading,
      isError,
      isSuccess,
      isFetching
    }
  ] = useLazyGetRestaurantByIdQuery()


  useEffect(() => {
    if (menu && searchInput.length > 0) {
      const regex = new RegExp(searchInput, 'i')
      const menuList = menu.filter(item => regex.test(item.dishName) && item)
      menuList && setMenuList(menuList)
    }
  }, [menu, searchInput])

  
  const handleNavigateToRestaurantScreen = (id: string) => {
    try {
      if (!isLoading && !isFetching) {
        getRestaurantById({ id })
      }
      console.log('handleNavigateToRestaurantScreen ')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (restaurantData?.restaurant) {
      dispatch(setSelectedRestaurant(restaurantData?.restaurant))
      navigationDelivery.navigate('RestaurantScreen',{restaurant:restaurantData?.restaurant})
    }
  }, [isSuccess, restaurantData])


  // * console
  useEffect(() => {
    console.log("\n\n autocomplete  len - ")
    console.log(autocomplete.length)
  }, [autocomplete, menuList])

  return (
    <SafeAreaView className='flex-1 w-full px-1 mt-2 '>
      <ScrollView className='space-y-4'>

        <View>
          <FlatList
            className='bg-white rounded-xl h-auto'
            scrollEnabled={false}
            data={menuList}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <MenuSearchItem
                dishName={item.dishName}
                navigation={navigationDelivery}
              />
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>

        <View>
          <FlatList
            className='bg-white rounded-xl h-full '
            scrollEnabled={false}
            data={autocomplete}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AutoCompleteItem
                data={item}
                handleNavigate={handleNavigateToRestaurantScreen}
              />
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen



type autocompleteItemPropsType = {
  data: autocompleteType,
  handleNavigate:(id:string)=>void
}
const AutoCompleteItem = ({ data: { id, Restaurant_Name, Category }, handleNavigate }: autocompleteItemPropsType) => {

  return (
    <TouchableOpacity className='flex items-start justify-center px-6 py-4 space-y-1' onPress={()=> handleNavigate(id)}>
      <Text className='text-gray-700 text-lg'>{Restaurant_Name}</Text>
      <Text className='text-gray-400 '>in Restaurants</Text>
    </TouchableOpacity>
  )
}


type menuSearchItemProType = {
  dishName: string,
  navigation: DeliveryScreenNavigationProps
}
const MenuSearchItem = ({ dishName, navigation }: menuSearchItemProType) => {
  const handleNav = () => {
    navigation.navigate('SearchView', { searchKey: dishName })
  }
  return (
    <TouchableOpacity className='flex items-start justify-center px-6 py-4 space-y-1' onPress={handleNav}>
      <Text className='text-gray-700 text-lg'>{dishName}</Text>
      <View className='flex-row space-x-1 justify-center'>
        <IconEntypo name='chevron-right' size={18} className='text-red-400' />
        <Text className='text-red-400 '>in Dishes</Text>
      </View>
    </TouchableOpacity>
  )
}
