

// * menuType
export type menuType = {
  _id:string,
  dishName: string,
  imageUrl: string,
  timeStamp: Date
}

// * restaurant type
// type OpeningHoursType = {
//   monday: string;
//   tuesday: string;
//   wednesday: string;
//   thursday: string;
//   friday: string;
//   saturday: string;
//   sunday: string;
// };

// export type restaurantType = {
//   _id:string
//   name: string,
//   cuisine: string,
//   deliveryDelay: string,
//   imageUrl: string,
//   distance: string,
//   rating: number,
//   menu:string[],
//   openingHours: OpeningHoursType
//   location: { lat: string, long: string }
//   timeStamp: Date
// }


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

// export type dishType = {
//   _id:string,
//   dishName: string,
//   description: string,
//   imageUrl: string,
//   price: number,
//   rating: number,
//   timeStamp: Date
// }

// export type dishesType = {
//   _id: string,
//   dishes: dishType[]
// }


export type dishType = {
  _id:string,
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

