

// * menuType
export type menuType = {
  _id: string,
  dishName: string,
  imageUrl: string,
  timeStamp: Date
}


export type restaurantType = {
  _id: string,
  Restaurant_Name: string;
  Category: string[];
  Pricing_for_2: string;
  Locality: string;
  Dining_Rating: string;
  Dining_Review_Count: string;
  Delivery_Rating: string;
  Delivery_Rating_Count: string;
  Website: string;
  Address: string;
  Phone_No: string;
  Latitude: string;
  Longitude: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};



// * dishType
export type dishType = {
  _id: string,
  id: string;
  dishName: string;
  description: string;
  cuisineName: string;
  price: number;
  rating: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type dishesType = {
  _id: string,
  restaurantId: string;
  dishes: dishType[];
};

// * all restaurants menu type
export type MenuType = {
  _id: string;
  dishName: string;
  imageUrl: string;
  timeStamp: Date;
  __v: number;
};



// * custom signUp type
export type customAuthResType = {
  accessToken: string,
  user: string,
  message: string,
}

// * getRestaurantDishesQueryResponse type
export type getRestaurantDishesResType = {
  message: string,
  dishes: dishesType,
  currentPage: number,
  numberOfPages: number,
  isListEnd: boolean
}

// * getAllRestaurantsQuery response  type
export type getAllRestaurantsQueryResType = {
  message: string,
  currentPage: number,
  numberOfPages: number,
  restaurants: restaurantType[],
}

// *get favorites response 
export type getFavoriteRestaurantsResType = {
  message: string,
  restaurantIds: string[],
}

// * add Fav res type
export type addFavoriteRestaurantResType = {
  message: string,
  restaurantId: string
}


// * searchDishInResturants res type
export type searchDishInRestaurantsResType = {
  message: string,
  currentPage: number,
  numberOfPages: number,
  restaurants: restaurantType[]
}


// * search autocomplete res
export type autocompleteType = Pick<
  restaurantType,
  'id' | 'Restaurant_Name' | 'Category'
>

// * all restaurants menu
export type getMenuResType = {
  message: string,
  menu: menuType[]
}

// * get restaurant by id
export type getRestaurantByIdResType = {
  message: string,
  restaurant: restaurantType
}