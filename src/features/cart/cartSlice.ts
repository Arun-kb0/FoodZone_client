import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type cartStateType = {
  cartItems: Record<string, number> | null,
  totalItems: number,
  totalPrice: number,
  tip: number,
  restaurantCart: Record<string, { count: number, total: number }> | null,
}

type cartPayloadType = {
  id: string,
  price: number,
  restaurantId:string
}


const initialState: cartStateType = {
  cartItems: null,
  totalItems: 0,
  totalPrice: 0,
  tip: 0,
  restaurantCart: null,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<cartPayloadType>) {

      const { id, price, restaurantId } = action.payload
      state.cartItems ??= {}
      state.cartItems[id] = (state.cartItems[id] ?? 0) + 1
      state.totalItems++
      state.totalPrice += price
      state.totalPrice = parseFloat(state.totalPrice.toFixed(2))

      state.restaurantCart ??= {}
      state.restaurantCart[restaurantId] = {
        count: state.restaurantCart[restaurantId]?.count !== undefined
          ? state.restaurantCart[restaurantId].count+1
          : 1,
        total: state.restaurantCart[restaurantId]?.total !== undefined
          ? parseFloat((state.restaurantCart[restaurantId]?.total + price).toFixed(2))
          : price,
      }

      if (state.restaurantCart[restaurantId]?.count !== undefined) {
        console.log(state.restaurantCart[restaurantId].count)
      }

      console.log("cart Slice setCartItem ")
      // console.log(state)
    },

    removeFromCart(state, action: PayloadAction<cartPayloadType>) {
      const { id, price, restaurantId } = action.payload
      if (state.totalItems > 0) {
        state.cartItems ??= {}
        state.cartItems[id]--
        state.totalItems--
        state.totalPrice -= price
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2))

        state.restaurantCart ??= {}
        state.restaurantCart[restaurantId] = {
          count: state.restaurantCart[restaurantId]?.count > 0
            ? state.restaurantCart[restaurantId].count - 1
            : 0,
          total: state.restaurantCart[restaurantId]?.total > 0
            ? parseFloat((state.restaurantCart[restaurantId]?.total - price).toFixed(2))
            : 0,
        }

        console.log("cart Slice setCartItem ")
        console.log(state)
      }
    },

    // ! not using
    clearTotal(state, action) {
      state.totalPrice = 0
    }
  }

})

export const { addToCart, removeFromCart, clearTotal } = cartSlice.actions
export default cartSlice.reducer