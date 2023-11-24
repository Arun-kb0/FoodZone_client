

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


// * custom signUp type
export type customAuthResType = {
  accessToken: string,
  user: string,
  message: string,
}

// * getRestaurantDishesQuery
export type getRestaurantDishesResType = {
  message: string,
  dishes: dishesType,
  currentPage: number,
  numberOfPages: number,
  isListEnd: boolean
}

