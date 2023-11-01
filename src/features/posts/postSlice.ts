import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dishType, restaurantType } from "../../constants/constantTypes";


type postState = {
  restaurants: restaurantType[] | null,
  selectedRestaurant: restaurantType | null,
  selectedDish: Record<string, dishType[]> | null
}

type setRestaurantsPayloadType = {
  restaurants: restaurantType[]
}
type selectedDishPayloadType = {
  _id: string,
  dishes: dishType[]
}


const initialState: postState = {
  restaurants: null,
  selectedRestaurant: null,
  selectedDish: null
}

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setRestaurants(state, action: PayloadAction<setRestaurantsPayloadType>) {
      console.log("postSlice setRestaurants")
      const { restaurants } = action.payload
      state.restaurants = restaurants
    },
    setSelectedRestaurant(state, action) {
      state.selectedRestaurant = action.payload
    },

    setSelectedDish(state, action: PayloadAction<selectedDishPayloadType>) {
      const { _id, dishes } = action.payload
      if (state.selectedDish === null)
        state.selectedDish = {}
      state.selectedDish[_id] = dishes
    }

  }
})


export const { setRestaurants, setSelectedRestaurant, setSelectedDish } = postSlice.actions
export default postSlice.reducer