import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from 'react-native-modal'
import { CheckCircleIcon, RadioIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { customeNavigateProp } from '../../constants/constantTypes'

type sortModelType = {
  isVisible: boolean,
  closeModel: React.Dispatch<React.SetStateAction<boolean>>
}

type sortFilterType = | "rating" | "priceLowToHigh" | "priceHighToLow" | "distanceHighToLow" | "deliveryTime"


const SortModel = ({ isVisible, closeModel }: sortModelType) => {

  const initSelectedFilters = {
    rating: false,
    priceLowToHigh: false,
    priceHighToLow: false,
    distanceHighToLow: false,
    deliveryTime: false,
  }
  const [selectedFilters, setSelectedFilters] = useState(initSelectedFilters)

  const navigate = useNavigation<customeNavigateProp>()

  const handleSort = useCallback((sortFilter: sortFilterType) => {
  setSelectedFilters((prev) => ({
    ...prev,
    [sortFilter]: !prev[sortFilter]
  }))
  }, [])
  
  const handleClear = () => {
    setSelectedFilters(initSelectedFilters)
  }

  const handleApply = () => {
    console.log("handleApply")
  }


return (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0.2}
    animationIn={"slideInUp"}
    swipeThreshold={50}
    style={{ margin: 0, marginTop: 10, justifyContent: 'flex-end' }}

  >
    <View className='flex items-center justify-start space-y-3'>
      <TouchableOpacity onPress={() => closeModel(!isVisible)} >
        <XCircleIcon size={52} color="#3f3f46" />
      </TouchableOpacity>

      <View className=' w-full h-80 bg-white rounded-t-3xl overflow-hidden '>
        <View className='p-4 px-8 space-y-4'>
          <TouchableOpacity className='flex-row items-center justify-between' onPress={()=>handleSort('rating')}>
            <Text className='text-lg '>Rating : High to Low</Text>
            <CheckCircleIcon
              size={25}
              color={selectedFilters?.rating ? "#16a34a" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between' onPress={() => handleSort('priceHighToLow')}>
            <Text className='text-lg '>Price : High to Low</Text>
            <CheckCircleIcon
              size={25}
              color={selectedFilters?.priceHighToLow ? "#16a34a" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between' onPress={() => handleSort('priceLowToHigh')}>
            <Text className='text-lg '>Price : Low to High </Text>
            <CheckCircleIcon
              size={25}
              color={selectedFilters?.priceLowToHigh ? "#16a34a" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between' onPress={() => handleSort('deliveryTime')}>
            <Text className='text-lg '>Delivery Time : Low to High </Text>
            <CheckCircleIcon
              size={25}
              color={selectedFilters?.deliveryTime ? "#16a34a" : "#9ca3af"}
            />
          </TouchableOpacity>

        </View>


        <View className='flex-row  justify-between items-end px-8 pt-10 space-x-2'>
          <TouchableOpacity className='p-2 w-3/6 flex justify-center items-center  border border-red-500 rounded-xl  '  onPress={handleClear}>
            <Text className='text-2xl font-semibold'>clear</Text>
          </TouchableOpacity>

          <TouchableOpacity className='p-2 w-3/6 flex justify-center border border-red-500 items-center bg-red-600 rounded-xl  ' onPress={handleApply}>
            <Text className='text-2xl font-semibold text-white'>Apply</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  </Modal>
)
}

export default SortModel