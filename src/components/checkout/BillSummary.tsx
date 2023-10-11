import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IconFontawsm, IconFontawsm5, IconMat } from '../../constants/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { restaurantType } from '../../constants/constantTypes'

type BillSummaryType = {
  selectedRestaurant: restaurantType,
  total: number
}

type billState = {
  gstTotalOnItem:number,
  deliveryPartnerFee: number,
  total: number,
}

const BillSummary = ({ selectedRestaurant, total }: BillSummaryType) => {
  const [bill, setBill] = useState<billState>({
    gstTotalOnItem:0,
    deliveryPartnerFee: 0,
    total: 0,
  })
  useEffect(() => {
    const distance = selectedRestaurant.distance.match(/[\d\.]+/)
    const feePerkm = 9
    const platformFee = 2
    const gstRate = 18
    if (distance) {
      const gstOnitem = parseFloat(((total * gstRate) / 100).toFixed(2))
      setBill(({
        total: (parseFloat(distance[0]) * feePerkm) + platformFee + gstOnitem + total,
        gstTotalOnItem: gstOnitem,
        deliveryPartnerFee: parseFloat(distance[0]) * feePerkm
      }))
    }
  }, [total])




  return (
    <View className=' bg-white rounded-xl'>
      <View className=' border-dashed border-b'>
        <View className='flex-row  justify-between items-center p-2 px-3'>
          <Text className='font-semibold  '>Subtotal</Text>
          <Text>{total} $</Text>
        </View>
        <View className='flex-row justify-between items-center p-2 px-3'>
          <View className='flex-row justify-center items-center space-x-2'>
            <IconFontawsm name="building-o" size={20} color="#1f2937" />
            <Text className='text-sm'>GST</Text>
          </View>
          <Text>{bill.gstTotalOnItem}</Text>
        </View>
        <View className='flex-row justify-between items-center p-2 px-3'>
          <View className='flex-row justify-center items-center space-x-1'>
            <IconMat name="delivery-dining" size={20} color="#1f2937" />
            <Text className='text-sm'>Delivery parnter fee for {selectedRestaurant.distance} km</Text>
          </View>
          <Text>{bill.deliveryPartnerFee} $ </Text>
        </View>
        <View className='flex-row justify-between items-center p-2 px-3'>
          <View className='flex-row justify-center items-center space-x-2'>
            <IconFontawsm5 name="mobile-alt" size={20} color="#1f2937" />
            <Text className='text-sm'>Platform fee</Text>
          </View>
          <Text>2 $</Text>
        </View>
      </View>

      <View className='flex-row  justify-between items-center p-2 px-3'>
        <Text className='text-lg font-bold '>Total</Text>
        <Text className='text-lg font-bold '>{bill.total} $</Text>
      </View>

    </View>
  )
}

export default BillSummary