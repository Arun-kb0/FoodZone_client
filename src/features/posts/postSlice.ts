import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dishType, restaurantType } from "../../constants/constantTypes";


type postState = {
  restaurants: restaurantType[] | null,
  selectedRestaurant: restaurantType | null,
  selectedDish: Record<string, dishType[]> | null,
  favorite: restaurantType[] | null,
  favoriteResturantIds: string[] | null
}

type setRestaurantsPayloadType = {
  restaurants: restaurantType[]
}
type selectedDishPayloadType = {
  _id: string,
  dishes: dishType[]
}

type setFavoriteRestaurantPayloadType = {
  restaurantId: string
}

type setFavoriteRestaurantsPayloadType = {
  restaurantIds: string[]
}




const initialState: postState = {
  restaurants: null,
  selectedRestaurant: null,
  selectedDish: null,
  favorite: null,
  favoriteResturantIds:null
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
    },

    setFavoriteRestaurant(state, action: PayloadAction<setFavoriteRestaurantPayloadType>) {
      const { restaurantId } = action.payload

      if (state.favoriteResturantIds === null) {
        state.favoriteResturantIds = [restaurantId]
      } else {
        const index = state.favoriteResturantIds.findIndex((id) => id === restaurantId)
        if (index!==-1) {
          state.favoriteResturantIds.splice(index, 1)
        } else {
          state.favoriteResturantIds.unshift(restaurantId)
        }
      }
      console.log('favoriteResturantIds length ', state.favoriteResturantIds?.length)
      console.log('favoriteResturantIds ', state.favoriteResturantIds)
    },

    setFavoriteRestaurants(state, action: PayloadAction<setFavoriteRestaurantsPayloadType>) {
      const { restaurantIds } = action.payload
      state.favoriteResturantIds = restaurantIds
      
      console.log('favoriteResturantIds length ', state.favoriteResturantIds?.length)
      console.log('favoriteResturantIds ', state.favoriteResturantIds)


    }

  }
})


export const {
  setRestaurants, setSelectedRestaurant, setSelectedDish,
  setFavoriteRestaurant, setFavoriteRestaurants
} = postSlice.actions

export default postSlice.reducer