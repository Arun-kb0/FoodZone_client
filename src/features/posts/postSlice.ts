import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dishType, menuType, restaurantType } from "../../constants/constantTypes";


type postState = {
  restaurants: restaurantType[] | null,
  selectedRestaurant: restaurantType | null,
  selectedDish: Record<string, dishType[]> | null,
  favorite: restaurantType[] | null,
  favoriteRestaurantIds: string[] | null,
  menu: menuType[]|null
}

type setRestaurantsPayloadType = {
  restaurants: restaurantType[]
}

type selectedDishPayloadType = {
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
  favoriteRestaurantIds: [],
  menu:[]
}

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setRestaurants(state, action: PayloadAction<setRestaurantsPayloadType>) {
      console.log("postSlice setRestaurants")
      const { restaurants } = action.payload
      state.restaurants = state.restaurants !== null
        ? [...state.restaurants, ...restaurants]
        : [...restaurants]
    },

    setSelectedRestaurant(state, action) {
      state.selectedRestaurant = action.payload
    },

    setSelectedDish(state, action: PayloadAction<selectedDishPayloadType>) {
      const { dishes } = action.payload
      const id = state.selectedRestaurant?.id

      if (state.selectedDish === null)
        state.selectedDish = {}
      if (id) {
        state.selectedDish[id] = state.selectedDish[id]
          ? [...state.selectedDish[id], ...dishes]
          : dishes
      }
    },

    setFavoriteRestaurant(state, action: PayloadAction<setFavoriteRestaurantPayloadType>) {
      const { restaurantId } = action.payload

      if (state.favoriteRestaurantIds === null) {
        state.favoriteRestaurantIds = [restaurantId]
      } else {
        const index = state.favoriteRestaurantIds.findIndex((id) => id === restaurantId)
        if (index !== -1) {
          state.favoriteRestaurantIds.splice(index, 1)
        } else {
          state.favoriteRestaurantIds.unshift(restaurantId)
        }
      }
      console.log('favoriteRestaurantIds length ', state.favoriteRestaurantIds?.length)
      console.log('favoriteRestaurantIds ', state.favoriteRestaurantIds)
    },

    setFavoriteRestaurants(state, action: PayloadAction<setFavoriteRestaurantsPayloadType>) {
      const { restaurantIds } = action.payload
      state.favoriteRestaurantIds = restaurantIds
      console.log('favoriteRestaurantIds length ', state.favoriteRestaurantIds?.length)
    },

    setAllMenuItems(state, action: PayloadAction<menuType[]>) {
      state.menu = action.payload
    }

  }
})


export const {
  setRestaurants, setSelectedRestaurant, setSelectedDish,
  setFavoriteRestaurant, setFavoriteRestaurants, setAllMenuItems
} = postSlice.actions

export default postSlice.reducer