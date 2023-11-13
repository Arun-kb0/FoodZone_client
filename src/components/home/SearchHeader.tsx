import { Text, FlatList, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { IconFontawsm } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigation/RootNavigator'



type SearchType = {
  placeholder: string,
  isTrasparent: boolean
}

export const SearchHeader = ({ placeholder, isTrasparent }: SearchType) => {
  const navigation = useNavigation<RootStackNavigationProp>()
  return (
    <View className={`absolute w-full pt-10 pb-4 px-2 flex-1 items-center justify-around ${isTrasparent ? 'bg-transparent' : 'bg-yellow-200'} `}>
      <View className='flex-row bg-white justify-center items-center mx-1 px-3 rounded-xl  shadow-xl'>
        <IconFontawsm name='search' size={22} color="#ef4444" />
        
        <TextInput
          className='py-2 px-3 bg-white rounded-xl text-lg w-11/12 '
          placeholder={placeholder}
          onFocus={()=> navigation.navigate('SearchScreen',{placeholder})}
        />
      </View>
    </View>
  )
}

export default SearchHeader



type autoCompleteItemPropsType = {
  autoCompleteText: string
}
const AutoCompleteItem = ({ autoCompleteText }: autoCompleteItemPropsType) => {
  const handlePress = () => {
    console.log('AutoCompleteItem press')
  }
  return (
    <TouchableOpacity className='flex items-start justify-center px-4 py-2' onPress={handlePress}>
      <Text className='text-gray-700 text-lg'>
        {autoCompleteText}
      </Text>
    </TouchableOpacity>
  )
}