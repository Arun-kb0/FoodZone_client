import { Text, FlatList, SafeAreaView , TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ItemSeparator from '../components/basic/ItemSeparator'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../navigation/RootNavigator'
import SearchBar from '../components/search/SearchBar'


const searchAutoComplete = ['biriyani', 'alfarm', 'madhi', 'burger', 'pizza', 'steak']


type searchScreenPropsType = {
  route: {
    params?: {
      placeholder?: string;
    };
  };
};



const SearchScreen = ({ route }: searchScreenPropsType) => {
  const placeholder = route.params?.placeholder
  const navigation = useNavigation<RootStackNavigationProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchBar placeholder={placeholder} />
    })
  }, [])

  return (
    <SafeAreaView className='flex-1 w-full px-1 mt-2 '>
      <FlatList
        className='bg-white rounded-xl h-full '
        showsHorizontalScrollIndicator={true}
        data={searchAutoComplete}
        keyExtractor={(index, item) => item + index}
        renderItem={({ item }) => (
          <AutoCompleteItem autoCompleteText={item} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView> 
  )
}

export default SearchScreen




type autoCompleteItemPropsType = {
  autoCompleteText: string
}
const AutoCompleteItem = ({ autoCompleteText }: autoCompleteItemPropsType) => {
  const handlePress = () => {
    console.log('AutoCompleteItem press')
  }
  return (
    <TouchableOpacity className='flex items-start justify-center px-6 py-4' onPress={handlePress}>
      <Text className='text-gray-700 text-lg'>
        {autoCompleteText}
      </Text>
    </TouchableOpacity>
  )
}

