import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSubmitEditingEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconEntypo, IconFontawsm } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'

import { Realm } from '@realm/react'
import { autocompleteType } from '../../constants/constantTypes'
import { REALM_API_KEY, REALM_APP_ID } from '@env'

type serachBarType = {
  placeholder: string | undefined
  setAutocomplete: React.Dispatch<React.SetStateAction<[] | autocompleteType[]>>
  setSearchTextInScreen: React.Dispatch<React.SetStateAction<string>>
}


const SearchBar = ({ placeholder, setAutocomplete, setSearchTextInScreen }: serachBarType) => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    console.log('submit')
    navigation.navigate('SearchView', { searchKey: searchInput })
  }

  useEffect(() => {
    const app = new Realm.App({ id: REALM_APP_ID })
    const credentials = Realm.Credentials.apiKey(REALM_API_KEY)

    const connectRealm = async () => {
      try {
        const user = await app.logIn(credentials)
        const result = await user.functions.searchAutocomplete(searchInput)
        let data = result as autocompleteType[] | [] | undefined
        if (Array.isArray(data) && data.length > 0) {
          setAutocomplete(data)
          setSearchTextInScreen(searchInput)
        }
      } catch (error) {
        console.log(error)
      }
    }
    // ! relam function call 
    if (searchInput.length > 0) {
      connectRealm()
    }
  }, [searchInput])

  return (
    <View className={` w-full pt-10 pb-4 px-2 flex-row space-x-3 items-center justify-around bg-white `}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconEntypo name='chevron-left' size={30} color={'#334155'} />
      </TouchableOpacity>

      <View className='flex-row bg-gray-200 justify-center items-center mx-1 px-3 rounded-xl  shadow-xl'>
        <IconFontawsm name='search' size={22} color="#ef4444" />
        <TextInput
          className='py-2 px-3 rounded-xl text-lg w-11/12 bg-gray-200'
          autoFocus
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