import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSubmitEditingEventData } from 'react-native'
import React, { useState } from 'react'
import { IconEntypo, IconFontawsm } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigation/RootNavigator'

type serachBarType = {
  placeholder:string | undefined
}

const SearchBar = ({ placeholder }: serachBarType) => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const [searchInput, setSearchInput] = useState('')



  const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
   console.log('submit')
  }

  return (
    <View className={` w-full pt-10 pb-4 px-2 flex-row space-x-3 items-center justify-around bg-white `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconEntypo name='chevron-left' size={30} color={'#334155'} />
      </TouchableOpacity>

      <View className='flex-row bg-gray-200 justify-center items-center mx-1 px-3 rounded-xl  shadow-xl'>
        <IconFontawsm name='search' size={22} color="#ef4444" />
        <TextInput
          className='py-2 px-3 rounded-xl text-lg w-11/12 bg-gray-200'
          placeholder={placeholder}
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  )
}

export default SearchBar